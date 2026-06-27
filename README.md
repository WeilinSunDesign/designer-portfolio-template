# Designer Portfolio Template

A minimal, opinionated portfolio template for designers. Built with React + Vite + Tailwind CSS v4. Fixed design system — you only edit content.

**[Live demo →](https://weilinsundesign.github.io/designer-portfolio-template/)**

---

## What you get

- Homepage with animated name, bio, nav links, and image carousel
- Projects grid with section grouping (UX/UI, Creative Coding, Other)
- About page with photo, bio, skills, and CV embed
- Two types of case study pages:
  - **Generic** — structured content blocks (fastest to write, no code)
  - **Custom** — full hand-crafted layout (more creative control, requires editing TSX)
- Password protection for the projects section (optional)
- Deployed via GitHub Pages (or any static host)

---

## Get started

**Prerequisites:** Node.js 18+, Git

### 1. Fork or clone this repo

```bash
git clone https://github.com/YOUR_USERNAME/designer-portfolio-template.git
cd designer-portfolio-template
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the dev server

```bash
npm run dev
```

Open `http://localhost:5173` — you should see the template with placeholder content.

---

## Fill in your content

Everything you need to edit lives in **one file**:

### `src/portfolio.config.ts`

Open it and replace the placeholder values:

```ts
export const personal = {
  name: "Your Name",           // ← your name
  title: "Product Designer",   // ← your role
  location: "London / Remote", // ← your location
  bio: ["First paragraph...", "Second paragraph..."],
  links: [
    { label: "LinkedIn", href: "https://linkedin.com/in/you" },
    { label: "Email",    href: "mailto:you@example.com" },
    { label: "Resume",   href: "/your-cv.pdf" },
  ],
  cvFile: "your-cv.pdf",       // ← filename of your CV in /public/
};
```

Add your projects to the `projects` array. Each project needs:

```ts
{
  slug: "my-project",                  // URL: /projects/my-project
  title: "My Project Title",
  coverImage: "/my-cover.webp",        // image in /public/
  year: "2024",
  chips: ["UX Design", "Mobile"],
  section: "ux-ui-projects",           // "ux-ui-projects" | "creative-coding" | "other-projects"
  pageType: "generic",                 // "generic" | "custom" | null
}
```

### Drop your images in `/public/`

Use `.webp` format for best performance. Reference them by filename (e.g. `"/my-cover.webp"`).

---

## Adding a case study page

### Option A — Generic (no code, just fill in content)

Best for most projects. You write structured content blocks in a `.ts` file.

**1.** Set `pageType: "generic"` in `portfolio.config.ts`

**2.** Copy `src/case-studies/example.ts` → `src/case-studies/my-project.ts`  
Fill in the sections and blocks. Available block types:

| type | renders as |
|---|---|
| `"paragraph"` | Body text |
| `"paragraph-key"` | Bold statement |
| `"decision"` | Teal callout box |
| `"subhead"` | Section subheading |
| `"image"` | Full-width image |
| `"image-row"` | 2–3 images side by side |

**3.** Register it in `src/case-studies/registry.ts`:

```ts
import myProject from "./my-project";

export const registry = {
  "my-project": myProject,
};
```

---

### Option B — Custom layout (more control, requires TSX editing)

Best for projects where you want a unique layout, diagrams, or timeline components.

**1.** Set `pageType: "custom"` in `portfolio.config.ts`

**2.** Copy `src/custom-case-study-template.tsx` → `src/my-project.tsx`  
Replace all `YOUR_XXX` placeholders with your content. The template includes:
- Parallax hero with background image
- Project intro: image + detail table
- 4-column content grid (label | spacer | content)
- Tree diagram components (system architecture)
- Phase timeline
- Brand callout boxes

**3.** Add a route in `src/main.tsx`:

```tsx
import MyProjectPage from "./my-project";

// inside <Routes>:
<Route path="/projects/my-project" element={<MyProjectPage />} />
```

---

## Customise with Claude Code (recommended)

If you have [Claude Code](https://claude.ai/code) installed, open this project and run:

```
/setup-portfolio
```

Claude will ask for your info and generate all config files for you.

---

## Deploy to GitHub Pages

```bash
npm run build
```

Push to GitHub, then enable Pages under **Settings → Pages → Deploy from branch** (`gh-pages` or `docs`).

---

## Tech stack

- React 18 + Vite + TypeScript
- Tailwind CSS v4
- Framer Motion
- React Router (HashRouter — required for GitHub Pages)
- GoatCounter analytics (privacy-friendly, free)

---

## License

MIT — use it, adapt it, share it.
