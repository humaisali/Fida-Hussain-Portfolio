import { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";

// ── Intersection Observer hook ──
function useInView(threshold = 0.2) {
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

// ── Info Pill ──
function InfoPill({ label, value, isDark, delay = 0 }) {
  const [ref, inView] = useInView(0.1);
  return (
    <div
      ref={ref}
      className={`rounded-md px-4 py-2.5
        ${isDark ? "bg-zinc-900/40" : "bg-white/60"}
        border border-[rgba(80,200,120,0.22)]`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(10px)",
        transition: `opacity 0.4s ease-out ${delay}ms, transform 0.4s ease-out ${delay}ms`,
      }}
    >
      <div className="flex flex-col">
        <span
          className={`text-[11px] font-medium leading-none ${
            isDark ? "text-gray-400" : "text-zinc-500"
          }`}
        >
          {label}
        </span>
        <span
          className={`mt-0.5 text-sm font-semibold leading-snug ${
            isDark ? "text-gray-200" : "text-zinc-900"
          }`}
        >
          {value}
        </span>
      </div>
    </div>
  );
}

// ── Animated Stat Counter ──
function StatCounter({ target, suffix, label, isDark, delay = 0 }) {
  const [ref, inView] = useInView(0.1);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1400;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = target / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, stepTime);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center justify-center p-5 rounded-2xl cursor-default
        ${isDark ? "bg-zinc-900/60" : "bg-white/70"}
        border border-[rgba(80,200,120,0.2)] hover:border-[rgba(80,200,120,0.45)]
        transition-all duration-300`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.7s ease-out ${delay}ms, transform 0.7s ease-out ${delay}ms, box-shadow 0.3s`,
        boxShadow: "0 0 18px rgba(80,200,120,0.07)",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 28px rgba(80,200,120,0.22)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 0 18px rgba(80,200,120,0.07)"; }}
    >
      <span
        className="font-mono text-3xl font-bold"
        style={{ color: "var(--accent)", textShadow: "0 0 14px rgba(80,200,120,0.5)" }}
      >
        {count}{suffix}
      </span>
      <span className={`text-xs font-mono mt-1 tracking-wide uppercase text-center ${isDark ? "text-gray-500" : "text-zinc-500"}`}>
        {label}
      </span>
    </div>
  );
}

// ── Bio Paragraph ──
function BioParagraph({ text, isDark, delay = 0 }) {
  const [ref, inView] = useInView(0.1);
  return (
    <p
      ref={ref}
      className={`text-base leading-[1.85] ${isDark ? "text-gray-400" : "text-zinc-600"}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
      }}
    >
      {text}
    </p>
  );
}

// ════════════════════════════════════════
//  ABOUT COMPONENT
// ════════════════════════════════════════
export default function About() {
  const { isDark } = useTheme();
  const [sectionRef, sectionInView] = useInView(0.1);
  const [rightRef, rightInView] = useInView(0.15);

  return (
    <section
      id="about"
      className={`relative min-h-screen flex items-center overflow-hidden
        ${isDark ? "bg-black" : "bg-zinc-50"}`}
    >
      {/* Radial glow */}
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(80,200,120,0.05) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 w-full px-6 py-16 mx-auto max-w-7xl">
        <div className="grid items-start gap-14 lg:grid-cols-2 xl:gap-10">

          {/* ════ LEFT — Bio ════ */}
          <div ref={sectionRef} className="flex flex-col gap-5">

            {/* Label */}
            <div
              className="flex items-center gap-3"
              style={{
                opacity: sectionInView ? 1 : 0,
                transform: sectionInView ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
              }}
            >
              <span
                className="block w-10 h-px"
                style={{ background: "var(--accent)", boxShadow: "0 0 8px rgba(80,200,120,0.7)" }}
              />
              <span className="text-xs section-label">About Me</span>
            </div>

            {/* Heading */}
            <div
              style={{
                opacity: sectionInView ? 1 : 0,
                transform: sectionInView ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.6s ease-out 0.1s, transform 0.6s ease-out 0.1s",
              }}
            >
              <h2 className={`text-4xl lg:text-5xl font-bold leading-tight tracking-tight ${isDark ? "text-white" : "text-zinc-900"}`}>
                The Writer{" "}
                <span
                  className="heading-underline"
                  style={{ color: "var(--accent)", textShadow: "0 0 18px rgba(80,200,120,0.4)" }}
                >
                  Behind
                </span>
                <br />the Words.
              </h2>
            </div>

            {/* Bio */}
            <div className="flex flex-col gap-4">
              <BioParagraph isDark={isDark} delay={150}
                text="I'm Fida Hussain, a passionate Copywriter and Content Writer with a strong focus on crafting content that doesn't just sound good but works."
              />
              <BioParagraph isDark={isDark} delay={250}
                text="I help businesses, startups, and personal brands communicate clearly, build trust, and increase conversions through strategic copywriting. Whether it's a website, landing page, email campaign, or long-form content, my goal is simple: deliver the right message to the right audience at the right time."
              />
              <BioParagraph
                isDark={isDark}
                delay={350}
                text="My process blends audience psychology, brand voice, and clarity first writing so your message feels human, credible, and conversion ready."
              />
            </div>

            {/* CTAs */}
            <div
              className="flex gap-4 pt-2"
              style={{
                opacity: sectionInView ? 1 : 0,
                transform: sectionInView ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.6s ease-out 0.7s, transform 0.6s ease-out 0.7s",
              }}
            >
              <button
                className="text-sm font-semibold btn-accent"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Let's Collaborate
              </button>
              <button
                className="text-sm font-semibold btn-outline"
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              >
                See My Work
              </button>
            </div>
          </div>

          {/* ════ RIGHT — Highlights + Stats ════ */}
          <div ref={rightRef} className="flex flex-col gap-6 lg:items-stretch">
            
            {/* Credibility bullets (mirrors Hero's “why work with me” vibe) */}
            <div
              className={`rounded-2xl p-5 border border-[rgba(80,200,120,0.22)]
                ${isDark ? "bg-zinc-900/40" : "bg-white/60"}`}
              style={{
                opacity: sectionInView ? 1 : 0,
                transform: sectionInView ? "translateY(0)" : "translateY(18px)",
                transition: "opacity 0.6s ease-out 0.45s, transform 0.6s ease-out 0.45s",
                boxShadow: "0 0 18px rgba(80,200,120,0.06)",
              }}
            >
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { title: "Conversion-first", desc: "Copy built to drive action, not just attention." },
                  { title: "Brand voice", desc: "Clear tone guidelines so your messaging stays consistent." },
                  { title: "Research-driven", desc: "Competitor + audience insights before I write." },
                  { title: "Fast iteration", desc: "Tight feedback loops with clean revisions." },
                ].map((item) => (
                  <div key={item.title} className="flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                      <span
                        className="block w-2 h-2 rounded-full shrink-0"
                        style={{
                          background: "var(--accent)",
                          boxShadow: "0 0 10px rgba(80,200,120,0.7)",
                        }}
                      />
                      <span className={`text-sm font-semibold ${isDark ? "text-gray-200" : "text-zinc-900"}`}>
                        {item.title}
                      </span>
                    </div>
                    <span
                      className={`pl-5 text-sm leading-relaxed ${
                        isDark ? "text-gray-400" : "text-zinc-600"
                      }`}
                    >
                      {item.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Info pills */}
            <div className="grid grid-cols-2 gap-3">
              <InfoPill label="Location" value="Mardan, Pakistan" isDark={isDark} delay={120} />
              <InfoPill label="Experience" value="3 Years" isDark={isDark} delay={180} />
              <InfoPill label="Specialization" value="Conversion Copywriting" isDark={isDark} delay={240} />
              <InfoPill label="Email" value="fida@thecopynest.com" isDark={isDark} delay={300} />
            </div>

            {/* Stats row */}
            <div
              className="grid w-full grid-cols-3 gap-3"
              style={{
                opacity: rightInView ? 1 : 0,
                transform: rightInView ? "translateY(0)" : "translateY(18px)",
                transition: "opacity 0.7s ease-out 0.35s, transform 0.7s ease-out 0.35s",
              }}
            >
              <StatCounter target={3} suffix="+" label="Years Exp." isDark={isDark} delay={400} />
              <StatCounter target={50} suffix="+" label="Projects" isDark={isDark} delay={500} />
              <StatCounter target={100} suffix="%" label="Satisfaction" isDark={isDark} delay={600} />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}