// ─────────────────────────────────────────────────────────────────────────────
// CUSTOM CASE STUDY TEMPLATE
//
// HOW TO USE:
//   1. Copy this file → rename to src/your-project-name.tsx
//   2. Replace all YOUR_XXX placeholders with your actual content
//   3. Add your images to /public/
//   4. In main.tsx: import YourPage from "./your-project-name"
//      and add: <Route path="/projects/your-slug" element={<YourPage />} />
//   5. In portfolio.config.ts: set pageType: "custom" for your project
//
// WHAT THIS TEMPLATE GIVES YOU:
//   • Full-viewport hero with parallax background + sticky title
//   • Intro section: image left, project details right
//   • Scrollable case study sections with a fixed sidebar nav
//   • 4-column grid layout (label col | spacer col | content cols)
//   • Tree diagram components for showing system architecture
//   • Phase timeline for product evolution stories
//   • Image placeholders that show filename when image is missing
//   • Brand callout boxes (teal left border)
//   • Bulleted lists and sub-dividers
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./components/Header";

// ── Sidebar navigation sections ──────────────────────────────────────────────
// Each entry becomes a dot in the fixed left-side nav (xl screens only).
// id must match the <section id="..."> below.

const navSections = [
  { id: "s-overview",  label: "01 — Overview"  },
  { id: "s-context",   label: "02 — Context"   },
  { id: "s-process",   label: "03 — Process"   },
  { id: "s-design",    label: "04 — Design"    },
  { id: "s-outcome",   label: "05 — Outcome"   },
];

// ── Hero chip tags ────────────────────────────────────────────────────────────

const heroTags = ["YOUR TAG 1", "YOUR TAG 2", "YOUR TAG 3"];

// ── Project intro details (right column of the intro section) ─────────────────

const introDetails = [
  { label: "Overview:",  value: "One or two sentences describing what this project is and who it's for." },
  { label: "My Role:",   value: "Your Role Title" },
  { label: "Duration:",  value: "e.g. 6 months" },
  { label: "Tools:",     value: "Figma, Miro, Protopie" },
];

// ── Product phases (for the evolution / timeline section) ─────────────────────
// Delete or rename these if your project doesn't have phases.

const phases = [
  {
    number: "Phase 01",
    title:  "Your first phase title",
    label:  "Short label",
    body:   "A brief description of what happened in this phase and why.",
  },
  {
    number: "Phase 02",
    title:  "Your second phase title",
    label:  "Short label",
    body:   "A brief description of what happened in this phase and why.",
  },
  {
    number: "Phase 03",
    title:  "Your third phase title",
    label:  "Short label",
    body:   "A brief description of what happened in this phase and why.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// You don't need to edit these — they are shared layout primitives.
// ─────────────────────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: string }) {
  return <p className="type-section-nav mb-[32px] md:mb-[48px]">{children}</p>;
}

function SubDivider() {
  return <div className="border-t border-black/[0.07] mt-[40px] mb-[8px]" />;
}

// Image component — shows a dashed placeholder box when image file is missing.
function ImagePlaceholder({ filename, caption, ratio = "auto" }: { filename: string; caption?: string; ratio?: string }) {
  const [error, setError] = useState(false);
  return (
    <div className="flex flex-col gap-[6px]">
      {error ? (
        <div
          className="w-full bg-black/[0.03] border border-dashed border-black/12 flex items-center justify-center"
          style={{ aspectRatio: ratio, minHeight: "80px" }}
        >
          <p className="type-eyebrow text-black/25">{filename}</p>
        </div>
      ) : (
        <img
          src={`/${filename}`}
          alt={caption || filename}
          className="w-full object-cover"
          style={ratio === "auto" ? undefined : { aspectRatio: ratio }}
          loading="lazy"
          decoding="async"
          onError={() => setError(true)}
        />
      )}
      {caption && <p className="font-futura-heavy text-[11px] opacity-30 text-black">{caption}</p>}
    </div>
  );
}

// Tree diagram — use these to show system architecture or hierarchy.
function TreeNode({ label, sub }: { label: string; sub?: string }) {
  return (
    <div className="border border-black/70 px-[8px] py-[6px] text-center min-w-0">
      <p className="type-body-sm leading-snug break-words">{label}</p>
      {sub && <p className="type-eyebrow mt-[2px]">{sub}</p>}
    </div>
  );
}

function TreePipe() {
  return <div className="w-px h-[16px] bg-black/20 mx-auto" />;
}

function TreeConnector({ count }: { count: number }) {
  const centers = Array.from({ length: count }, (_, i) => ((2 * i + 1) / (2 * count)) * 100);
  return (
    <div className="relative w-full" style={{ height: "24px" }}>
      <div className="absolute bg-black/20" style={{ left: "50%", transform: "translateX(-50%)", width: "1px", top: 0, height: "50%" }} />
      <div className="absolute bg-black/20" style={{ left: `${centers[0]}%`, right: `${100 - centers[count - 1]}%`, height: "1px", top: "50%" }} />
      {centers.map((pct, i) => (
        <div key={i} className="absolute bg-black/20" style={{ left: `${pct}%`, transform: "translateX(-50%)", width: "1px", top: "50%", bottom: 0 }} />
      ))}
    </div>
  );
}

// Sidebar nav — fixed on the left side (xl breakpoint only).
function SidebarNav({ active, visible, onNavigate }: { active: string; visible: boolean; onNavigate: (id: string) => void }) {
  const activeIdx = navSections.findIndex((s) => s.id === active);
  return (
    <nav
      className="hidden xl:flex flex-col items-start"
      style={{
        position: "fixed", left: "36px", top: "50%", transform: "translateY(-50%)",
        zIndex: 20, opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.4s ease",
      }}
    >
      {navSections.map((section, i) => {
        const isActive = i === activeIdx;
        return (
          <div key={section.id} className="flex flex-col items-start">
            <button
              onClick={() => onNavigate(section.id)}
              className="flex items-center gap-[10px] py-[2px]"
              style={{ outline: "none", background: "none", border: "none", cursor: "pointer" }}
            >
              <div style={{
                width: isActive ? "8px" : "5px", height: isActive ? "8px" : "5px",
                borderRadius: "50%", border: isActive ? "1px solid #63C2BD" : "1px solid rgba(19,19,19,0.28)",
                backgroundColor: isActive ? "#63C2BD" : "transparent", flexShrink: 0,
                transition: "width 0.35s cubic-bezier(.4,0,.2,1), height 0.35s cubic-bezier(.4,0,.2,1), background-color 0.3s ease, border-color 0.3s ease",
              }} />
              <span style={{
                fontSize: "11px", letterSpacing: "0.02em", fontFamily: "var(--font-futura-medium)",
                color: isActive ? "#63C2BD" : "#131313", whiteSpace: "nowrap",
                opacity: isActive ? 1 : 0, transform: isActive ? "translateX(0)" : "translateX(-4px)",
                transition: "opacity 0.3s ease, transform 0.3s ease",
                pointerEvents: isActive ? "auto" : "none",
              }}>
                {section.label}
              </span>
            </button>
            {i < navSections.length - 1 && (
              <div style={{
                width: "1px", height: "20px", backgroundColor: "rgba(19,19,19,0.16)",
                marginLeft: isActive ? "3.5px" : "2px", marginTop: "2px", marginBottom: "2px",
                transition: "margin-left 0.35s cubic-bezier(.4,0,.2,1)",
              }} />
            )}
          </div>
        );
      })}
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function CustomCaseStudyTemplate() {
  const [scrollY, setScrollY]         = useState(0);
  const [activeSection, setActive]    = useState(navSections[0].id);
  const [showSidebar, setShowSidebar] = useState(false);
  const [titleH, setTitleH]           = useState(0);
  const caseStudyRef                  = useRef<HTMLDivElement>(null);
  const titleBlockRef                 = useRef<HTMLDivElement>(null);
  const introRef                      = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const measure = () => { if (titleBlockRef.current) setTitleH(titleBlockRef.current.offsetHeight); };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const el = introRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setShowSidebar(!e.isIntersecting), { threshold: 0 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    navSections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(id); },
        { rootMargin: "-20% 0px -60% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen w-full bg-my-bg text-black font-serif">

      <div className="fixed top-0 left-0 right-0 z-50">
        <Header right="projects" />
      </div>

      {/* ════════════════════════════════════════
          HERO — full viewport, parallax background
          Replace "your-hero-bg.webp" with your image in /public/
      ════════════════════════════════════════ */}
      <section
        style={{
          position:           "relative",
          height:             "100svh",
          backgroundImage:    "url(/your-hero-bg.webp)",
          backgroundSize:     "cover",
          backgroundPosition: typeof window !== "undefined" && window.innerWidth < 768
            ? `center ${scrollY * 0.1}px`
            : `center ${scrollY * 0.22}px`,
          backgroundRepeat:   "no-repeat",
        }}
      >
        <div ref={titleBlockRef} className="sticky top-[48px] md:top-[64px] px-[24px] md:px-[48px] xl:px-[80px] pt-[20px] md:pt-[28px] pb-[16px] md:pb-[22px]">
          <h1
            className="font-inria-serif leading-[0.95] tracking-tighter text-black bg-my-bg"
            style={{ fontSize: "clamp(1.5rem, 3.8vw, 4.2rem)", paddingLeft: "4px", paddingRight: "4px", display: "inline" }}
          >
            YOUR PROJECT TITLE — Replace this with your project name
          </h1>
          <div className="flex flex-wrap gap-2 mt-[20px] md:mt-[32px]">
            {heroTags.map((t) => (
              <span key={t} className="inline-flex rounded-full border border-black px-3 py-1 type-chip text-black bg-my-bg">
                {t}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={() => {
            const headerH = window.innerWidth >= 768 ? 64 : 48;
            window.scrollTo({ top: window.innerHeight - titleH - headerH, behavior: "smooth" });
          }}
          aria-label="Scroll down"
          className="absolute left-1/2 -translate-x-1/2 bottom-[28px] flex items-center justify-center rounded-full bg-my-bg border border-black/25 group hover:border-brand transition-colors duration-200"
          style={{
            width: "44px", height: "44px", cursor: "pointer",
            opacity: scrollY > 0 ? 0 : 1,
            pointerEvents: scrollY > 0 ? "none" : "auto",
            transition: "opacity 0.3s ease",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-black/60 group-hover:text-brand transition-colors duration-200">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </button>
      </section>

      {/* ════════════════════════════════════════
          INTRO — image left + project details right
          Replace "your-intro-image.webp" with your image in /public/
      ════════════════════════════════════════ */}
      <section ref={introRef} className="flex flex-col pb-[56px] md:pb-[80px]">
        <div className="flex flex-col md:grid md:grid-cols-2 px-[24px] md:px-[96px]">

          {/* Left — replace with your intro/mockup image */}
          <div className="flex flex-col justify-center self-stretch">
            <ImagePlaceholder filename="your-intro-image.webp" ratio="auto" />
          </div>

          {/* Right — project details table (edit introDetails array above) */}
          <div className="flex flex-col justify-center py-[28px] md:pt-[112px] md:pb-[72px] md:pl-[48px]">
            {introDetails.map((item) => (
              <div
                key={item.label}
                className="grid grid-cols-[100px_1fr] md:grid-cols-[130px_1fr] gap-x-[10px] md:gap-x-[14px] py-[12px] md:py-[20px] border-b border-black/12 last:border-b-0 items-start"
              >
                <p className="type-eyebrow md:text-[14px] leading-relaxed pt-[2px]">{item.label}</p>
                <p className="font-futura-medium text-[13px] md:text-[15px] leading-relaxed text-black">{item.value}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════
          CASE STUDY SECTIONS
          Sidebar nav appears once intro scrolls out of view.
          Each <section id="..."> maps to one navSection dot.
      ════════════════════════════════════════ */}
      <div ref={caseStudyRef} className="relative">
        <SidebarNav active={activeSection} visible={showSidebar} onNavigate={scrollToSection} />

        <div className="w-full px-[24px] md:px-[192px] pb-[80px]">

          {/* ── 01 — OVERVIEW ────────────────────────────────────────────────
              4-column grid: [label] [spacer] [content spans 2]
              Great for system architecture diagrams or role breakdowns.
          ─────────────────────────────────────────────────────────────────── */}
          <section id="s-overview" className="pb-[40px] md:pb-[56px] border-b border-black/15">
            <div className="border-t border-black/15 mb-[8px]" />
            <SectionLabel>01 — Overview</SectionLabel>

            {/* System diagram example — use TreeNode/TreeConnector/TreePipe */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[56px] md:mb-[72px]">
              <div>
                <p className="type-eyebrow md:text-[14px] mb-[20px]">YOUR SYSTEM / PRODUCT</p>
                <p className="type-body">
                  Brief description of what your product or system is and why it exists.
                </p>
              </div>
              <div className="md:col-span-3 flex flex-col items-center gap-0 w-full">
                {/* Example tree — edit labels to match your system */}
                <TreeNode label="Your Platform Name" />
                <TreeConnector count={3} />
                <div className="flex items-start gap-[12px] w-full">
                  <div className="flex flex-col items-center flex-1 min-w-0">
                    <TreeNode label="Service A" />
                    <TreePipe />
                    <TreeNode label="Interface A" sub="Mobile" />
                  </div>
                  <div className="flex flex-col items-center flex-1 min-w-0">
                    <TreeNode label="Service B" />
                    <TreePipe />
                    <TreeNode label="Interface B" sub="Web" />
                  </div>
                  <div className="flex flex-col items-center flex-1 min-w-0">
                    <TreeNode label="Service C" />
                    <TreeConnector count={2} />
                    <div className="flex items-start gap-[8px] w-full">
                      <div className="flex flex-col items-center flex-1 min-w-0"><TreeNode label="Sub-surface A" /></div>
                      <div className="flex flex-col items-center flex-1 min-w-0"><TreeNode label="Sub-surface B" /></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <SubDivider />

            {/* Role breakdown example */}
            <div className="mb-[40px] md:mb-[56px]">
              <p className="type-eyebrow md:text-[14px] mb-[20px]">My Role</p>
              <div className="flex flex-col gap-[8px]">
                {[
                  { title: "Role Title 1", body: "One sentence describing what you did in this role." },
                  { title: "Role Title 2", body: "One sentence describing what you did in this role." },
                  { title: "Role Title 3", body: "One sentence describing what you did in this role." },
                ].map(({ title, body }) => (
                  <div key={title} className="border border-black/15 px-[16px] py-[12px]">
                    <p className="type-body-key mb-[2px]">{title}</p>
                    <p className="type-body">{body}</p>
                  </div>
                ))}
              </div>
            </div>

          </section>

          {/* ── 02 — CONTEXT ─────────────────────────────────────────────────
              Use this section for background, problem statement, or product
              evolution timeline.
          ─────────────────────────────────────────────────────────────────── */}
          <section id="s-context" className="pt-[56px] pb-[256px] border-b border-black/15">
            <SectionLabel>02 — Context: YOUR SECTION SUBTITLE</SectionLabel>

            {/* Phase timeline — edit phases array above */}
            <div className="flex flex-col">
              <div className="relative flex items-center w-full mb-[24px]" style={{ height: "16px" }}>
                <div className="absolute left-0 right-0 h-px bg-black/15" />
                <div className="absolute inset-0 flex justify-between items-center">
                  {phases.map((phase) => (
                    <div key={phase.number} className="flex flex-col items-center" style={{ width: "33.33%" }}>
                      <div className="w-[8px] h-[8px] rounded-full border border-black/70 bg-my-bg" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex w-full mb-[32px]">
                {phases.map((phase) => (
                  <div key={phase.number} className="flex-1 flex flex-col items-center text-center px-[32px]">
                    <p className="type-eyebrow mb-[6px]">{phase.number}</p>
                    <h3 className="type-subhead mb-[8px]">{phase.title}</h3>
                    <span className="inline-flex rounded-full border border-black px-3 py-1 type-chip text-black bg-my-bg">{phase.label}</span>
                  </div>
                ))}
              </div>
              <div className="flex w-full gap-[12px]">
                {phases.map((phase) => (
                  <div key={phase.number} className="flex-1 border border-dashed border-black/25 p-[24px]">
                    <p className="type-body">{phase.body}</p>
                    {/* Add bullet lists, callouts, etc. here */}
                  </div>
                ))}
              </div>
            </div>

          </section>

          {/* ── 03 — PROCESS ─────────────────────────────────────────────────
              Research, exploration, decisions. Use the 4-col grid + callouts.
          ─────────────────────────────────────────────────────────────────── */}
          <section id="s-process" className="pt-[56px] pb-[256px] border-b border-black/15">
            <SectionLabel>03 — Process: YOUR SECTION SUBTITLE</SectionLabel>

            {/* 4-column block: label | spacer | content (2 cols) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[48px]">
              <div>
                <p className="type-eyebrow mb-[16px]">YOUR LABEL</p>
                <p className="type-body">Short framing sentence for this block.</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2">
                <p className="type-body-key mb-[16px]">
                  A key insight or framing statement — shown in bold. Use this for design principles or pivots.
                </p>
                <p className="type-body mb-[16px]">Supporting explanation paragraph.</p>
                <ul className="space-y-[8px]">
                  {["Finding or constraint 1", "Finding or constraint 2", "Finding or constraint 3"].map((item) => (
                    <li key={item} className="flex items-start gap-[10px]">
                      <span className="w-[4px] h-[4px] rounded-full bg-black/25 mt-[7px] flex-shrink-0" />
                      <p className="type-body-sm">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <SubDivider />

            {/* Images row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[48px]">
              <div>
                <p className="type-eyebrow mb-[16px]">YOUR LABEL</p>
                <p className="type-body">Caption for these images.</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2 flex gap-[12px]">
                <div className="flex-1"><ImagePlaceholder filename="your-image-1.webp" caption="Image caption" ratio="auto" /></div>
                <div className="flex-1"><ImagePlaceholder filename="your-image-2.webp" caption="Image caption" ratio="auto" /></div>
                <div className="flex-1"><ImagePlaceholder filename="your-image-3.webp" caption="Image caption" ratio="auto" /></div>
              </div>
            </div>

            <SubDivider />

            {/* Trade-off / decision callout box */}
            <div className="border border-black/20 p-[24px] md:p-[28px] mt-[24px] grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[20px]">
              <div>
                <p className="type-eyebrow mb-[16px]">The Trade-off</p>
                <div className="border-l-2 border-brand pl-[12px] py-[2px]">
                  <p className="type-body-sm text-brand">Novelty vs. usability (replace with your own)</p>
                </div>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2">
                <p className="type-body mb-[16px]">Explain the design trade-off you made and why.</p>
                <p className="type-eyebrow mb-[12px]">You prioritised</p>
                <div className="flex flex-wrap gap-[8px]">
                  {["Speed", "Clarity", "Scalability"].map((tag) => (
                    <span key={tag} className="inline-flex rounded-full border border-black px-3 py-1 type-chip text-black bg-my-bg">{tag}</span>
                  ))}
                </div>
              </div>
            </div>

          </section>

          {/* ── 04 — DESIGN ──────────────────────────────────────────────────
              Show the actual design work: screens, components, decisions.
          ─────────────────────────────────────────────────────────────────── */}
          <section id="s-design" className="pt-[56px] pb-[256px] border-b border-black/15">
            <SectionLabel>04 — Design: YOUR SECTION SUBTITLE</SectionLabel>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[48px]">
              <div>
                <p className="type-eyebrow mb-[16px]">YOUR LABEL</p>
                <p className="type-body">Describe the design focus for this section.</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2">
                <p className="type-body-key mb-[16px]">Key design decision stated clearly.</p>
                <p className="type-body mb-[24px]">Supporting detail paragraph.</p>
                <div className="border-l-2 border-brand pl-[12px] py-[2px]">
                  <p className="type-body-sm text-brand">Design principle stated in one sentence.</p>
                </div>
              </div>
            </div>

            <SubDivider />

            {/* Full-width image or centered image block */}
            <div className="flex justify-center">
              <div className="w-2/3 flex gap-[12px]">
                <div className="flex-1"><ImagePlaceholder filename="your-design-1.webp" caption="Screen or component" ratio="auto" /></div>
                <div className="flex-1"><ImagePlaceholder filename="your-design-2.webp" caption="Screen or component" ratio="auto" /></div>
                <div className="flex-1"><ImagePlaceholder filename="your-design-3.webp" caption="Screen or component" ratio="auto" /></div>
                <div className="flex-1"><ImagePlaceholder filename="your-design-4.webp" caption="Screen or component" ratio="auto" /></div>
              </div>
            </div>

          </section>

          {/* ── 05 — OUTCOME ─────────────────────────────────────────────────
              Results, learnings, next steps.
          ─────────────────────────────────────────────────────────────────── */}
          <section id="s-outcome" className="pt-[56px] pb-[256px] border-b border-black/15">
            <SectionLabel>05 — Outcome: YOUR SECTION SUBTITLE</SectionLabel>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[48px]">
              <div>
                <p className="type-eyebrow mb-[16px]">What shipped</p>
                <p className="type-body">Brief summary of what was delivered.</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2">
                <p className="type-body-key mb-[16px]">Outcome stated plainly — what did this project achieve?</p>
                <p className="type-body mb-[16px]">Measurable results, user feedback, or business impact.</p>
                <p className="type-body-sm text-black/40 italic">
                  Reflection, next steps, or things you would do differently.
                </p>
              </div>
            </div>

            {/* Final full-width image */}
            <div className="flex gap-[12px]">
              <div className="flex-1"><ImagePlaceholder filename="your-outcome-1.webp" caption="Final output" ratio="auto" /></div>
              <div className="flex-1"><ImagePlaceholder filename="your-outcome-2.webp" caption="Final output" ratio="auto" /></div>
            </div>

          </section>

          {/* Back link — don't edit */}
          <div className="pt-[48px]">
            <Link
              to="/projects"
              className="font-futura-heavy text-[12px] opacity-30 hover:opacity-100 transition-opacity inline-flex items-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" />
              </svg>
              Back to projects
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
