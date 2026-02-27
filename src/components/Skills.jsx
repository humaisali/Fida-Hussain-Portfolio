import { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";

// ── Intersection Observer hook ──
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ══════════════════════════════════
//  SVG ICONS
// ══════════════════════════════════
const PenIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
  </svg>
);
const FileTextIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
  </svg>
);
const TargetIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);
const WrenchIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
  </svg>
);

// Marquee tool icons (SVG-based)
const ClaudeIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 8v4l3 3"/>
  </svg>
);
const DocsIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
);
const GrammarlyIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10"/><path d="M16 12h-4v4"/><path d="M16 16h4"/>
  </svg>
);
const AhrefsIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
  </svg>
);
const SEMrushIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>
  </svg>
);
const NotionIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 8h6"/><path d="M9 12h6"/><path d="M9 16h4"/>
  </svg>
);
const SeoIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const BrandIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

// ══════════════════════════════════
//  DATA
// ══════════════════════════════════
const SKILLS = [
  {
    title: "Copywriting",
    Icon: PenIcon,
    items: [
      "Website Copywriting",
      "Landing Page Copy",
      "Sales Page Copy",
      "Email Marketing Copy",
      "Ad Copy (Facebook, Google, Social)",
    ],
  },
  {
    title: "Content Writing",
    Icon: FileTextIcon,
    items: [
      "SEO Blog Writing",
      "Long-Form Articles",
      "Brand Storytelling",
      "Case Studies",
      "Thought Leadership Content",
    ],
  },
  {
    title: "Strategy",
    Icon: TargetIcon,
    items: [
      "Audience Research & Buyer Personas",
      "Brand Voice Development",
      "SEO Optimization",
      "Content Strategy Planning",
      "A/B Copy Testing",
    ],
  },
  {
    title: "Tools",
    Icon: WrenchIcon,
    items: [
      "Claude AI",
      "Google Docs",
      "Grammarly",
      "Ahrefs",
      "SEMrush",
      "Notion",
    ],
  },
];

const MARQUEE_TOOLS = [
  { name: "Claude AI",    Icon: ClaudeIcon },
  { name: "Google Docs",  Icon: DocsIcon },
  { name: "Grammarly",    Icon: GrammarlyIcon },
  { name: "Ahrefs",       Icon: AhrefsIcon },
  { name: "SEMrush",      Icon: SEMrushIcon },
  { name: "Notion",       Icon: NotionIcon },
  { name: "SEO",          Icon: SeoIcon },
  { name: "Branding",     Icon: BrandIcon },
];

// ── Skill Card ──
function SkillCard({ title, Icon, items, isDark, delay = 0 }) {
  const [ref, inView] = useInView(0.1);

  return (
    <div
      ref={ref}
      className={`rounded-xl p-6 flex flex-col gap-4
        ${isDark ? "bg-black" : "bg-white"}
        border border-[rgba(80,200,120,0.3)]
        transition-all duration-300`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms, box-shadow 0.3s`,
        boxShadow: "0 0 20px rgba(80,200,120,0.12)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 0 36px rgba(80,200,120,0.3)";
        e.currentTarget.style.borderColor = "rgba(80,200,120,0.6)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 0 20px rgba(80,200,120,0.12)";
        e.currentTarget.style.borderColor = "rgba(80,200,120,0.3)";
      }}
    >
      {/* Card header */}
      <div className="flex items-center gap-3">
        <span style={{ color: "var(--accent)" }}>
          <Icon />
        </span>
        <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-zinc-900"}`}>
          {title}
        </h3>
      </div>

      {/* Divider */}
      <div
        className="w-full h-px"
        style={{ background: "linear-gradient(90deg, rgba(80,200,120,0.4), transparent)" }}
      />

      {/* Items list */}
      <ul className="flex flex-col gap-2">
        {items.map((item, i) => (
          <li key={i} className={`text-sm flex items-center gap-2.5 ${isDark ? "text-gray-400" : "text-zinc-600"}`}>
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{
                background: "var(--accent)",
                boxShadow: "0 0 6px rgba(80,200,120,0.9)",
              }}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ══════════════════════════════════
//  SKILLS COMPONENT
// ══════════════════════════════════
export default function Skills() {
  const { isDark } = useTheme();
  const [headerRef, headerInView] = useInView(0.2);

  return (
    <section
      id="skills"
      className={`relative min-h-screen flex flex-col justify-center overflow-hidden
        ${isDark ? "bg-black/70" : "bg-zinc-100/80"}`}
    >
      {/* Radial glow left */}
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(80,200,120,0.05) 0%, transparent 70%)" }}
      />

      {/* ── Main Content ── */}
      <div className="relative z-10 w-full px-6 py-10 mx-auto max-w-7xl">

        {/* Section Header */}
        <div ref={headerRef} className="mb-16">
          <div
            className="flex items-center gap-3 mb-4"
            style={{
              opacity: headerInView ? 1 : 0,
              transform: headerInView ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
            }}
          >
            <span
              className="block w-10 h-px"
              style={{ background: "var(--accent)", boxShadow: "0 0 8px rgba(80,200,120,0.7)" }}
            />
            <span className="text-xs section-label">Skills & Expertise</span>
          </div>

          <div
            style={{
              opacity: headerInView ? 1 : 0,
              transform: headerInView ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease-out 0.1s, transform 0.6s ease-out 0.1s",
            }}
          >
            <h2 className={`text-4xl md:text-5xl font-bold relative inline-block mt-1 tracking-tight
              ${isDark ? "text-white" : "text-zinc-900"}`}
            >
              What I Work With
              <span
                className="absolute left-0 -bottom-3 w-full h-[2px] rounded-full"
                style={{
                  background: "var(--accent)",
                  boxShadow: "0 0 20px rgba(80,200,120,0.8)",
                }}
              />
            </h2>
          </div>
        </div>

        {/* Skills Grid — 4 columns */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((skill, i) => (
            <SkillCard
              key={skill.title}
              {...skill}
              isDark={isDark}
              delay={i * 100}
            />
          ))}
        </div>
      </div>

      {/* ══════════ MARQUEE TOOL BAR ══════════ */}
      <div className="relative w-full mt-4">
        {/* Top glow line */}
        <div
          className="absolute top-0 left-0 w-full h-[2px]"
          style={{
            background: "var(--accent)",
            boxShadow: "0 0 25px rgba(80,200,120,0.8)",
          }}
        />
        {/* Bottom glow line */}
        <div
          className="absolute bottom-0 left-0 w-full h-[2px]"
          style={{
            background: "var(--accent)",
            boxShadow: "0 0 25px rgba(80,200,120,0.8)",
          }}
        />

        {/* Bar body */}
        <div
          className={`relative py-6 overflow-hidden
            ${isDark ? "bg-black/70" : "bg-white/70"}`}
          style={{
            boxShadow: "inset 0 0 30px rgba(80,200,120,0.06)",
          }}
        >
          {/* Edge fade masks */}
          <div
            className="absolute top-0 bottom-0 left-0 z-10 w-24 pointer-events-none"
            style={{
              background: isDark
                ? "linear-gradient(90deg, #000, transparent)"
                : "linear-gradient(90deg, #f4f4f5, transparent)",
            }}
          />
          <div
            className="absolute top-0 bottom-0 right-0 z-10 w-24 pointer-events-none"
            style={{
              background: isDark
                ? "linear-gradient(270deg, #000, transparent)"
                : "linear-gradient(270deg, #f4f4f5, transparent)",
            }}
          />

          {/* Scrolling track */}
          <div className="flex gap-10 px-16 w-max" style={{ animation: "marqueeScroll 28s linear infinite" }}>
            {[...MARQUEE_TOOLS, ...MARQUEE_TOOLS].map(({ name, Icon }, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2.5 min-w-[100px] cursor-default group"
              >
                <div
                  className={`w-16 h-16 flex items-center justify-center rounded-xl
                    border border-[rgba(80,200,120,0.3)]
                    group-hover:border-[rgba(80,200,120,0.7)]
                    transition-all duration-300
                    ${isDark ? "bg-zinc-900/60" : "bg-zinc-50"}`}
                  style={{
                    color: "var(--accent)",
                    boxShadow: "0 0 14px rgba(80,200,120,0.15)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 0 28px rgba(80,200,120,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 0 14px rgba(80,200,120,0.15)";
                  }}
                >
                  <Icon />
                </div>
            <span className={`text-xs font-sans ${isDark ? "text-gray-500" : "text-zinc-500"}`}>
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee keyframe */}
      <style>{`
        @keyframes marqueeScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}