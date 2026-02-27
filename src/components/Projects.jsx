// Project Section

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
const ExternalLinkIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const ResultIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
  </svg>
);

const IndustryIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
  </svg>
);

// ── Project illustration placeholders (SVG visuals per project) ──
const ProjectVisual1 = ({ isDark }) => (
  <svg width="100%" height="100%" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="200" fill={isDark ? "#0a0a0a" : "#f8f8f8"}/>
    {/* Instagram stories mockup */}
    <rect x="140" y="20" width="120" height="160" rx="12" fill={isDark ? "#111" : "#fff"} stroke="rgba(80,200,120,0.3)" strokeWidth="1"/>
    <rect x="152" y="35" width="96" height="130" rx="6" fill={isDark ? "#1a1a1a" : "#f0f0f0"}/>
    {/* Story header */}
    <circle cx="165" cy="48" r="7" fill="rgba(80,200,120,0.5)"/>
    <rect x="178" y="44" width="40" height="4" rx="2" fill="rgba(80,200,120,0.3)"/>
    <rect x="178" y="51" width="28" height="3" rx="1.5" fill="rgba(80,200,120,0.15)"/>
    {/* Story content lines */}
    <rect x="158" y="70" width="84" height="5" rx="2.5" fill="rgba(80,200,120,0.2)"/>
    <rect x="162" y="80" width="76" height="4" rx="2" fill="rgba(80,200,120,0.15)"/>
    <rect x="160" y="90" width="80" height="4" rx="2" fill="rgba(80,200,120,0.1)"/>
    {/* CTA button */}
    <rect x="165" y="140" width="70" height="18" rx="9" fill="rgba(80,200,120,0.6)"/>
    <rect x="178" y="146" width="44" height="5" rx="2.5" fill="rgba(0,0,0,0.5)"/>
    {/* Stat badges */}
    <rect x="30" y="60" width="90" height="36" rx="8" fill={isDark ? "#111" : "#fff"} stroke="rgba(80,200,120,0.25)" strokeWidth="1"/>
    <rect x="40" y="68" width="30" height="5" rx="2.5" fill="rgba(80,200,120,0.6)"/>
    <rect x="40" y="77" width="50" height="3.5" rx="1.75" fill="rgba(80,200,120,0.2)"/>
    <rect x="280" y="80" width="90" height="36" rx="8" fill={isDark ? "#111" : "#fff"} stroke="rgba(80,200,120,0.25)" strokeWidth="1"/>
    <rect x="290" y="88" width="30" height="5" rx="2.5" fill="rgba(80,200,120,0.6)"/>
    <rect x="290" y="97" width="50" height="3.5" rx="1.75" fill="rgba(80,200,120,0.2)"/>
    {/* Glow */}
    <ellipse cx="200" cy="100" rx="60" ry="40" fill="rgba(80,200,120,0.04)"/>
  </svg>
);

const ProjectVisual2 = ({ isDark }) => (
  <svg width="100%" height="100%" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="200" fill={isDark ? "#0a0a0a" : "#f8f8f8"}/>
    {/* Growth chart */}
    <polyline points="40,160 90,140 140,120 190,90 240,60 290,40 340,20" fill="none" stroke="rgba(80,200,120,0.6)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    {/* Area fill */}
    <polygon points="40,160 90,140 140,120 190,90 240,60 290,40 340,20 340,170 40,170" fill="rgba(80,200,120,0.06)"/>
    {/* Grid lines */}
    {[40,80,120,160].map((y,i) => (
      <line key={i} x1="30" y1={y} x2="370" y2={y} stroke="rgba(80,200,120,0.06)" strokeWidth="1"/>
    ))}
    {/* Data points */}
    {[[90,140],[140,120],[190,90],[240,60],[290,40]].map(([x,y],i) => (
      <circle key={i} cx={x} cy={y} r="4" fill="var(--accent, #50c878)" style={{filter:"drop-shadow(0 0 4px rgba(80,200,120,0.8))"}}/>
    ))}
    {/* Stat card */}
    <rect x="260" y="100" width="110" height="55" rx="10" fill={isDark ? "#111" : "#fff"} stroke="rgba(80,200,120,0.3)" strokeWidth="1"/>
    <rect x="272" y="112" width="35" height="8" rx="4" fill="rgba(80,200,120,0.7)"/>
    <rect x="312" y="114" width="42" height="4" rx="2" fill="rgba(80,200,120,0.2)"/>
    <rect x="272" y="126" width="80" height="3.5" rx="1.75" fill="rgba(80,200,120,0.15)"/>
    <rect x="272" y="133" width="60" height="3.5" rx="1.75" fill="rgba(80,200,120,0.1)"/>
    {/* Label */}
    <rect x="30" y="20" width="80" height="28" rx="8" fill={isDark ? "#111" : "#fff"} stroke="rgba(80,200,120,0.2)" strokeWidth="1"/>
    <rect x="40" y="27" width="30" height="5" rx="2.5" fill="rgba(80,200,120,0.5)"/>
    <rect x="40" y="35" width="50" height="3.5" rx="1.75" fill="rgba(80,200,120,0.2)"/>
    <ellipse cx="200" cy="100" rx="80" ry="30" fill="rgba(80,200,120,0.03)"/>
  </svg>
);

const ProjectVisual3 = ({ isDark }) => (
  <svg width="100%" height="100%" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="200" fill={isDark ? "#0a0a0a" : "#f8f8f8"}/>
    {/* Email mockup */}
    <rect x="60" y="20" width="280" height="165" rx="10" fill={isDark ? "#111" : "#fff"} stroke="rgba(80,200,120,0.25)" strokeWidth="1"/>
    {/* Email header */}
    <rect x="60" y="20" width="280" height="38" rx="10" fill={isDark ? "#161616" : "#f4f4f4"}/>
    <rect x="60" y="45" width="280" height="13" fill={isDark ? "#161616" : "#f4f4f4"}/>
    <circle cx="82" cy="39" r="10" fill="rgba(80,200,120,0.3)"/>
    <rect x="100" y="33" width="60" height="5" rx="2.5" fill="rgba(80,200,120,0.4)"/>
    <rect x="100" y="41" width="100" height="3.5" rx="1.75" fill="rgba(80,200,120,0.15)"/>
    {/* Subject line */}
    <rect x="78" y="68" width="180" height="6" rx="3" fill="rgba(80,200,120,0.3)"/>
    {/* Body lines */}
    <rect x="78" y="84" width="244" height="4" rx="2" fill="rgba(80,200,120,0.12)"/>
    <rect x="78" y="93" width="220" height="4" rx="2" fill="rgba(80,200,120,0.1)"/>
    <rect x="78" y="102" width="235" height="4" rx="2" fill="rgba(80,200,120,0.08)"/>
    <rect x="78" y="111" width="200" height="4" rx="2" fill="rgba(80,200,120,0.1)"/>
    {/* CTA */}
    <rect x="130" y="128" width="140" height="26" rx="13" fill="rgba(80,200,120,0.55)"/>
    <rect x="155" y="136" width="90" height="5" rx="2.5" fill="rgba(0,0,0,0.45)"/>
    {/* Open rate badge */}
    <rect x="270" y="150" width="62" height="26" rx="8" fill={isDark ? "#0f0f0f" : "#f0f0f0"} stroke="rgba(80,200,120,0.3)" strokeWidth="1"/>
    <rect x="278" y="156" width="20" height="5" rx="2.5" fill="rgba(80,200,120,0.6)"/>
    <rect x="278" y="164" width="40" height="3.5" rx="1.75" fill="rgba(80,200,120,0.2)"/>
    <ellipse cx="200" cy="100" rx="70" ry="35" fill="rgba(80,200,120,0.03)"/>
  </svg>
);

// ── DATA ──
const PROJECTS = [
  {
    title: "High-Converting Instagram Stories",
    client: "Patrick Choi",
    industry: "Education",
    overview: "Developed complete Instagram Stories focused on clarity, credibility, and conversions — with copy crafted to guide viewers through a structured journey from awareness to action.",
    results: [
      "Increased conversion rate by 70%",
      "Improved user engagement significantly",
    ],
    tags: ["Instagram Copy", "Story Writing"],
    Visual: ProjectVisual1,
  },
  {
    title: "Instagram Growth Strategy",
    client: "Glenn Dobson",
    industry: "Fitness",
    overview: "Created a complete Instagram Growth Strategy to increase organic traffic and build brand authority through consistent, audience-focused content and strategic storytelling.",
    results: [
      "Traffic growth of 85%",
      "Higher keyword rankings achieved",
    ],
    tags: ["Growth Strategy", "Content Writing"],
    Visual: ProjectVisual2,
  },
  {
    title: "Email Campaign Copy",
    client: "Martin Mathew",
    industry: "Business",
    overview: "Wrote persuasive email sequences designed to nurture leads and boost sales — each email carefully structured with a clear hook, body, and CTA to maximize reader action.",
    results: [
      "Open rate increased by 87%",
      "Improved click-through rate",
    ],
    tags: ["Email Marketing", "Lead Nurturing"],
    Visual: ProjectVisual3,
  },
];

// ── Project Card ──
function ProjectCard({ project, isDark, delay = 0 }) {
  const [ref, inView] = useInView(0.1);
  const { title, client, industry, overview, results, tags, Visual } = project;

  return (
    <div
      ref={ref}
      className={`rounded-xl overflow-hidden flex flex-col
        ${isDark ? "bg-black" : "bg-white"}
        border border-[rgba(80,200,120,0.3)]
        transition-all duration-300`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms, box-shadow 0.3s`,
        boxShadow: "0 0 20px rgba(80,200,120,0.1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 0 40px rgba(80,200,120,0.28)";
        e.currentTarget.style.borderColor = "rgba(80,200,120,0.6)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 0 20px rgba(80,200,120,0.1)";
        e.currentTarget.style.borderColor = "rgba(80,200,120,0.3)";
      }}
    >
      {/* Visual area */}
      <div className="relative h-48 overflow-hidden">
        <Visual isDark={isDark} />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.6))" }}
        />
        {/* Industry badge */}
        <div
        className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-sans uppercase tracking-wider flex items-center gap-1.5"
          style={{
            background: isDark ? "rgba(0,0,0,0.75)" : "rgba(255,255,255,0.85)",
            border: "1px solid rgba(80,200,120,0.3)",
            color: "var(--accent)",
            backdropFilter: "blur(6px)",
          }}
        >
          <IndustryIcon />
          {industry}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 gap-4 p-6">

        {/* Client + Title */}
        <div>
          <p className={`text-xs font-sans uppercase tracking-widest mb-1 ${isDark ? "text-gray-600" : "text-zinc-400"}`}>
            Client: <span style={{ color: "var(--accent)" }}>{client}</span>
          </p>
          <h3 className={`text-lg font-semibold leading-snug ${isDark ? "text-white" : "text-zinc-900"}`}>
            {title}
          </h3>
        </div>

        {/* Overview */}
        <p className={`text-sm leading-relaxed flex-1 ${isDark ? "text-gray-400" : "text-zinc-600"}`}>
          {overview}
        </p>

        {/* Results */}
        <div
          className={`rounded-lg p-3 flex flex-col gap-1.5
            ${isDark ? "bg-zinc-900/60" : "bg-zinc-50"}
            border border-[rgba(80,200,120,0.15)]`}
        >
          <p className={`text-[10px] font-sans uppercase tracking-widest mb-0.5 ${isDark ? "text-gray-600" : "text-zinc-400"}`}>
            Results
          </p>
          {results.map((r, i) => (
            <div key={i} className="flex items-center gap-2">
              <span style={{ color: "var(--accent)" }}>
                <ResultIcon />
              </span>
              <span className={`text-xs font-medium ${isDark ? "text-gray-300" : "text-zinc-700"}`}>{r}</span>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="text-[11px] px-3 py-1 rounded-full font-sans"
              style={{
                border: "1px solid rgba(80,200,120,0.35)",
                color: "var(--accent)",
                boxShadow: "0 0 8px rgba(80,200,120,0.15)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action */}
        <div className="pt-1">
          <button
            className="flex items-center justify-center w-full gap-2 text-sm font-semibold btn-outline"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            <ExternalLinkIcon />
            Request Similar Project
          </button>
        </div>

      </div>
    </div>
  );
}

// ════════════════════════════════════════
//  PROJECTS COMPONENT
// ════════════════════════════════════════
export default function Projects() {
  const { isDark } = useTheme();
  const [headerRef, headerInView] = useInView(0.2);

  return (
    <section
      id="projects"
      className={`relative min-h-screen flex flex-col justify-center overflow-hidden
        ${isDark ? "bg-black/70" : "bg-zinc-50"}`}
    >
      {/* Radial glow */}
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[450px] h-[450px] rounded-full pointer-events-none"
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
            <span className="text-xs section-label">Selected Projects</span>
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
              Things I've Written
              <span
                className="absolute left-0 -bottom-3 w-full h-[2px] rounded-full"
                style={{
                  background: "var(--accent)",
                  boxShadow: "0 0 20px rgba(80,200,120,0.8)",
                }}
              />
            </h2>

            <p
              className={`mt-8 text-base max-w-xl ${isDark ? "text-gray-400" : "text-zinc-600"}`}
              style={{
                opacity: headerInView ? 1 : 0,
                transition: "opacity 0.6s ease-out 0.25s",
              }}
            >
              A selection of real client work — each project built around a specific goal, a specific audience, and a measurable outcome.
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              isDark={isDark}
              delay={i * 120}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className="mt-16 text-center"
          style={{
            opacity: headerInView ? 1 : 0,
            transition: "opacity 0.6s ease-out 0.5s",
          }}
        >
          <p className={`text-sm mb-5 font-sans ${isDark ? "text-gray-500" : "text-zinc-500"}`}>
            Have a project in mind?
          </p>
          <button
            className="font-semibold btn-accent"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Let's Work Together
          </button>
        </div>

      </div>

    </section>
  );
}