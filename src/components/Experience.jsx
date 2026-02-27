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
const ChevronLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);
const ChevronRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

// ══════════════════════════════════
//  DATA — (Replace dummy entries with real data later)
// ══════════════════════════════════
const EXPERIENCE = [
  {
    role: "Creative Copywriter",
    company: "Gorilla Copywriting",
    duration: "Present",
    type: "Full-Time",
    location: "Remote",
    current: true,
    initials: "GC",
    points: [
      "I work with coaching and course creator brands to turn their expertise into revenue-generating copy that actually converts.",
      "My work has contributed to clients securing deals and partnerships, and consistently helped generate monthly revenue through data-driven content strategies and high-converting sales funnels.",
      "From complete funnel builds to VSLs and landing pages, I focus on research-backed copy that speaks to the right audience at the right time. I collaborate closely with clients, offer unlimited revisions, and take full ownership of results, because when my copy works, everyone wins.",
    ],
  },
  {
    role: "Direct Response Copywriter",
    company: "Upwork",
    duration: "Present",
    type: "Freelance",
    location: "Remote",
    current: true,
    initials: "Up",
    points: [
      "I help brands in competitive niches cut through the noise and connect with their audience on a human level. Currently, I'm the trusted copywriter for a health and wellness brand selling premium infant and child nutrition products.",
      "My approach blends deep research with compelling storytelling, ensuring every piece of content feels authentic, trustworthy, and conversion-ready. Whether it's health, finance, or course creation, I adapt quickly while keeping one thing constant: results that matter.",
    ],
  },
  // ── DUMMY DATA for testing slideshow — replace with real data ──
  {
    role: "Content Strategist",
    company: "KST Marketing",
    duration: "5Months",
    type: "Contract",
    location: "Remote",
    current: false,
    initials: "KST",
    points: [
      "I partnered with a performance-obsessed agency to build content systems that consistently deliver $50K+ in monthly revenue for tutoring coaches.",
      "This wasn't about posting for the sake of posting; it was about engineering social media scripts and content strategies that turn scrollers into buyers.",
      "Every month, I analysed performance data, identified what's working, and refined our approach to stay ahead. ",
      "The Result: Predictable revenue growth powered by content that educates, engages, and converts without feeling salesy.",
    ],
  },
  {
    role: "Conversion Specialist",
    company: "Larkin Landscape Services",
    duration: "1 Month",
    type: "Contract",
    location: "Remote",
    current: false,
    initials: "LLS",
    points: [
      "At Larkin Landscape Services, I transformed the website's effectiveness by addressing critical issues in user engagement.",
      "I identified weak copy as a primary barrier to conversions and rewrote it to create a compelling narrative that resonated with the audience. ",
      "By repositioning, & modifying the call-to-action to feel action-oriented, I significantly enhanced lead generation and overall traffic to the site.",
      "The Result: The overall traffic increased by 50X, potential leads by 15X, & hence the website conversions to 4X.",
    ],
  },
  {
    role: "Sales Funnel Copywriter",
    company: "Bizlaunch.io",
    duration: "6 Months",
    type: "Contract",
    location: "Remote",
    current: false,
    initials: "Biz",
    points: [
      "I crafted end-to-end sales funnels for elite coaches and course creators who refuse to settle for mediocre results. One client leveraged my copy to close a game-changing $100M deal with Uber; proof that the right words don't just sell, they transform businesses.",
      "Working with pro-level clients, including an MMA coach building his empire, I turned their expertise into magnetic copy that attracts dream clients and drives premium conversions. Every funnel I built was designed with one goal: make their offers impossible to ignore.",
    ],
  },
];

// ── Featured Experience Card (large) ──
function ExperienceCard({ exp, isDark, active }) {
  const { role, company, duration, type, location, current, initials, points } = exp;

  return (
    <div
      className={`rounded-2xl overflow-hidden flex flex-col
        ${isDark ? "bg-black" : "bg-white"}
        border transition-all duration-500`}
      style={{
        borderColor: active ? "rgba(80,200,120,0.5)" : "rgba(80,200,120,0.2)",
        boxShadow: active ? "0 0 40px rgba(80,200,120,0.18)" : "0 0 16px rgba(80,200,120,0.06)",
        opacity: active ? 1 : 0.4,
        transform: active ? "scale(1)" : "scale(0.97)",
      }}
    >
      {/* Top accent line — only for current role */}
      {current && (
        <div
          className="h-[2px] w-full"
          style={{
            background: "linear-gradient(90deg, var(--accent), transparent)",
            boxShadow: "0 0 10px rgba(80,200,120,0.5)",
          }}
        />
      )}

      <div className="flex flex-col gap-5 p-8 md:p-10">
        {/* Header row */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0
                font-sans font-bold text-sm
                ${isDark ? "bg-zinc-900" : "bg-zinc-100"}`}
              style={{
                border: `2px solid ${current ? "var(--accent)" : "rgba(80,200,120,0.35)"}`,
                boxShadow: current ? "0 0 14px rgba(80,200,120,0.4)" : "0 0 8px rgba(80,200,120,0.15)",
                color: "var(--accent)",
              }}
            >
              {initials}
            </div>

            <div>
              <h3 className={`text-xl font-bold leading-snug ${isDark ? "text-white" : "text-zinc-900"}`}>
                {role}
              </h3>
              <p className="text-base font-semibold mt-0.5 font-sans" style={{ color: "var(--accent)" }}>
                {company}
              </p>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {current && (
              <span
                className="flex items-center gap-1.5 text-[11px] font-sans px-3 py-1 rounded-full"
                style={{
                  background: "rgba(80,200,120,0.12)",
                  border: "1px solid rgba(80,200,120,0.4)",
                  color: "var(--accent)",
                  boxShadow: "0 0 10px rgba(80,200,120,0.2)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--accent)" }} />
                Current
              </span>
            )}
            <span
              className={`text-[11px] font-sans px-3 py-1 rounded-full
                ${isDark ? "bg-zinc-900 text-gray-400" : "bg-zinc-100 text-zinc-600"}
                border border-[rgba(80,200,120,0.15)]`}
            >
              {type}
            </span>
          </div>
        </div>

        {/* Meta info */}
        <div className="flex flex-wrap gap-4">
          <div className={`flex items-center gap-1.5 text-xs font-sans ${isDark ? "text-gray-500" : "text-zinc-500"}`}>
            <span style={{ color: "var(--accent)" }}><CalendarIcon /></span>
            {duration}
          </div>
          <div className={`flex items-center gap-1.5 text-xs font-sans ${isDark ? "text-gray-500" : "text-zinc-500"}`}>
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
  );
}

// ── Mini Thumb Card (right panel) ──
function ThumbCard({ exp, isDark, active, onClick, delay }) {
  const [ref, inView] = useInView(0.1);
  const { role, company, initials, current, type } = exp;

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`w-full text-left rounded-xl p-4 flex items-center gap-3
        ${isDark ? "bg-black" : "bg-white"}
        border transition-all duration-300`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease-out ${delay}ms, transform 0.5s ease-out ${delay}ms, box-shadow 0.3s, border-color 0.3s`,
        borderColor: active ? "rgba(80,200,120,0.6)" : "rgba(80,200,120,0.18)",
        boxShadow: active ? "0 0 22px rgba(80,200,120,0.2)" : "0 0 10px rgba(80,200,120,0.04)",
      }}
      onMouseEnter={(e) => { if (!active) e.currentTarget.style.borderColor = "rgba(80,200,120,0.4)"; }}
      onMouseLeave={(e) => { if (!active) e.currentTarget.style.borderColor = "rgba(80,200,120,0.18)"; }}
    >
      {/* Avatar */}
      <div
      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
          font-sans font-bold text-xs
          ${isDark ? "bg-zinc-900" : "bg-zinc-100"}`}
        style={{
          border: `2px solid ${active ? "var(--accent)" : "rgba(80,200,120,0.25)"}`,
          color: "var(--accent)",
        }}
      >
        {initials}
      </div>

      <div className="flex flex-col flex-1 min-w-0">
        <span className={`text-sm font-semibold truncate ${isDark ? "text-white" : "text-zinc-900"}`}>
          {role}
        </span>
        <span className={`text-[11px] font-sans truncate ${isDark ? "text-gray-600" : "text-zinc-500"}`}>
          {company} · {type}
        </span>
      </div>

      {/* Active dot OR current badge */}
      {active ? (
        <span
          className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background: "var(--accent)", boxShadow: "0 0 8px rgba(80,200,120,0.9)" }}
        />
      ) : current ? (
        <span
          className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse"
          style={{ background: "rgba(80,200,120,0.5)" }}
        />
      ) : null}
    </button>
  );
}

// ── Right panel — Summary stats ──
function SummaryPanel({ isDark, inView }) {
  const stats = [
    { value: "3+",   label: "Years Exp." },
    { value: "5",    label: "Roles Held" },
    { value: "50+",  label: "Projects" },
    { value: "100%", label: "Satisfaction" },
  ];

  return (
      <div
        className={`rounded-2xl p-5
        ${isDark ? "bg-black" : "bg-white"}
        border border-[rgba(80,200,120,0.25)]`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease-out 0.4s, transform 0.6s ease-out 0.4s",
        boxShadow: "0 0 24px rgba(80,200,120,0.1)",
      }}
      >
      <p className="mb-4 text-xs section-label">Career at a Glance</p>
      <div className="grid grid-cols-2 gap-3">
        {stats.map(({ value, label }) => (
          <div
            key={label}
            className={`flex flex-col items-center justify-center p-3 rounded-xl
              ${isDark ? "bg-zinc-900/60" : "bg-zinc-50"}
              border border-[rgba(80,200,120,0.15)]`}
          >
            <span
              className="font-sans text-xl font-bold"
              style={{ color: "var(--accent)", textShadow: "0 0 12px rgba(80,200,120,0.4)" }}
            >
              {value}
            </span>
            <span className={`text-[10px] font-sans mt-0.5 text-center uppercase tracking-wide ${isDark ? "text-gray-600" : "text-zinc-500"}`}>
              {label}
            </span>
          </div>
        ))}
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
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((i) => (i + 1) % EXPERIENCE.length);
    }, 4500);
  };

  // Auto-advance
  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const prev = () => { setActive((i) => (i - 1 + EXPERIENCE.length) % EXPERIENCE.length); resetTimer(); };
  const next = () => { setActive((i) => (i + 1) % EXPERIENCE.length); resetTimer(); };
  const goTo = (i) => { setActive(i); resetTimer(); };

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

      {/* <div className="absolute top-0 left-0 right-0 glow-divider" /> */}

      <div className="relative z-10 w-full px-6 py-24 mx-auto max-w-7xl">

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

        {/* ── Two-column layout ── */}
        <div className="grid lg:grid-cols-[1fr_280px] gap-10 items-start">

          {/* LEFT — Slideshow card + controls */}
          <div className="flex flex-col gap-6">

            {/* Featured card */}
            <div
              style={{
                opacity: headerInView ? 1 : 0,
                transform: headerInView ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.6s ease-out 0.2s, transform 0.6s ease-out 0.2s",
              }}
            >
              <ExperienceCard
                exp={EXPERIENCE[active]}
                isDark={isDark}
                active={true}
              />
            </div>

            {/* Controls row */}
            <div
              className="flex items-center gap-4"
              style={{
                opacity: headerInView ? 1 : 0,
                transition: "opacity 0.6s ease-out 0.35s",
              }}
            >
              {/* Prev */}
              <button
                onClick={prev}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                  ${isDark ? "bg-zinc-900 text-gray-400" : "bg-white text-zinc-500"}
                  border border-[rgba(80,200,120,0.25)] hover:border-[rgba(80,200,120,0.6)]`}
                style={{ boxShadow: "0 0 10px rgba(80,200,120,0.08)" }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 18px rgba(80,200,120,0.3)"; e.currentTarget.style.color = "var(--accent)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 0 10px rgba(80,200,120,0.08)"; e.currentTarget.style.color = ""; }}
              >
                <ChevronLeftIcon />
              </button>

              {/* Dot indicators */}
              <div className="flex gap-2">
                {EXPERIENCE.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className="transition-all duration-300 rounded-full"
                    style={{
                      width: active === i ? "24px" : "8px",
                      height: "8px",
                      background: active === i ? "var(--accent)" : "rgba(80,200,120,0.25)",
                      boxShadow: active === i ? "0 0 10px rgba(80,200,120,0.7)" : "none",
                    }}
                  />
                ))}
              </div>

              {/* Next */}
              <button
                onClick={next}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                  ${isDark ? "bg-zinc-900 text-gray-400" : "bg-white text-zinc-500"}
                  border border-[rgba(80,200,120,0.25)] hover:border-[rgba(80,200,120,0.6)]`}
                style={{ boxShadow: "0 0 10px rgba(80,200,120,0.08)" }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 18px rgba(80,200,120,0.3)"; e.currentTarget.style.color = "var(--accent)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 0 10px rgba(80,200,120,0.08)"; e.currentTarget.style.color = ""; }}
              >
                <ChevronRightIcon />
              </button>

              {/* Counter */}
              <span className={`ml-auto font-sans text-sm ${isDark ? "text-gray-600" : "text-zinc-400"}`}>
                <span style={{ color: "var(--accent)" }}>{String(active + 1).padStart(2, "0")}</span>
                {" / "}
                {String(EXPERIENCE.length).padStart(2, "0")}
              </span>
            </div>
          </div>

      {/* RIGHT — Thumb list + summary */}
          <div ref={rightRef} className="flex flex-col gap-3">

            {/* Thumb cards */}
            {EXPERIENCE.map((exp, i) => (
              <ThumbCard
                key={exp.company}
                exp={exp}
                isDark={isDark}
                active={active === i}
                onClick={() => goTo(i)}
                delay={i * 80}
              />
            ))}

            {/* Summary stats */}
            {/* <div className="mt-1">
              <SummaryPanel isDark={isDark} inView={rightInView} />
            </div> */}

            {/* Hire Me CTA */}
            {/* <div
              style={{
                opacity: rightInView ? 1 : 0,
                transition: "opacity 0.6s ease-out 0.55s",
              }}
            >
              <button
                className="w-full mt-1 text-sm font-semibold btn-accent"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Hire Me
              </button>
            </div> */}
          </div>
        </div>
      </div>

      {/* <div className="absolute bottom-0 left-0 right-0 glow-divider" /> */}
    </section>
  );
}