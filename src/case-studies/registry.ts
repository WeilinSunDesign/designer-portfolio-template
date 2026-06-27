// ─────────────────────────────────────────────────────────────────────────────
// CASE STUDY REGISTRY
//
// Add one entry per "generic" case study page.
// Key = slug (must match the slug in portfolio.config.ts)
// Value = imported content object
//
// Custom .tsx case studies (swiftfood, healthtech, etc.) do NOT go here —
// they have their own route in main.tsx.
// ─────────────────────────────────────────────────────────────────────────────

import type { CaseStudyContent } from "./types";
import exampleContent from "./example";

// ── Add your imports here ────────────────────────────────────────────────────
// import myProject from "./my-project";

export const registry: Record<string, CaseStudyContent> = {
  // "project-one" is wired to the example template so you can preview the
  // case study layout out of the box. Replace with your own content file
  // and slug when you're ready.
  "project-one": exampleContent,

  // "my-project": myProject,
};
