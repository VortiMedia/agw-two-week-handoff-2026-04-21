---
name: frontend-design
description: Create premium, cinematic-tier frontend interfaces. Senior UI/UX engineer skill — enforces technical design dials, anti-slop patterns, creative arsenal, and bento motion paradigm. Covers landing pages, dashboards, SaaS UIs, and animated hero builds.
---

# Frontend Design

Create premium, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details, technical precision, and creative choices. This is senior-level UI/UX engineering enforcing design dials, architectural patterns, and cinematic motion.

---

## Design Philosophy

Before coding, commit to a bold, intentional direction. The gap between forgettable and unforgettable is clarity of vision, not intensity.

**Your decision tree:**
1. **Purpose**: What problem does this interface solve? Who uses it? What's their context?
2. **Tone**: Pick an extreme — brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian
3. **Constraints**: Technical requirements (framework, performance, accessibility, Tailwind version)
4. **Differentiation**: What's the one thing someone will remember? What makes this UNFORGETTABLE?

**CRITICAL**: Bold maximalism and refined minimalism both work. The key is intentionality and precision in execution, not timidity or scattered decisions.

## Fit-To-Brief Gate

Before writing code, decide which mode applies:

### Existing brand / existing site / repair mode
- Preserve the client's established brand, information hierarchy, and trust posture.
- Use this mode by default for contractor sites, heritage brands, local services, healthcare, legal, finance, and any rebuild where trust and clarity matter more than novelty.
- Start by naming **3-5 concrete visual failures** from the current page, screenshot, or live preview.
- Each failure must reference something specific: wasted top-of-page space, giant stacked headline, repetitive card rhythm, generic form box, weak CTA hierarchy, mismatched font weight, bad mobile density.
- Do **not** use vague diagnoses like `section grammar`, `needs more polish`, `less repetitive`, `cleaner hierarchy`, or `more premium` unless you tie them to a visible component.
- Do **not** use rewrite language like `reset`, `collapse`, `strip back`, or `take another pass` unless you can state the exact replacement structure first.

### New concept / greenfield mode
- Push harder on differentiation and formal risk, but still anchor every move to the brief.
- Novelty is earned, not automatic.

### Visual QA rule
- Do not rely on your internal design taste alone.
- If a screenshot, preview, or rendered page is available, review it before shipping.
- Reject the pass if the page still shows the same failure shape you started with, even if the code changed a lot.

---

## Configuration Dials (Choose Per Brief)

Before any design decision, tune these three dials. They govern layout, motion, and visual density across the entire interface.

### DESIGN_VARIANCE (Max: 10)
How much asymmetry, rule-breaking, and layout unpredictability?
- **0-2**: Perfect grids, centered everything, predictable
- **3-5**: Mild asymmetry, some overflow, mostly structured
- **6-8**: Aggressive asymmetry, diagonal flow, overlapping elements, grid-breaking
- **9-10**: Chaos with intent, extreme risk, avant-garde, museum-tier

Default guidance:
- **Existing brand / repair mode**: `2-4`
- **New marketing concept**: `5-7`

When DESIGN_VARIANCE > 4, centered hero should be the exception, not the default.

### MOTION_INTENSITY (Max: 10)
How much animation, micro-interaction, and motion throughout?
- **0-2**: Minimal, functional motion only
- **3-5**: Moderate, section reveals + micro-interactions
- **6-8**: Aggressive, perpetual motion, spring physics, staggered choreography
- **9-10**: Kinetic, every pixel breathes, potential motion sickness risk

Default guidance:
- **Existing brand / repair mode**: `1-3`
- **New marketing concept**: `3-6`

### VISUAL_DENSITY (Max: 10)
Information density per unit space?
- **0-2**: Minimalist white space, breathing room, sparse layouts
- **3-5**: Balanced, moderate whitespace
- **6-8**: Dense information, close proximity, card-heavy
- **9-10**: Maximum density, data visualization, dashboards

Default guidance:
- **Existing brand / repair mode**: `3-5`
- **New marketing concept**: `3-6`

---

## Architecture Defaults

Enforce these technical guardrails on every build.

### React Server Components (RSC)
- **Default**: Server Components by default
- **Interactive only**: `'use client'` for components that need useState, useCallback, event handlers, or Motion animations
- **Rationale**: Smaller bundle, faster TTL, cleaner data fetching

### Tailwind Version Lock
- **v3**: If using standard shadcn/ui or established projects
- **v4**: Preferred for new builds. Check `package.json` before importing utilities.
- **Mandate**: Always verify Tailwind version in `package.json` before writing CSS classes. v3 and v4 have different syntax (e.g., spacing, container queries, gradient syntax).

### Viewport Stability
- **NEVER** use `h-screen` — viewport height is unreliable on mobile
- **ALWAYS** use `min-h-[100dvh]` for full-screen elements (100dvh = dynamic viewport height)
- Rationale: Prevents address bar reflow on mobile devices

### Icon Library
- **ONLY**: Phosphor (phosphoricons.com) or Radix Icons (radix-ui.com/icons)
- **BAN**: Font Awesome, Feather, custom SVGs (unless explicitly designed)
- **Why**: Consistency, weight options, true design system integration

### Typography
- **Preferred Families**: Geist (modern, system-friendly), Cabinet Grotesk (editorial, luxury), Satoshi (rounded, playful)
- **HARD BAN**: Inter, Roboto, Arial
- **Rationale**: These overused fonts are immediate "AI tells" — custom typography signals quality
- **Implementation**: Import from Google Fonts or Vercel's fonts library
- **Pairing**: One distinctive display font + one refined body font (max 2 families)
- **Precedence rule**: if the client already has approved fonts, a brand kit, or an existing design system, use those instead of forcing the preferred list above.

### Dependency Verification
- Before any import statement: **check package.json**
- Install missing dependencies explicitly
- Don't assume shadcn/ui, Framer Motion, or any library is installed
- Example check: `cat package.json | grep framer-motion` before importing `motion`

---

## Anti-Patterns (AI Tells — BANNED)

These patterns scream "AI-generated" or "lazy design." **NEVER use:**

### Aesthetic Anti-Tells
- **THE LILA BAN**: Purple-to-blue gradients on dark backgrounds. AI Purple. Cyan/neon on black. This aesthetic is permanently marked as slop.
- Inter/Roboto/Arial as primary font (especially when it's the only font)
- Centered hero when DESIGN_VARIANCE > 4
- Cyan glowing shadows, neon text, overdone glassmorphism
- Every button the same style, every card identical
- 6×identical card grids with icon + heading + text repeated

### Interaction Anti-Tells
- Everything fades in from below with identical timing
- Spinners instead of skeletal loaders (skeleton shimmer > spinners)
- Same spacing everywhere (no hierarchy, no breathing)
- No hover states, no focus indicators, no disabled styling
- Motion that doesn't convey information

### Layout Anti-Tells
- Overused cards: for dense UIs (VISUAL_DENSITY > 6), use `border-t` dividers and `divide-y` striping instead of individual cards
- Perfect centering on everything
- Flexbox when Grid is appropriate (Grid > Flex-Math for layout)
- Hero with large centered image
- No asymmetry, no unexpected placement

### Copy & Content Anti-Tells
- EMOJI POLICY: NEVER use emojis in production UI (except intentional, designed-in moments)
- "Passionate about", "game-changing", "cutting-edge", "revolutionary"
- "It's worth noting", "In today's landscape", "At the end of the day"
- Generic value propositions that could apply to 500 companies

---

## Creative Variance Engine

**BEFORE coding, silently commit to two choices:**

If you are in existing-brand / repair mode, these archetypes are optional. Matching the existing trust posture beats forcing a new formal system.

### Vibe Archetype (choose one)
- **Ethereal Glass**: Translucent surfaces, soft gradients, breathing space, whisper-quiet interactions, premium but approachable
- **Editorial Luxury**: High contrast, dramatic typography, bold whitespace, museum-quality pacing, expensive but intentional
- **Soft Structuralism**: Geometric but warm, rational grids with human touches, minimalist but not cold, Scandinavian energy

### Layout Archetype (choose one)
- **Asymmetrical Bento**: Varied card sizes, diagonal flow, offset columns, high DESIGN_VARIANCE
- **Z-Axis Cascade**: Stacked layers, depth via overlap and shadow, scrollytelling, floating elements
- **Editorial Split**: Content on left, image on right (or vice versa), strong left/right hierarchy, classic but uncommon in web

**These two choices govern every decision downstream.** They're your north star, not a constraint.

---

## Design Engineering Directives

These are tools, not mandatory flourishes. Use them only when they fit the brief, the client, and the current design system.

### Double-Bezel Architecture ("Doppelrand")
Every premium card gets **two shells**:
1. **Outer shell**: background, ring (border), padding, radius
2. **Inner core**: its own background, inset shadow, mathematically smaller radius (e.g., if outer radius is `rounded-xl`, inner is `rounded-lg`)

This creates visual depth and luxury:
```jsx
<div className="bg-white ring-1 ring-gray-200 p-6 rounded-xl">
  {/* outer shell */}
  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 shadow-inner">
    {/* inner core */}
    {children}
  </div>
</div>
```

### Button-in-Button Pattern
Arrow icons (and trailing icons) are **nested in their own circular wrapper**, flush with the button's right padding:
```jsx
<button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
  Click Me
  <div className="w-6 h-6 bg-blue-700 rounded-full flex items-center justify-center">
    <PhosphorIcon size={16} />
  </div>
</button>
```

This creates a visual rhythm and prevents flat button designs.

### Macro-Whitespace
Section padding is **NOT px-4 or px-8**. Think bigger:
- **Vertical**: `py-24` to `py-40` between major sections (96-160px)
- **Horizontal**: `px-6` to `px-12` on content, full-width background sections
- **Breathing room**: Generous negative space between sections

Tight whitespace within a group (cards, list items), loose between groups.

### Eyebrow Tags
Before every H1/H2, place a **pill badge**:
```jsx
<div className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] bg-blue-100 text-blue-700 w-fit">
  New Feature
</div>
<h1 className="mt-4 text-4xl font-bold">Headline</h1>
```

This signals importance and breaks up long stretches of text.

### Fluid Island Navigation
Sticky nav is a **floating glass pill** (not full-width):
```jsx
<nav className="fixed top-0 left-1/2 -translate-x-1/2 mt-6 rounded-full bg-white/80 backdrop-blur-md ring-1 ring-white/20 px-6 py-3 flex gap-8 z-50">
  {navItems}
</nav>
```

Floating, centered, glassmorphic, minimal. Not a full-width header.

### Hamburger Morph
On mobile, hamburger lines rotate to X on click. Modal is screen-filling glass overlay with staggered mask reveal for links:
```jsx
const [open, setOpen] = useState(false);
<button onClick={() => setOpen(!open)} className="relative w-6 h-6">
  <div className={`absolute w-full h-0.5 bg-black transition-all ${open ? 'rotate-45' : ''}`} />
  <div className={`absolute w-full h-0.5 bg-black top-2 transition-opacity ${open ? 'opacity-0' : ''}`} />
  <div className={`absolute w-full h-0.5 bg-black top-4 transition-all ${open ? '-rotate-45 top-2' : ''}`} />
</button>
```

---

## Interaction States (All 8 Required)

Every interactive element must support **all 8 states**. Missing any is incomplete:

1. **Default**: Base state, no interaction
2. **Hover**: Cursor over element (desktop)
3. **Focus**: Keyboard focus (a11y critical)
4. **Active**: Pressed/clicked
5. **Disabled**: Unusable state (grayed out)
6. **Loading**: Async work in progress (skeleton shimmer, not spinner)
7. **Error**: Validation failure or API error
8. **Success**: Confirmation or completion state

Example button:
```jsx
<button
  className={`
    px-4 py-2 rounded-lg font-medium transition-all
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 focus:ring-2 focus:ring-blue-500'}
    ${state === 'loading' ? 'bg-blue-400 animate-pulse' : 'bg-blue-600'}
    ${state === 'error' ? 'bg-red-600' : ''}
    ${state === 'success' ? 'bg-green-600' : ''}
  `}
>
  {state === 'loading' ? <SkeletonLoader /> : label}
</button>
```

### Skeletal Loaders > Spinners
Use **skeleton shimmer** (pulsing placeholder shapes) instead of spinners:
```jsx
<div className="w-12 h-6 bg-gray-300 rounded animate-pulse" />
```

Rationale: Skeletons show content shape, reduce perceived wait time, feel more sophisticated.

---

## Liquid Glass & Magnetic Micro-Physics

### Liquid Glass Refraction
Premium glass cards get **1px inner border + inner shadow** for depth:
```jsx
<div className="bg-white/30 backdrop-blur-xl border border-white/40 rounded-xl p-6 shadow-lg">
  <div className="inset ring-1 ring-inset ring-white/60 rounded-xl" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5)' }}>
    {children}
  </div>
</div>
```

This creates the illusion of refracted light through glass.

### Magnetic Micro-Physics (Framer Motion)
Use `useMotionValue` for magnetic interactions, NOT `useState`:
```jsx
const x = useMotionValue(0);
const y = useMotionValue(0);

const handleMouseMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  x.set(e.clientX - rect.left - rect.width / 2);
  y.set(e.clientY - rect.top - rect.height / 2);
};

return <motion.div style={{ x, y }} onMouseMove={handleMouseMove} />;
```

Rationale: `useMotionValue` doesn't trigger re-renders, enabling 60fps smooth interactions.

### Perpetual Micro-Interactions
Spring physics for all animations:
```jsx
const transition = {
  type: 'spring',
  stiffness: 100,
  damping: 20,
};

<motion.div animate={{ opacity: 1 }} transition={transition} />
```

These params create a snappy but not jarring feel. Adjust:
- **Higher stiffness** (150+): Tighter, more responsive
- **Lower damping** (10-15): More bounce, more playful
- **Lower stiffness** (50-80): Looser, floating feel

---

## Creative Arsenal (42 Patterns)

Use these as starting points for high-impact moments. Each has a specific purpose:

### Navigation & Layout Patterns
- **Dock Magnification**: Icons scale on hover, create rhythm in fixed dock
- **Mega Menu**: Large, content-rich dropdown with columns and imagery
- **Speed Dial**: Floating action buttons radiating on click
- **Radial Menu**: Circular menu items around a center button
- **Gooey Menu**: Liquid, morphing menu that flows around click points
- **Dynamic Island**: Notch-aware components that adapt to phone hardware

### Scroll & Grid Patterns
- **Bento Grid**: Varied card sizes, masonry-like layout with purpose
- **Masonry**: Pinterest-style variable height cards
- **Chroma Grid**: Grid with color-coded cells, often for data/calendar
- **Split Screen Scroll**: Left/right sections scroll independently
- **Horizontal Scroll Hijack**: Prevents vertical scroll, forces horizontal on specific sections
- **Locomotive Scroll Sequence**: Smooth scrolling with choreographed reveals

### Reveal & Animation Patterns
- **Curtain Reveal**: Content slides in from sides like curtains opening
- **Parallax Tilt Card**: Card tilts based on mouse position, creating 3D effect
- **Spotlight Border Card**: Border highlights move with cursor, following light
- **Zoom Parallax**: Background zooms differently than foreground during scroll
- **Scroll Progress Path**: SVG path animates as user scrolls, showing progress
- **Liquid Swipe Transition**: Page transitions with liquid wave effect
- **Text Mask Reveal**: Text appears by animating a mask across letters
- **Text Scramble Effect**: Text characters scramble/unscramble on hover or reveal
- **Circular Text Path**: Text follows a circular SVG path
- **Gradient Stroke Animation**: SVG strokes animate with gradient colors
- **Kinetic Marquee**: Text scrolls horizontally, repeats infinitely, feels alive
- **Animated SVG Line Drawing**: SVG paths draw themselves on load/scroll

### Image & Visual Patterns
- **Dome Gallery**: Images bulge/distort in a dome shape on hover
- **Coverflow Carousel**: 3D carousel like iTunes Cover Flow
- **Hover Image Trail**: Images trail behind cursor as it moves
- **Glitch Effect Image**: RGB split/glitch effect on image, very trendy
- **Parallax Card**: Image parallaxes at different rate than card
- **Accordion Image Slider**: Images reveal via accordion open/close
- **Lens Blur Depth**: Simulated depth of field, blurred background
- **Mesh Gradient Background**: Generative mesh gradients, always unique

### Interaction Patterns
- **Magnetic Button**: Button follows mouse movement magnetically
- **Ripple Click Effect**: Ripple emanates from click point
- **Directional Hover Aware Button**: Button responds based on hover direction
- **Particle Explosion Button**: Particles burst from button on click
- **Liquid Pull-to-Refresh**: Liquid effect on pull-to-refresh gesture
- **Morphing Modal**: Modal shape morphs in/out, not just fade
- **Sticky Scroll Stack**: Cards stick as you scroll, creating stacking effect
- **Tinder Swipe Stack**: Cards swipe left/right to dismiss, stack below
- **Drag-to-Pan Grid**: Grid items pannable by dragging

### Loading & State Patterns
- **Skeleton Shimmer**: Pulsing placeholder shapes while loading
- **Typewriter Effect**: Text appears letter-by-letter, reveals with typing effect
- **Processing Shimmer**: Animated gradient over content during processing

---

## Bento Paradigm (Motion-Engine Cards)

The bento box paradigm uses **Framer Motion** to create 5 archetypal card types. Each has a specific interaction model and animation strategy.

### 1. Intelligent List
Sorts items via `layoutId`, creating smooth reflow animations:
```jsx
<motion.div layoutId={`item-${id}`} className="p-4">
  {content}
</motion.div>
```

Use case: Filterable lists, priority reordering, smart feeds.

### 2. Command Input
Typewriter effect + processing shimmer:
```jsx
<input
  onFocus={(e) => typeWriter(e.target)}
  className="focus:ring-2 focus:ring-blue-500"
/>
<motion.div
  animate={isProcessing ? { opacity: [0.5, 1] } : {}}
  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
/>
```

Use case: Search bars, input fields that show processing state.

### 3. Live Status
Breathing indicators + overshoot spring badge:
```jsx
<motion.div
  animate={{ scale: [1, 1.1, 1] }}
  transition={{ repeat: Infinity, duration: 2 }}
  className="w-3 h-3 bg-green-500 rounded-full"
/>
<motion.span
  animate={{ scale: [1, 1.2, 1] }}
  transition={{ type: 'spring', overshoot: 3 }}
  className="ml-2"
>
  Online
</motion.span>
```

Use case: Status indicators, "live" labels, availability.

### 4. Wide Data Stream
Infinite carousel, often horizontal:
```jsx
<motion.div
  animate={{ x: -500 }}
  transition={{ repeat: Infinity, duration: 20 }}
  className="flex gap-4"
>
  {items.map((item) => (
    <Card key={item.id} {...item} />
  ))}
</motion.div>
```

Use case: Feature carousels, infinite scrolling feeds, testimonials.

### 5. Contextual UI
Staggered text highlight + float-in toolbar:
```jsx
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ staggerChildren: 0.1 }}>
  {lines.map((line) => (
    <motion.div key={line} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
      {line}
    </motion.div>
  ))}
</motion.div>

<motion.div
  initial={{ y: 20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ delay: 0.5 }}
  className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-4"
>
  {toolbar}
</motion.div>
```

Use case: Highlight key content, show contextual actions.

---

## Execution Protocol (5 Steps)

When building a component or page:

1. **Scaffold**: Create the HTML/JSX structure with semantic tags, no styling yet
2. **Macro-Whitespace**: Add section padding (`py-24 to py-40`), breathing room between groups
3. **DOM via Double-Bezel**: Apply outer shell (bg, ring, padding, radius) + inner core (shadow, inset, smaller radius) to every card/container
4. **Choreograph Transitions**: Add Framer Motion, spring physics, staggered reveals. Assign purpose to every animation.
5. **Output**: Review all 8 interaction states, verify no AI tells, confirm accessibility

---

## Cinematic Hero Mode (AI Video Backgrounds)

### When to Use
High-impact landing pages where a 3D animated background justifies the cost. Creates premium, memorable first impressions. Use for:
- Product launches
- Agency/studio portfolios
- SaaS hero sections where differentiation is critical
- Premium B2B offers

**Requires**: FAL_API_KEY or Higsfield account (not yet in Vorti env)

### Prompt Template (Kling 3.0)
Generate video backgrounds using this prompt structure:

```
"Generate a high-quality 3D render style video of [SUBJECT]. 
The background should be [white/dark/neutral]. 
Make the asset super high quality. 
This should read like something you'd see on a premium website landing page hero. 
The camera should [pan slowly / rotate / zoom]. 
5 seconds, 1080p, 16:9."
```

**Examples:**
- "Generate a high-quality 3D render style video of abstract geometric shapes morphing. The background should be white. Make the asset super high quality. This should read like something you'd see on a premium website landing page hero. The camera should pan slowly from left to right. 5 seconds, 1080p, 16:9."
- "Generate a high-quality 3D render style video of liquid metal flowing. The background should be dark. Make the asset super high quality. This should read like something you'd see on a premium website landing page hero. The camera should rotate around the center. 5 seconds, 1080p, 16:9."

### Integration Pattern

1. **Place video**: Save .mp4 in `public/hero.mp4`
2. **HTML5 video element**: 
   ```jsx
   <video
     autoPlay
     muted
     loop
     playsInline
     className="absolute inset-0 w-full h-full object-cover z-0"
   >
     <source src="/hero.mp4" type="video/mp4" />
   </video>
   ```
3. **Overlay div with inward masking gradient**:
   ```jsx
   <div
     className="absolute inset-0 z-1"
     style={{
       background: 'linear-gradient(to bottom, transparent 60%, var(--bg-color) 100%)',
     }}
   />
   ```
4. **Hero content** at z-index 1 with backdrop-blur-sm for text contrast:
   ```jsx
   <div className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh]">
     <motion.h1 className="text-5xl font-bold text-white drop-shadow-lg backdrop-blur-sm">
       Your Headline
     </motion.h1>
   </div>
   ```

### Fallback
If video generation fails: Use `gpt-image-1.5` via image-gen skill to generate high-quality static image. **High-quality static > no asset.** Never ship a blank hero.

### Cost
- Per video: ~$0.36-1.50 (Kling pricing)
- Workflow: Generate 2-3 variations, pick best
- Total per hero: ~$3-5

---

## Output Enforcement

These rules apply to ALL code output. **Breaking these is non-negotiable.**

### Code Quality Rules
- **NO `// ...` placeholder comments**: No `// rest of code`, `// TODO`, `// implement here`, `// similar pattern follows`
- **NO "for brevity" language**: Don't write "for brevity, we've omitted..." or "the rest follows the same pattern"
- **Full implementation**: If you write code, write it completely. If token budget is exhausted, end with `[PAUSED — X of Y components complete. Send "continue" to resume from: ComponentName]`
- **No skeleton implementations**: Don't stub out class definitions with empty methods. Implement fully or don't output.
- **No commented-out code**: Code in comments confuses. Delete or ship.

### Completeness Rule
When a user requests a full component or page:
1. Output the complete, working implementation
2. If approaching token limits, pause cleanly and state exactly where to resume
3. Never output a half-built component that won't compile

### Example Completeness Check
✅ **CORRECT**: Full component with all 8 interaction states, imports, dependencies, and JSX
❌ **WRONG**: Component stub with `{/* content here */}` and `// handle this`
❌ **WRONG**: "For brevity, we've omitted the styling, but it follows the same pattern"

---

## Pre-Flight Checklist (10 Items)

Before shipping any design build:

1. ☐ **Vibe locked**: Have you silently committed to a Vibe Archetype (Ethereal Glass / Editorial Luxury / Soft Structuralism)?
2. ☐ **Layout locked**: Have you committed to a Layout Archetype (Asymmetrical Bento / Z-Axis Cascade / Editorial Split)?
3. ☐ **Dials tuned**: DESIGN_VARIANCE, MOTION_INTENSITY, VISUAL_DENSITY intentionally set (not defaults)?
4. ☐ **Typography chosen**: 2 fonts max, neither Inter/Roboto/Arial. Google Fonts or Vercel fonts imported?
5. ☐ **8 states verified**: Every button, input, card supports all 8 interaction states (default/hover/focus/active/disabled/loading/error/success)?
6. ☐ **No LILA**: Zero purple-to-blue gradients, zero AI aesthetic tells?
7. ☐ **No centered hero** (if DESIGN_VARIANCE > 4): Hero is offset, diagonal, or side-anchored?
8. ☐ **Viewport safe**: No `h-screen`, all full-screen elements use `min-h-[100dvh]`?
9. ☐ **Motion purpose**: Every animation conveys information. No decorative-only motion?
10. ☐ **Package.json verified**: Dependencies checked before any import. Tailwind version confirmed?

---

## Quality Bar

Your work should pass all three gates:

**Gate 1: Technical**
- Renders without errors
- All interaction states work
- Responsive (375px to 1440px+)
- Performance: no jank, 60fps animations

**Gate 2: Aesthetic**
- Clear vision, bold direction
- No AI tells (typography, gradients, layout)
- Memorable — someone will describe it
- Cohesive with committed Vibe & Layout archetypes

**Gate 3: User Experience**
- Intuitive, not clever
- Accessibility: keyboard nav, focus visible, color contrast (WCAG AA)
- Content hierarchy clear
- Interaction feedback immediate

---

## Additional Resources

- **Phosphor Icons**: https://phosphoricons.com
- **Radix Icons**: https://radix-ui.com/icons
- **Framer Motion**: https://www.framer.com/motion/
- **Tailwind CSS**: https://tailwindcss.com (check version in package.json)
- **Geist Font**: https://vercel.com/font
- **Cabinet Grotesk**: https://cabinetgrotesk.com
- **Satoshi Font**: https://www.fontfabric.com/fonts/satoshi/

---

*Remember: Claude is capable of extraordinary creative work. Don't hold back — show what can be created when thinking outside the box and committing fully to a distinctive vision.*
