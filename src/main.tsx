import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import { usePageView } from "./usePageView";

import App from "./App";
import ProjectsPage from "./ProjectsPage";
import AboutMe from "./AboutMe.tsx";
import CaseStudyPage from "./CaseStudyPage";
import CustomCaseStudyTemplate from "./custom-case-study-template";

import "./index.css";

function PageViewTracker() {
  usePageView();
  return null;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <PageViewTracker />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<AboutMe />} />
        <Route path="/projects" element={<ProjectsPage />} />

        {/* ── Custom hand-crafted case study pages ─────────────────────────────
            To add your own custom .tsx case study:
            1. Copy src/custom-case-study-template.tsx → src/your-project.tsx
            2. Fill in your content (replace all YOUR_XXX placeholders)
            3. Import it here and add a Route below
            4. Set pageType: "custom" for your project in portfolio.config.ts
        ── */}
        <Route path="/projects/custom-example" element={<CustomCaseStudyTemplate />} />

        {/* ── Generic template pages (reads from src/case-studies/registry.ts) ── */}
        <Route path="/projects/:slug" element={<CaseStudyPage />} />
      </Routes>
    </HashRouter>
  </StrictMode>
);
