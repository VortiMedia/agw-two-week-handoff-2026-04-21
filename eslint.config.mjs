import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Reference material moved to repo root by the 2026-04-22 flatten —
    // not part of the app source, should not be type-checked or linted.
    "artifacts/**",
    "design-system/**",
    "content/**",
    "assets/**",
    "brand-kit/**",
    "phase-0/**",
    "skills/**",
  ]),
]);

export default eslintConfig;
