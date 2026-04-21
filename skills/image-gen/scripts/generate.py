#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = [
#     "google-genai>=1.0.0",
#     "openai>=1.0.0",
#     "pillow>=10.0.0",
# ]
# ///
"""
Unified image generation with tiered model support:
  - Gemini Flash (draft, $0.039/img)
  - Gemini Pro (final, $0.134/img)
  - OpenAI gpt-image-1-mini (draft, ~$0.02-0.04/img)
  - OpenAI gpt-image-1.5 (final, ~$0.08-0.17/img)

Usage:
    uv run generate.py --prompt "description" --filename "output.png"
    uv run generate.py --prompt "description" --provider openai --filename "output.png"
    uv run generate.py --prompt "description" --provider openai --model mini --filename "output.png"
    uv run generate.py --template lifestyle-004 --vars '{"subject":"..."}' --filename "out.png"
    uv run generate.py --prompt "..." --batch 3 --sizes "1:1,16:9" --filename "out-{n}-{ratio}.png"
"""
import argparse
import base64
import json
import os
import sys
from io import BytesIO
from pathlib import Path

# --- Model registries ---

GEMINI_ASPECT_RATIOS = ["1:1", "2:3", "3:2", "3:4", "4:3", "4:5", "5:4", "9:16", "16:9", "21:9"]
OPENAI_SIZES = ["1024x1024", "1536x1024", "1024x1536", "auto"]

GEMINI_MODELS = {
    "flash": "gemini-2.5-flash-image",
    "pro": "gemini-3-pro-image-preview",
}

OPENAI_MODELS = {
    "mini": "gpt-image-1-mini",
    "standard": "gpt-image-1",
    "best": "gpt-image-1.5",
}

COSTS = {
    # Gemini
    "gemini_flash": 0.039,
    "gemini_pro_1k": 0.134,
    "gemini_pro_2k": 0.134,
    "gemini_pro_4k": 0.24,
    # OpenAI (low quality 1024x1024 estimates)
    "openai_mini": 0.03,
    "openai_standard": 0.08,
    "openai_best_low": 0.08,
    "openai_best_high": 0.17,
}

LIBRARY_PATHS = [
    Path("/Users/claw/.openclaw/workspace-vorti-main/content/prompt-library"),
    Path.home() / ".openclaw" / "workspace-vorti-main" / "content" / "prompt-library",
]


def find_library():
    for p in LIBRARY_PATHS:
        if (p / "index.json").exists():
            return p
    return None


def load_template(template_id):
    lib = find_library()
    if not lib:
        print("Error: Prompt library not found.", file=sys.stderr)
        sys.exit(1)
    index = json.loads((lib / "index.json").read_text())
    for cat in index["categories"]:
        if template_id in cat.get("prompt_ids", []):
            tpl_file = lib / cat["file"]
            tpl_data = json.loads(tpl_file.read_text())
            for p in tpl_data["prompts"]:
                if p["id"] == template_id:
                    return p, tpl_data
            break
    print(f"Error: Template '{template_id}' not found in prompt library.", file=sys.stderr)
    sys.exit(1)


def substitute_vars(text, variables):
    for k, v in variables.items():
        text = text.replace(f"{{{k}}}", v)
    return text


def load_guidelines():
    lib = find_library()
    if not lib:
        return None
    gpath = lib / "guidelines.md"
    if gpath.exists():
        return gpath.read_text()
    return None


# --- Model selection ---

def select_gemini_model(args, template=None):
    if args.model and args.model not in ("auto",):
        return args.model
    if args.resolution in ("2K", "4K"):
        return "pro"
    if template and template.get("model_target") == "pro":
        return "pro"
    return "flash"


def select_openai_model(args, template=None):
    if args.model and args.model not in ("auto",):
        return args.model
    # Default: mini for drafts, best for finals
    return "mini"


def estimate_cost(provider, model_name, resolution, count):
    if provider == "gemini":
        if model_name == "flash":
            return count * COSTS["gemini_flash"]
        if resolution == "4K":
            return count * COSTS["gemini_pro_4k"]
        return count * COSTS["gemini_pro_1k"]
    else:  # openai
        if model_name == "mini":
            return count * COSTS["openai_mini"]
        if model_name == "standard":
            return count * COSTS["openai_standard"]
        return count * COSTS["openai_best_high"]


# --- Aspect ratio mapping (Gemini → OpenAI size) ---

def gemini_ratio_to_openai_size(ratio):
    """Map Gemini aspect ratio strings to closest OpenAI size."""
    landscape = {"16:9", "3:2", "4:3", "21:9", "5:4"}
    portrait = {"9:16", "2:3", "3:4", "4:5"}
    if ratio in landscape:
        return "1536x1024"
    if ratio in portrait:
        return "1024x1536"
    return "1024x1024"


# --- Generators ---

def generate_gemini(prompt, model_name, resolution, aspect_ratio, system_instructions=None):
    from google import genai
    from google.genai import types

    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("Error: GEMINI_API_KEY not set.", file=sys.stderr)
        sys.exit(1)

    client = genai.Client(api_key=api_key)
    model_id = GEMINI_MODELS[model_name]

    img_cfg = {"image_size": resolution}
    if aspect_ratio:
        img_cfg["aspect_ratio"] = aspect_ratio

    config_kwargs = {
        "response_modalities": ["TEXT", "IMAGE"],
        "image_config": types.ImageConfig(**img_cfg),
    }
    if system_instructions:
        config_kwargs["system_instruction"] = system_instructions

    response = client.models.generate_content(
        model=model_id,
        contents=prompt,
        config=types.GenerateContentConfig(**config_kwargs),
    )
    return response


def save_gemini_image(response, output_path):
    from PIL import Image as PILImage
    output_path = Path(output_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    for part in response.parts:
        if part.text is not None:
            print(f"Model note: {part.text}")
        elif part.inline_data is not None:
            image_data = part.inline_data.data
            if isinstance(image_data, str):
                image_data = base64.b64decode(image_data)
            image = PILImage.open(BytesIO(image_data))
            if image.mode == "RGBA":
                rgb = PILImage.new("RGB", image.size, (255, 255, 255))
                rgb.paste(image, mask=image.split()[3])
                rgb.save(str(output_path), "PNG")
            elif image.mode == "RGB":
                image.save(str(output_path), "PNG")
            else:
                image.convert("RGB").save(str(output_path), "PNG")
            return True
    return False


def generate_openai(prompt, model_name, size, quality="auto"):
    from openai import OpenAI

    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        print("Error: OPENAI_API_KEY not set.", file=sys.stderr)
        sys.exit(1)

    client = OpenAI(api_key=api_key)
    model_id = OPENAI_MODELS[model_name]

    # GPT Image models use output_format, not response_format
    kwargs = {
        "model": model_id,
        "prompt": prompt,
        "n": 1,
        "size": size,
    }
    if quality != "auto":
        kwargs["quality"] = quality

    # Try b64_json via output_format first, fall back to URL
    try:
        kwargs["output_format"] = "png"
        response = client.images.generate(**kwargs)
    except Exception:
        # Fallback without output_format
        if "output_format" in kwargs:
            del kwargs["output_format"]
        response = client.images.generate(**kwargs)
    return response


def save_openai_image(response, output_path):
    from PIL import Image as PILImage
    import urllib.request
    output_path = Path(output_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    data = response.data[0]

    # Try b64_json first
    b64 = getattr(data, "b64_json", None)
    if b64:
        image_data = base64.b64decode(b64)
        image = PILImage.open(BytesIO(image_data))
        image.save(str(output_path), "PNG")
        return True

    # Try direct bytes (some SDK versions)
    raw_bytes = getattr(data, "b64", None)
    if raw_bytes:
        image_data = base64.b64decode(raw_bytes)
        image = PILImage.open(BytesIO(image_data))
        image.save(str(output_path), "PNG")
        return True

    # Fall back to URL download
    url = getattr(data, "url", None)
    if url:
        urllib.request.urlretrieve(url, str(output_path))
        return True

    return False


# --- Main ---

def main():
    all_models = list(GEMINI_MODELS.keys()) + list(OPENAI_MODELS.keys()) + ["auto"]

    parser = argparse.ArgumentParser(description="Generate images with Gemini or OpenAI")
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--prompt", "-p", help="Text prompt")
    group.add_argument("--template", "-t", help="Prompt library template ID")
    parser.add_argument("--vars", "-v", default="{}", help="JSON variables for template")
    parser.add_argument("--filename", "-f", required=True, help="Output filename ({n} and {ratio} are replaced)")
    parser.add_argument("--provider", choices=["gemini", "openai"], default="gemini", help="Provider (default: gemini)")
    parser.add_argument("--model", "-m", choices=all_models, default="auto", help="Model tier")
    parser.add_argument("--resolution", "-r", choices=["1K", "2K", "4K"], default="1K", help="Gemini resolution")
    parser.add_argument("--aspect-ratio", "-a", choices=GEMINI_ASPECT_RATIOS, default=None, help="Aspect ratio (Gemini native, mapped to closest OpenAI size)")
    parser.add_argument("--openai-size", choices=OPENAI_SIZES, default=None, help="OpenAI size override")
    parser.add_argument("--quality", choices=["auto", "low", "medium", "high"], default="auto", help="OpenAI quality")
    parser.add_argument("--batch", "-b", type=int, default=1, help="Number of variations")
    parser.add_argument("--sizes", help="Comma-separated aspect ratios for multi-size batch")
    parser.add_argument("--use-guidelines", action="store_true", help="Use prompt library guidelines as system instructions")
    parser.add_argument("--cost-estimate", action="store_true", help="Show cost estimate only, don't generate")
    args = parser.parse_args()

    # Resolve prompt
    template = None
    if args.template:
        template, tpl_data = load_template(args.template)
        variables = json.loads(args.vars)
        prompt_text = substitute_vars(template["prompt_adapted"], variables)
        if not args.aspect_ratio and template.get("aspect_ratio"):
            args.aspect_ratio = template["aspect_ratio"]
        print(f"Template: {template['id']} ({template['name']})")
    else:
        prompt_text = args.prompt

    # Model selection
    provider = args.provider
    if provider == "gemini":
        model_name = select_gemini_model(args, template)
        model_display = f"{model_name} ({GEMINI_MODELS[model_name]})"
    else:
        model_name = select_openai_model(args, template)
        model_display = f"{model_name} ({OPENAI_MODELS[model_name]})"

    # Determine generation plan
    sizes = [args.aspect_ratio] if not args.sizes else args.sizes.split(",")
    total_images = args.batch * len(sizes)

    cost = estimate_cost(provider, model_name, args.resolution, total_images)
    print(f"Provider: {provider}")
    print(f"Model: {model_display}")
    if provider == "gemini":
        print(f"Resolution: {args.resolution}")
    print(f"Images: {total_images} ({args.batch} variation(s) x {len(sizes)} size(s))")
    print(f"Estimated cost: ${cost:.3f}")

    if args.cost_estimate:
        return

    # Load guidelines
    system_instructions = None
    if args.use_guidelines:
        guidelines = load_guidelines()
        if guidelines:
            system_instructions = guidelines
            print("Using prompt engineering guidelines as system instructions")

    # Generate
    generated = []
    for batch_n in range(1, args.batch + 1):
        for size in sizes:
            ar = size.strip() if size else None
            fname = args.filename
            fname = fname.replace("{n}", f"{batch_n:03d}")
            if ar:
                fname = fname.replace("{ratio}", ar.replace(":", "x"))

            print(f"\nGenerating: {fname} (batch {batch_n}, ratio {ar or 'auto'})...")
            try:
                if provider == "gemini":
                    response = generate_gemini(
                        prompt_text, model_name, args.resolution, ar,
                        system_instructions=system_instructions,
                    )
                    success = save_gemini_image(response, fname)
                else:
                    oai_size = args.openai_size or (gemini_ratio_to_openai_size(ar) if ar else "1024x1024")
                    response = generate_openai(
                        prompt_text, model_name, oai_size, quality=args.quality,
                    )
                    success = save_openai_image(response, fname)

                if success:
                    full_path = Path(fname).resolve()
                    print(f"Saved: {full_path}")
                    print(f"MEDIA:{full_path}")
                    generated.append(str(full_path))
                else:
                    print("Error: No image in response.", file=sys.stderr)
            except Exception as e:
                print(f"Error: {e}", file=sys.stderr)

    if generated:
        print(f"\nGenerated {len(generated)} image(s) successfully.")
    else:
        print("\nNo images generated.", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
