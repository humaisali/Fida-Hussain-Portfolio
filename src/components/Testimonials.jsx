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
const QuoteIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
  </svg>
);

const StarIcon = ({ filled = true }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
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

// ── DATA ──
const TESTIMONIALS = [
  {
    name: "Patrick Choi",
    title: "Client",
    company: "Education Industry",
    project: "High-Converting Instagram Stories",
    text: "Fida delivered exceptional copy that perfectly matched our brand voice. His work significantly improved our conversions. The clarity and persuasiveness of every story was beyond what we expected — truly impressive work.",
    rating: 5,
    initials: "PC",
  },
  {
    name: "Glenn Dobson",
    title: "Client",
    company: "Fitness Industry",
    project: "Instagram Growth Strategy",
    text: "Professional, reliable, and incredibly skilled at storytelling. Highly recommended. Fida understood our audience deeply and crafted content that resonated on every level. Our organic growth speaks for itself.",
    rating: 5,
    initials: "GD",
  },
  {
    name: "Martin Mathew",
    title: "Client",
    company: "Business",
    project: "Email Campaign Copy",
    text: "The quality of content and attention to detail exceeded our expectations. Every email in the sequence felt intentional and purposeful. The open rate improvement alone made it one of our best investments.",
    rating: 5,
    initials: "MM",
  },
];

// ── Star Rating ──
function StarRating({ count = 5 }) {
  return (
    <div className="flex gap-1" style={{ color: "var(--accent)" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} filled={i < count} />
      ))}
    </div>
  );
}

// ── Testimonial Card (large featured) ──
function TestimonialCard({ testimonial, isDark, active }) {
  const { name, title, company, project, text, rating, initials } = testimonial;

  return (
    <div
      className={`rounded-2xl p-8 md:p-10 flex flex-col gap-6 transition-all duration-500
        ${isDark ? "bg-black" : "bg-white"}
        border`}
      style={{
        borderColor: active ? "rgba(80,200,120,0.5)" : "rgba(80,200,120,0.2)",
        boxShadow: active
          ? "0 0 40px rgba(80,200,120,0.18)"
          : "0 0 16px rgba(80,200,120,0.06)",
        opacity: active ? 1 : 0.4,
        transform: active ? "scale(1)" : "scale(0.97)",
      }}
    >
      {/* Top row — quote icon + stars */}
      <div className="flex items-start justify-between">
        <span style={{ color: "rgba(80,200,120,0.25)" }}>
          <QuoteIcon />
        </span>
        <StarRating count={rating} />
      </div>

      {/* Quote text */}
      <p className={`text-lg leading-[1.8] font-light ${isDark ? "text-gray-300" : "text-zinc-700"}`}>
        "{text}"
      </p>

      {/* Divider */}
      <div
        className="w-full h-px"
        style={{ background: "linear-gradient(90deg, rgba(80,200,120,0.35), transparent)" }}
      />

      {/* Author row */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-mono font-bold text-sm
            ${isDark ? "bg-zinc-900" : "bg-zinc-100"}`}
          style={{
            border: "2px solid rgba(80,200,120,0.4)",
            boxShadow: "0 0 14px rgba(80,200,120,0.2)",
            color: "var(--accent)",
          }}
        >
          {initials}
        </div>

        {/* Name + meta */}
        <div className="flex flex-col">
          <span className={`font-semibold text-base ${isDark ? "text-white" : "text-zinc-900"}`}>
            {name}
          </span>
          <span className={`text-xs font-mono ${isDark ? "text-gray-500" : "text-zinc-500"}`}>
            {title} · {company}
          </span>
        </div>

        {/* Project badge */}
        <div className="hidden ml-auto sm:block">
          <span
            className="text-[10px] font-mono px-3 py-1.5 rounded-full"
            style={{
              border: "1px solid rgba(80,200,120,0.3)",
              color: "var(--accent)",
              background: "rgba(80,200,120,0.06)",
            }}
          >
            {project}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Mini thumb card ──
function ThumbCard({ testimonial, isDark, active, onClick, delay }) {
  const [ref, inView] = useInView(0.1);
  const { name, company, initials, rating } = testimonial;

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`w-full text-left rounded-xl p-4 flex items-center gap-3 transition-all duration-300
        ${isDark ? "bg-black" : "bg-white"}
        border`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease-out ${delay}ms, transform 0.5s ease-out ${delay}ms, box-shadow 0.3s, border-color 0.3s`,
        borderColor: active ? "rgba(80,200,120,0.6)" : "rgba(80,200,120,0.18)",
        boxShadow: active ? "0 0 22px rgba(80,200,120,0.2)" : "0 0 10px rgba(80,200,120,0.04)",
      }}
      onMouseEnter={(e) => {
        if (!active) e.currentTarget.style.borderColor = "rgba(80,200,120,0.4)";
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.borderColor = "rgba(80,200,120,0.18)";
      }}
    >
      {/* Avatar */}
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-mono font-bold text-xs
          ${isDark ? "bg-zinc-900" : "bg-zinc-100"}`}
        style={{
          border: `2px solid ${active ? "var(--accent)" : "rgba(80,200,120,0.25)"}`,
          color: "var(--accent)",
        }}
      >
        {initials}
      </div>

      <div className="flex flex-col min-w-0">
        <span className={`text-sm font-semibold truncate ${isDark ? "text-white" : "text-zinc-900"}`}>
          {name}
        </span>
        <span className={`text-[11px] font-mono truncate ${isDark ? "text-gray-600" : "text-zinc-500"}`}>
          {company}
        </span>
      </div>

      {/* Active indicator */}
      {active && (
        <span
          className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background: "var(--accent)", boxShadow: "0 0 8px rgba(80,200,120,0.9)" }}
        />
      )}
    </button>
  );
}

// ════════════════════════════════════════
//  TESTIMONIALS COMPONENT
// ════════════════════════════════════════
export default function Testimonials() {
  const { isDark } = useTheme();
  const [headerRef, headerInView] = useInView(0.2);
  const [active, setActive] = useState(0);

  const prev = () => setActive((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setActive((i) => (i + 1) % TESTIMONIALS.length);

  // Auto-advance
  useEffect(() => {
    const t = setInterval(() => setActive((i) => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="testimonials"
      className={`relative min-h-screen flex flex-col justify-center overflow-hidden
        ${isDark ? "bg-black/70" : "bg-zinc-100/80"}`}
    >
      {/* Radial glow */}
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[450px] h-[450px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(80,200,120,0.05) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 w-full px-6 pt-24 pb-12 mx-auto max-w-7xl">

        {/* Section Header + Trust Badge */}
        <div ref={headerRef} className="flex flex-col gap-8 mb-16 lg:flex-row lg:items-start lg:justify-between">
          {/* Section Header */}
          <div className="flex-1">
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
              <span className="text-xs section-label">Testimonials</span>
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
                What Clients{" "}
                <span
                  className="heading-underline"
                  style={{ color: "var(--accent)", textShadow: "0 0 18px rgba(80,200,120,0.4)" }}
                >
                  Say.
                </span>
              </h2>

              <p
                className={`mt-8 text-base max-w-xl ${isDark ? "text-gray-400" : "text-zinc-600"}`}
                style={{
                  opacity: headerInView ? 1 : 0,
                  transition: "opacity 0.6s ease-out 0.25s",
                }}
              >
                Real feedback from real clients. Every word here was earned through consistent results and genuine commitment to quality.
              </p>
            </div>
          </div>

          {/* Trust badge */}
          {/* <div
            className={`rounded-xl p-4 text-center lg:flex-shrink-0 lg:w-[200px] xl:w-[240px]
              ${isDark ? "bg-black" : "bg-white"}
              border border-[rgba(80,200,120,0.2)]`}
            style={{
              opacity: headerInView ? 1 : 0,
              transform: headerInView ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease-out 0.2s, transform 0.6s ease-out 0.2s",
              boxShadow: "0 0 14px rgba(80,200,120,0.07)",
            }}
          > */}
            {/* Stars row */}
            {/* <div className="flex justify-center gap-1 mb-2" style={{ color: "var(--accent)" }}>
              {Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} />)}
            </div>
            <p
              className="font-mono text-xl font-bold"
              style={{ color: "var(--accent)", textShadow: "0 0 12px rgba(80,200,120,0.4)" }}
            >
              5.0
            </p>
            <p className={`text-xs font-mono mt-1 ${isDark ? "text-gray-600" : "text-zinc-500"}`}>
              Average Client Rating
            </p>
            <div
              className="h-px my-3"
              style={{ background: "linear-gradient(90deg, transparent, rgba(80,200,120,0.3), transparent)" }}
            />
            <p className={`text-xs ${isDark ? "text-gray-500" : "text-zinc-500"}`}>
              100% of clients would recommend Fida for copywriting projects.
            </p> */}
          {/* </div> */}
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-[1fr_280px] gap-10 items-start">

          {/* LEFT — Featured card + controls */}
          <div className="flex flex-col gap-6">

            {/* Featured card */}
            <div
              style={{
                opacity: headerInView ? 1 : 0,
                transform: headerInView ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.6s ease-out 0.2s, transform 0.6s ease-out 0.2s",
              }}
            >
              <TestimonialCard
                testimonial={TESTIMONIALS[active]}
                isDark={isDark}
                active={true}
              />
            </div>

            {/* Navigation controls */}
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
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
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
              <span className={`ml-auto font-mono text-sm ${isDark ? "text-gray-600" : "text-zinc-400"}`}>
                <span style={{ color: "var(--accent)" }}>{String(active + 1).padStart(2, "0")}</span>
                {" / "}
                {String(TESTIMONIALS.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* RIGHT — Thumb list + trust badge */}
          <div className="flex flex-col gap-4">

            {/* Thumb cards */}
            {TESTIMONIALS.map((t, i) => (
              <ThumbCard
                key={t.name}
                testimonial={t}
                isDark={isDark}
                active={active === i}
                onClick={() => setActive(i)}
                delay={i * 100}
              />
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}