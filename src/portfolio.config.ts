// ─────────────────────────────────────────────────────────────────────────────
// PORTFOLIO CONFIG — edit this file to customise the entire site
// ─────────────────────────────────────────────────────────────────────────────
//
// This is the single source of truth for all content.
// Design, layout and component code are untouched — only this file changes.
//
// pageType:
//   "custom"  — has a hand-crafted .tsx case study (see CLAUDE.md for guide)
//   "generic" — uses CaseStudyPage.tsx + a content file in src/case-studies/
//   null      — no detail page yet (shows a WIP toast on click)
// ─────────────────────────────────────────────────────────────────────────────

// ── Personal info ─────────────────────────────────────────────────────────────

export const personal = {
  name: "Your Name",
  title: "Your Role",               // first pill badge (e.g. "Product Designer")
  location: "Your City / Remote",   // second pill badge
  yearStart: 2020,
  yearEnd: 2025,
  bio: [
    "A short sentence about your background and what makes you distinct as a designer.",
    "A second sentence about your focus area, approach, or the kind of work you love.",
  ],
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/your-profile/" },
    { label: "Email",    href: "mailto:you@example.com" },
    { label: "Resume",   href: "/your-cv.pdf" },
  ],
  // Filename of your CV in /public — referenced by the About page
  cvFile: "your-cv.pdf",
};

// ── About page ────────────────────────────────────────────────────────────────

export const about = {
  // Drop your photo in /public and reference it here
  photo: "/your-photo.webp",
  bio: "Hi, I am [Your Name]. Write a few sentences about who you are, your background, and what drives your design practice. Keep it personal and authentic.",
  skills: [
    { category: "Design",      items: ["UX Research", "Wireframing", "Prototyping", "User Testing", "Information Architecture"] },
    { category: "Tools",       items: ["Figma", "Adobe XD", "Illustrator", "Miro"] },
    { category: "Development", items: ["HTML", "CSS", "React"] },
    { category: "Methods",     items: ["Design Thinking", "Agile", "Systems Thinking"] },
  ],
};

// ── Homepage nav menu ─────────────────────────────────────────────────────────

export const homeNav = [
  { id: "01", label: "UX/UI Projects",    target: "/projects#ux-ui-projects"  },
  { id: "02", label: "Creative Computing", target: "/projects#creative-coding" },
  { id: "03", label: "Other Projects",    target: "/projects#other-projects"  },
  { id: "04", label: "About me",          target: "/about"                    },
];

// ── Project grid sections (order controls display order) ──────────────────────

export const projectSections = [
  { id: "ux-ui-projects",  title: "UX/UI Projects"   },
  { id: "creative-coding", title: "Creative Coding"  },
  { id: "other-projects",  title: "Other Projects"   },
];

// ── Projects ──────────────────────────────────────────────────────────────────

export type PageType = "custom" | "generic" | null;

export interface Project {
  slug: string;
  title: string;
  coverImage: string;
  year: string;
  chips: string[];
  section: string;
  pageType: PageType;
}

export const projects: Project[] = [
  // ── UX / UI ──────────────────────────────────────────────────────────────
  //
  // Example with a generic content page (uses src/case-studies/my-project.ts):
  //
  // {
  //   slug: "my-project",
  //   title: "Your Project Title",
  //   coverImage: "/my-project-cover.webp",
  //   year: "2024",
  //   chips: ["UX Design", "Mobile", "Shipped"],
  //   section: "ux-ui-projects",
  //   pageType: "generic",   // → reads from src/case-studies/registry.ts
  // },
  //
  // Example placeholder (no page yet — shows a "check back soon" toast):
  //
  // {
  //   slug: "wip-project",
  //   title: "Work In Progress Project",
  //   coverImage: "/wip-cover.webp",
  //   year: "2025",
  //   chips: ["Service Design", "Research"],
  //   section: "ux-ui-projects",
  //   pageType: null,
  // },

  {
    slug: "custom-example",
    title: "Custom Case Study Template (click to preview)",
    coverImage: "/project-one-cover.webp",
    year: "2024",
    chips: ["Template", "Custom Layout"],
    section: "ux-ui-projects",
    pageType: "custom",
  },
  {
    slug: "project-two",
    title: "Your Second Project Title",
    coverImage: "/project-two-cover.webp",
    year: "2023",
    chips: ["Service Design", "Research"],
    section: "ux-ui-projects",
    pageType: null,
  },
  // ── Creative Coding ───────────────────────────────────────────────────────
  {
    slug: "creative-one",
    title: "Your Creative / Coding Project",
    coverImage: "/creative-one-cover.webp",
    year: "2024",
    chips: ["Generative", "Experiment"],
    section: "creative-coding",
    pageType: null,
  },
  // ── Other ─────────────────────────────────────────────────────────────────
  {
    slug: "other-one",
    title: "Any Other Project",
    coverImage: "/other-one-cover.webp",
    year: "2023",
    chips: ["Physical", "Prototype"],
    section: "other-projects",
    pageType: null,
  },
];

// ── Homepage carousel ─────────────────────────────────────────────────────────
// Subset of project images shown in the homepage slideshow.
// Add one entry per image you want to feature.

export const carouselImages = [
  { img: "./project-one-cover.webp",   title: "Your First Project Title",          slug: "project-one"   },
  { img: "./project-two-cover.webp",   title: "Your Second Project Title",         slug: "project-two"   },
  { img: "./creative-one-cover.webp",  title: "Your Creative / Coding Project",    slug: "creative-one"  },
  { img: "./other-one-cover.webp",     title: "Any Other Project",                 slug: "other-one"     },
];
