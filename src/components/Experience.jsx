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

// ── SVG Icons ──
const BriefcaseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2"/>
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const MapPinIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

// ── DATA ──
const EXPERIENCE = [
  {
    role: "Copywriter & Content Writer",
    company: "Gorilla Copywriting",
    duration: "Present",
    type: "Full-Time",
    location: "Remote",
    current: true,
    points: [
      "Write high-converting copy for websites, landing pages, and marketing funnels",
      "Develop content strategies aligned with business goals and audience needs",
      "Collaborate with designers and marketers to ensure brand consistency",
      "Optimize content for SEO and measurable performance outcomes",
    ],
  },
  {
    role: "Freelance Copywriter",
    company: "Self-Employed",
    duration: "3 Years",
    type: "Freelance",
    location: "Remote",
    current: false,
    points: [
      "Worked with clients across multiple industries including education, fitness, and business",
      "Delivered persuasive copy tailored to specific target audiences and brand voices",
      "Maintained long-term client relationships through consistent, high-quality results",
      "Built a portfolio of high-impact projects spanning emails, landing pages, and social content",
    ],
  },
];

// ── Experience Card ──
function ExperienceCard({ exp, isDark, delay = 0, index }) {
  const [ref, inView] = useInView(0.1);
  const { role, company, duration, type, location, current, points } = exp;

  return (
    <div
      ref={ref}
      className="relative flex gap-6"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
      }}
    >
      {/* ── Timeline spine ── */}
      <div className="flex flex-col items-center flex-shrink-0 pt-1">
        {/* Icon circle */}
        <div
          className={`w-11 h-11 rounded-full flex items-center justify-center z-10
            ${isDark ? "bg-zinc-900" : "bg-white"}
            border-2`}
          style={{
            borderColor: current ? "var(--accent)" : "rgba(80,200,120,0.35)",
            boxShadow: current
              ? "0 0 18px rgba(80,200,120,0.5)"
              : "0 0 10px rgba(80,200,120,0.15)",
            color: "var(--accent)",
          }}
        >
          <BriefcaseIcon />
        </div>

        {/* Vertical line — only if not last */}
        {index < EXPERIENCE.length - 1 && (
          <div
            className="flex-1 w-px mt-2"
            style={{
              background: "linear-gradient(to bottom, rgba(80,200,120,0.4), rgba(80,200,120,0.05))",
              minHeight: "60px",
            }}
          />
        )}
      </div>

      {/* ── Card ── */}
      <div
        className={`flex-1 mb-10 rounded-2xl overflow-hidden
          ${isDark ? "bg-black" : "bg-white"}
          border border-[rgba(80,200,120,0.25)]
          transition-all duration-300`}
        style={{ boxShadow: "0 0 20px rgba(80,200,120,0.08)" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 0 35px rgba(80,200,120,0.22)";
          e.currentTarget.style.borderColor = "rgba(80,200,120,0.5)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 0 20px rgba(80,200,120,0.08)";
          e.currentTarget.style.borderColor = "rgba(80,200,120,0.25)";
        }}
      >

        <div className="flex flex-col gap-5 p-6">
          {/* Header row */}
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className={`text-xl font-bold leading-snug ${isDark ? "text-white" : "text-zinc-900"}`}>
                {role}
              </h3>
              <p
                className="text-base font-semibold mt-0.5 font-mono"
                style={{ color: "var(--accent)" }}
              >
                {company}
              </p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {current && (
                <span
                  className="flex items-center gap-1.5 text-[11px] font-mono px-3 py-1 rounded-full"
                  style={{
                    background: "rgba(80,200,120,0.12)",
                    border: "1px solid rgba(80,200,120,0.4)",
                    color: "var(--accent)",
                    boxShadow: "0 0 10px rgba(80,200,120,0.2)",
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ background: "var(--accent)" }}
                  />
                  Current
                </span>
              )}
              <span
                className={`text-[11px] font-mono px-3 py-1 rounded-full
                  ${isDark ? "bg-zinc-900 text-gray-400" : "bg-zinc-100 text-zinc-600"}
                  border border-[rgba(80,200,120,0.15)]`}
              >
                {type}
              </span>
            </div>
          </div>

          {/* Meta info */}
          <div className="flex flex-wrap gap-4">
            <div className={`flex items-center gap-1.5 text-xs font-mono ${isDark ? "text-gray-500" : "text-zinc-500"}`}>
              <span style={{ color: "var(--accent)" }}><CalendarIcon /></span>
              {duration}
            </div>
            <div className={`flex items-center gap-1.5 text-xs font-mono ${isDark ? "text-gray-500" : "text-zinc-500"}`}>
              <span style={{ color: "var(--accent)" }}><MapPinIcon /></span>
              {location}
            </div>
          </div>

          {/* Divider */}
          <div
            className="w-full h-px"
            style={{ background: "linear-gradient(90deg, rgba(80,200,120,0.3), transparent)" }}
          />

          {/* Bullet points */}
          <ul className="flex flex-col gap-3">
            {points.map((point, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(80,200,120,0.1)",
                    border: "1px solid rgba(80,200,120,0.3)",
                    color: "var(--accent)",
                  }}
                >
                  <CheckIcon />
                </span>
                <span className={`text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-zinc-600"}`}>
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ── Right panel — summary card ──
function SummaryPanel({ isDark, inView }) {
  const stats = [
    { value: "3+",   label: "Years of Experience" },
    { value: "2",    label: "Roles Held" },
    { value: "50+",  label: "Projects Delivered" },
    { value: "100%", label: "Client Satisfaction" },
  ];

  const traits = [
    "Conversion-Focused Writing",
    "Strategic Content Planning",
    "SEO & Performance Optimization",
    "Brand Voice Development",
    "Multi-Industry Experience",
    "Long-Term Client Relationships",
  ];

  return (
    <div className="flex flex-col gap-6 lg:sticky lg:top-28">

      {/* Stats card */}
      <div
        className={`rounded-2xl p-6
          ${isDark ? "bg-black" : "bg-white"}
          border border-[rgba(80,200,120,0.25)]`}
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.6s ease-out 0.2s, transform 0.6s ease-out 0.2s",
          boxShadow: "0 0 24px rgba(80,200,120,0.1)",
        }}
      >
        <p className="mb-5 text-xs section-label">Career at a Glance</p>
        <div className="grid grid-cols-2 gap-4">
          {stats.map(({ value, label }) => (
            <div
              key={label}
              className={`flex flex-col items-center justify-center p-4 rounded-xl
                ${isDark ? "bg-zinc-900/60" : "bg-zinc-50"}
                border border-[rgba(80,200,120,0.15)]`}
            >
              <span
                className="font-mono text-2xl font-bold"
                style={{ color: "var(--accent)", textShadow: "0 0 12px rgba(80,200,120,0.4)" }}
              >
                {value}
              </span>
              <span className={`text-[11px] font-mono mt-1 text-center uppercase tracking-wide ${isDark ? "text-gray-600" : "text-zinc-500"}`}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Core strengths */}
      <div
        className={`rounded-2xl p-6
          ${isDark ? "bg-black" : "bg-white"}
          border border-[rgba(80,200,120,0.25)]`}
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.6s ease-out 0.38s, transform 0.6s ease-out 0.38s",
          boxShadow: "0 0 24px rgba(80,200,120,0.1)",
        }}
      >
        <p className="mb-5 text-xs section-label">Core Strengths</p>
        <div className="flex flex-col gap-2.5">
          {traits.map((trait, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: "var(--accent)", boxShadow: "0 0 6px rgba(80,200,120,0.8)" }}
              />
              <span className={`text-sm ${isDark ? "text-gray-400" : "text-zinc-600"}`}>{trait}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div
        style={{
          opacity: inView ? 1 : 0,
          transition: "opacity 0.6s ease-out 0.52s",
        }}
      >
        <button
          className="w-full text-sm font-semibold btn-accent"
          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
        >
          Hire Me
        </button>
      </div>
    </div>
  );
}

// ════════════════════════════════════════
//  EXPERIENCE COMPONENT
// ════════════════════════════════════════
export default function Experience() {
  const { isDark } = useTheme();
  const [headerRef, headerInView] = useInView(0.2);
  const [rightRef, rightInView] = useInView(0.1);

  return (
    <section
      id="experience"
      className={`relative min-h-screen flex flex-col justify-center overflow-hidden
        ${isDark ? "bg-black" : "bg-zinc-50"}`}
    >
      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(80,200,120,0.05) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 w-full px-6 py-24 pb-5 mx-auto max-w-7xl">

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
            <span className="text-xs section-label">Professional Experience</span>
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
              Where I've{" "}
              <span
                className="heading-underline"
                style={{ color: "var(--accent)", textShadow: "0 0 18px rgba(80,200,120,0.4)" }}
              >
                Worked.
              </span>
            </h2>

            <p
              className={`mt-8 text-base max-w-xl ${isDark ? "text-gray-400" : "text-zinc-600"}`}
              style={{
                opacity: headerInView ? 1 : 0,
                transition: "opacity 0.6s ease-out 0.25s",
              }}
            >
              Three years of sharpening the craft — from freelance projects to agency-level work — always focused on one thing: copy that converts.
            </p>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-[1fr_340px] gap-12 items-start">

          {/* LEFT — Timeline */}
          <div>
            {EXPERIENCE.map((exp, i) => (
              <ExperienceCard
                key={exp.company}
                exp={exp}
                isDark={isDark}
                delay={i * 150}
                index={i}
              />
            ))}
          </div>

          {/* RIGHT — Summary panel */}
          <div ref={rightRef}>
            <SummaryPanel isDark={isDark} inView={rightInView} />
          </div>

        </div>
      </div>

    </section>
  );
}