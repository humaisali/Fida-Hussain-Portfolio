import { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";

// ── Animated typing effect hook ──
function useTypewriter(words, speed = 80, pause = 2000) {
  const [display, setDisplay] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    let timeout;

    if (!deleting && charIndex <= current.length) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIndex));
        setCharIndex((c) => c + 1);
      }, speed);
    } else if (!deleting && charIndex > current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      }, speed / 2);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words, speed, pause]);

  return display;
}

// ── Particle canvas background ──
function ParticleCanvas({ isDark }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Particles
    const COUNT = 55;
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.35,
      dy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.5 + 0.15,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(80,200,120,${p.alpha})`;
        ctx.fill();
      });

      // Draw lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(80,200,120,${0.12 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: isDark ? 0.7 : 0.3 }}
    />
  );
}

// ── Glowing grid lines ──
function GridOverlay({ isDark }) {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ opacity: isDark ? 0.04 : 0.025 }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(80,200,120,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(80,200,120,1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}

// ── Stat badge ──
function StatBadge({ value, label, isDark }) {
  return (
    <div
      className={`flex flex-col items-center px-6 py-4 rounded-xl transition-all duration-300 cursor-default
        ${isDark ? "bg-black/60" : "bg-white/70"} 
        border border-[rgba(80,200,120,0.2)] hover:border-[rgba(80,200,120,0.5)]`}
      style={{
        boxShadow: "0 0 18px rgba(80,200,120,0.08)",
        backdropFilter: "blur(10px)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 0 28px rgba(80,200,120,0.25)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 0 18px rgba(80,200,120,0.08)";
      }}
    >
      <span
        className="font-sans text-2xl font-bold"
        style={{ color: "var(--accent)", textShadow: "0 0 12px rgba(80,200,120,0.5)" }}
      >
        {value}
      </span>
      <span className={`text-xs mt-1 tracking-wide font-sans uppercase ${isDark ? "text-gray-500" : "text-zinc-500"}`}>
        {label}
      </span>
    </div>
  );
}

// ── Social Link Icon ──
function SocialLink({ href, label, icon, isDark }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`p-2.5 rounded-lg transition-all duration-300 border border-[rgba(80,200,120,0.2)]
        ${isDark ? "text-gray-400 hover:text-[color:var(--accent)]" : "text-zinc-500 hover:text-[color:var(--accent)]"}
        hover:border-[rgba(80,200,120,0.5)] hover:bg-[rgba(80,200,120,0.07)]`}
      style={{ transition: "all 0.3s" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 0 16px rgba(80,200,120,0.25)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {icon}
    </a>
  );
}

// ── SVG Icons ──
const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const UpworkIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.546-1.405 0-2.543-1.14-2.545-2.546V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
  </svg>
);

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const ArrowDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <polyline points="19 12 12 19 5 12" />
  </svg>
);

// ── TYPEWRITER WORDS ──
const ROLES = [
  "Conversion Copywriter",
  "Brand Storyteller",
  "Email Strategist",
  "SEO Content Writer",
  "Landing Page Expert",
];

// ════════════════════════════════════════
//  HERO COMPONENT
// ════════════════════════════════════════
export default function Hero() {
  const { isDark } = useTheme();
  const typedRole = useTypewriter(ROLES, 75, 2200);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className={`relative mt-0 min-h-screen flex items-center overflow-hidden
        ${isDark ? "bg-black" : "bg-zinc-50"}`}
    >
      {/* ── Backgrounds ── */}
      <GridOverlay isDark={isDark} />
      <ParticleCanvas isDark={isDark} />

      {/* Radial emerald glow — top left */}
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(80,200,120,0.07) 0%, transparent 70%)",
        }}
      />
      {/* Radial emerald glow — bottom right */}
      <div
        className="absolute -bottom-40 -right-20 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(80,200,120,0.05) 0%, transparent 70%)",
        }}
      />

      {/* ── Main Content ── */}
      <div className="relative z-10 w-full px-6 pt-24 pb-20 mx-auto max-w-7xl md:pt-28 md:pb-24 lg:pt-24 lg:pb-32">
        <div className="grid items-center gap-3 lg:grid-cols-2 lg:gap-4">

          {/* LEFT COLUMN */}
          <div
            className="flex flex-col gap-4"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
            }}
          >
            {/* Section label */}
            <div className="flex items-center gap-3">
              <span
                className="block w-10 h-px"
                style={{
                  background: "var(--accent)",
                  boxShadow: "0 0 8px rgba(80,200,120,0.7)",
                }}
              />
              <span className="text-xs section-label">Copywriter & Content Writer</span>
            </div>

            {/* Main Headline */}
            <div>
              <h1
                className={`text-5xl lg:text-6xl font-bold leading-tight tracking-tight
                  ${isDark ? "text-white" : "text-zinc-900"}`}
              >
                Words That{" "}
                <span
                  className="heading-underline"
                  style={{
                    color: "var(--accent)",
                    textShadow: "0 0 20px rgba(80,200,120,0.4)",
                  }}
                >
                  Convert.
                </span>
                <br />
                Stories That{" "}
                <span className={isDark ? "text-white" : "text-zinc-900"}>Sell.</span>
              </h1>
            </div>

            {/* Typewriter role */}
            <div className="flex items-center h-8 gap-2">
              <span className={`font-sans text-sm ${isDark ? "text-gray-500" : "text-zinc-400"}`}>
                I am a
              </span>
              <span
                className="font-sans text-sm font-medium"
                style={{ color: "var(--accent)" }}
              >
                {typedRole}
              </span>
              <span
                className="w-0.5 h-4 inline-block animate-blink"
                style={{ background: "var(--accent)" }}
              />
            </div>

            {/* Sub-headline */}
            <p
              className={`text-lg leading-relaxed max-w-lg
                ${isDark ? "text-gray-400" : "text-zinc-600"}`}
            >
              I'm{" "}
              <span className={`font-semibold ${isDark ? "text-white" : "text-zinc-900"}`}>
                Fida Hussain
              </span>
              , helping brands turn visitors into customers through persuasive,
              high-impact writing — from website copy to brand storytelling.
            </p>

            {/* Value statement */}
            <p
              className={`text-sm leading-relaxed max-w-md border-l-2 pl-4
                ${isDark ? "text-gray-500" : "text-zinc-500"}`}
              style={{ borderColor: "rgba(80,200,120,0.4)" }}
            >
              From website copy to brand storytelling, I craft words that connect,
              engage, and drive measurable results.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() =>
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
                }
                className="text-sm font-semibold btn-accent"
              >
                View My Work
              </button>
              <button
                onClick={() =>
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                }
                className="text-sm font-semibold btn-outline"
              >
                Hire Me
              </button>
              
              {/* Social Links */}
              <div className="flex items-center gap-3 pt-1">
                <span className={`text-xs font-sans ${isDark ? "text-gray-600" : "text-zinc-400"}`}>
                  Connect
                </span>
                <span
                  className="w-6 h-px"
                  style={{ background: "rgba(80,200,120,0.3)" }}
                />
                <SocialLink
                  href="https://linkedin.com/in/fidacopywriter"
                  label="LinkedIn"
                  icon={<LinkedInIcon />}
                  isDark={isDark}
                />
                <SocialLink
                  href="https://upwork.com/in/fidacopywriter"
                  label="Upwork"
                  icon={<UpworkIcon />}
                  isDark={isDark}
                />
                <SocialLink
                  href="mailto:fida@thecopynest.com"
                  label="Email"
                  icon={<MailIcon />}
                  isDark={isDark}
                />
              </div>
            
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div
            className="flex flex-col items-center gap-10 lg:items-end"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.9s ease-out 0.2s, transform 0.9s ease-out 0.2s",
            }}
          >
            {/* Profile Avatar Card */}
            <div className="relative">
              {/* Outer glow ring */}
              <div
                className="absolute rounded-full pointer-events-none -inset-3 animate-pulse-glow"
                style={{
                  background:
                    "radial-gradient(circle, rgba(80,200,120,0.15) 0%, transparent 70%)",
                }}
              />
              {/* Avatar circle */}
              <div
                className={`relative w-52 h-52 lg:w-64 lg:h-64 rounded-full overflow-hidden
                  ${isDark ? "bg-zinc-900" : "bg-white"}`}
                style={{
                  border: "2px solid rgba(80,200,120,0.4)",
                  boxShadow:
                    "0 0 30px rgba(80,200,120,0.2), inset 0 0 30px rgba(80,200,120,0.03)",
                }}
              >
                {/* Profile Image */}
                <img 
                  src="/images/your-photo.png" 
                  alt="Fida Hussain" 
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    // Fallback to initials if image fails to load
                    e.target.style.display = 'none';
                    const fallback = e.target.parentElement.querySelector('.initials-fallback');
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                
                {/* Initials fallback — shown if image fails to load */}
                <div className="initials-fallback hidden absolute inset-0 items-center justify-center flex-col gap-1">
                  <span
                    className="font-sans text-5xl font-bold lg:text-6xl"
                    style={{
                      color: "var(--accent)",
                      textShadow: "0 0 24px rgba(80,200,120,0.6)",
                    }}
                  >
                    FH
                  </span>
                  <span
                    className={`text-xs font-sans tracking-[0.15em] uppercase
                      ${isDark ? "text-gray-600" : "text-zinc-400"}`}
                  >
                    Copywriter
                  </span>
                </div>

                {/* Decorative corner accent */}
                <div
                  className="absolute w-2 h-2 rounded-full top-3 right-5 z-10"
                  style={{
                    background: "var(--accent)",
                    boxShadow: "0 0 10px rgba(80,200,120,0.9)",
                  }}
                />
              </div>

              {/* Floating badge — Location */}
              <div
              className={`absolute -bottom-3 -left-4 px-3 py-1.5 rounded-lg text-xs font-sans
                  ${isDark ? "bg-zinc-900 text-gray-300" : "bg-white text-zinc-700"}
                  border border-[rgba(80,200,120,0.25)]`}
                style={{
                  boxShadow: "0 0 12px rgba(80,200,120,0.15)",
                  backdropFilter: "blur(8px)",
                }}
              >
                📍 Mardan, Pakistan
              </div>

              {/* Floating badge — Available */}
              <div
                className={`absolute -top-3 -right-4 px-3 py-1.5 rounded-lg text-xs font-sans flex items-center gap-1.5
                  ${isDark ? "bg-zinc-900 text-gray-300" : "bg-white text-zinc-700"}
                  border border-[rgba(80,200,120,0.25)]`}
                style={{
                  boxShadow: "0 0 12px rgba(80,200,120,0.15)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: "var(--accent)", boxShadow: "0 0 6px rgba(80,200,120,0.9)" }}
                />
                Available for Work
              </div>
            </div>

            {/* Stats Row */}
            <div className="flex gap-4">
              <StatBadge value="3+" label="Years Exp." isDark={isDark} />
              <StatBadge value="50+" label="Projects" isDark={isDark} />
              <StatBadge value="100%" label="Satisfaction" isDark={isDark} />
            </div>
          </div>
        </div>

        {/* ── Scroll Indicator ── */}
        <div
          className="absolute flex flex-col items-center gap-2 -translate-x-1/2 cursor-pointer bottom-10 left-1/2"
          onClick={scrollToAbout}
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 1s ease-out 0.8s",
          }}
          >
          <span
            className={`text-xs font-sans tracking-widest uppercase
              ${isDark ? "text-gray-600" : "text-zinc-400"}`}
          >
            Scroll
          </span>
          <div
            className={`transition-colors duration-300 animate-bounce
              ${isDark ? "text-gray-600 hover:text-[color:var(--accent)]" : "text-zinc-400 hover:text-[color:var(--accent)]"}`}
          >
            <ArrowDownIcon />
          </div>
        </div>
      </div>

    </section>
  );
}