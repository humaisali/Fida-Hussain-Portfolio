import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

// ── SVG Icons ──
const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const UpworkIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.546-1.405 0-2.543-1.14-2.545-2.546V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"/>
  </svg>
);

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const ArrowUpIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="19" x2="12" y2="5"/>
    <polyline points="5 12 12 5 19 12"/>
  </svg>
);

const HeartIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

// ── Nav sections for footer links ──
const FOOTER_LINKS = [
  { label: "Hero",         href: "#hero" },
  { label: "About",        href: "#about" },
  { label: "Skills",       href: "#skills" },
  { label: "Projects",     href: "#projects" },
  { label: "Experience",   href: "#experience" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact",      href: "#contact" },
];

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://linkedin.com/in/fidacopywriter", icon: <LinkedInIcon /> },
  { label: "Upwork",   href: "https://upwork.com/in/fidacopywriter",   icon: <UpworkIcon /> },
  { label: "Email",    href: "mailto:fida@thecopynest.com",             icon: <MailIcon /> },
];

const SERVICES = [
  "Website Copywriting",
  "Landing Page Copy",
  "Email Marketing",
  "SEO Blog Writing",
  "Brand Storytelling",
  "Ad Copywriting",
];

// ════════════════════════════════════════
//  FOOTER COMPONENT
// ════════════════════════════════════════
export default function Footer() {
  const { isDark } = useTheme();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const year = new Date().getFullYear();

  // Show scroll-to-top after scrolling down
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className={`relative overflow-hidden
        ${isDark ? "bg-black" : "bg-zinc-900"}`}
    >
      {/* ── Top glow divider ── */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
          boxShadow: "0 0 20px rgba(80,200,120,0.6)",
        }}
      />
      
      {/* Radial glow center */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(80,200,120,0.06) 0%, transparent 70%)" }}
      />

      {/* ── Main footer content ── */}
      <div className="relative z-10 px-6 pt-16 pb-8 mx-auto max-w-7xl">

        {/* Top grid — 4 columns */}
        <div className="grid gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* Col 1 — Brand */}
          <div className="flex flex-col gap-5 lg:col-span-1">
            {/* Logo */}
            <div>
              <span
                className="font-mono text-2xl font-bold tracking-tight"
                style={{ color: "var(--accent)", textShadow: "0 0 14px rgba(80,200,120,0.5)" }}
              >
                FH
                <span className="text-white">.copy</span>
              </span>
              <p className="mt-1 font-mono text-xs tracking-wide text-gray-500">
                Professional Copywriter
              </p>
            </div>

            <p className="max-w-xs text-sm leading-relaxed text-gray-400">
              Crafting words that drive results. Helping brands connect with their audience through strategic, conversion-focused copy.
            </p>

            {/* Available badge */}
            <div className="flex items-center gap-2">
              <span
                className="flex-shrink-0 w-2 h-2 rounded-full animate-pulse"
                style={{ background: "var(--accent)", boxShadow: "0 0 8px rgba(80,200,120,0.9)" }}
              />
              <span className="font-mono text-xs text-gray-500">
                Available for new projects
              </span>
            </div>

            {/* Social icons */}
            <div className="flex gap-2">
              {SOCIAL_LINKS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300
                    border border-[rgba(80,200,120,0.2)] text-gray-500 hover:text-[color:var(--accent)]
                    hover:border-[rgba(80,200,120,0.5)] bg-white/5 hover:bg-[rgba(80,200,120,0.08)]"
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 16px rgba(80,200,120,0.3)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Quick Nav */}
          <div className="flex flex-col gap-4">
            <h4
              className="text-xs font-mono uppercase tracking-[0.2em] mb-1"
              style={{ color: "var(--accent)" }}
            >
              Navigation
            </h4>
            <nav className="flex flex-col gap-2.5">
              {FOOTER_LINKS.map(({ label, href }) => (
                <button
                  key={label}
                  onClick={() => scrollTo(href)}
                  className="flex items-center gap-2 font-mono text-sm text-left text-gray-400 transition-all duration-300 hover:text-white group w-fit"
                >
                  <span
                    className="flex-shrink-0 w-0 h-px transition-all duration-300 group-hover:w-4"
                    style={{ background: "var(--accent)", boxShadow: "0 0 6px rgba(80,200,120,0.7)" }}
                  />
                  {label}
                </button>
              ))}
            </nav>
          </div>

          {/* Col 3 — Services */}
          <div className="flex flex-col gap-4">
            <h4
              className="text-xs font-mono uppercase tracking-[0.2em] mb-1"
              style={{ color: "var(--accent)" }}
            >
              Services
            </h4>
            <ul className="flex flex-col gap-2.5">
              {SERVICES.map((service) => (
                <li key={service} className="flex items-center gap-2.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: "rgba(80,200,120,0.5)", boxShadow: "0 0 4px rgba(80,200,120,0.6)" }}
                  />
                  <span className="font-mono text-sm text-gray-400">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — CTA card */}
          <div className="flex flex-col gap-4">
            <h4
              className="text-xs font-mono uppercase tracking-[0.2em] mb-1"
              style={{ color: "var(--accent)" }}
            >
              Start a Project
            </h4>

            <div
              className="rounded-xl p-5 flex flex-col gap-4 border border-[rgba(80,200,120,0.2)] bg-white/5"
              style={{ boxShadow: "0 0 20px rgba(80,200,120,0.07)" }}
            >
              <p className="text-sm leading-relaxed text-gray-400">
                Ready to transform your brand's voice? Let's build something that works.
              </p>

              <div className="flex flex-col gap-2">
                <a
                  href="mailto:fida@thecopynest.com"
                  className="text-sm font-semibold text-center btn-accent"
                  style={{ padding: "10px 16px" }}
                >
                  Send an Email
                </a>
                <button
                  onClick={() => scrollTo("#contact")}
                  className="text-sm font-semibold btn-outline"
                  style={{ padding: "10px 16px" }}
                >
                  Fill the Form
                </button>
              </div>

              <div className="flex items-center gap-2 border-t border-[rgba(80,200,120,0.1)] pt-3">
                <span className="text-lg">⏱️</span>
                <span className="font-mono text-xs text-gray-600">
                  Responds within{" "}
                  <span style={{ color: "var(--accent)" }}>24 hours</span>
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* ── Glow divider ── */}
        <div
          className="w-full h-px mb-8"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(80,200,120,0.3), transparent)",
          }}
        />
        {/* ── Bottom bar ── */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">

          {/* Copyright */}
          <p className="font-mono text-xs text-center text-gray-600 sm:text-left">
            © {year}{" "}
            <span className="text-gray-400">Fida Hussain</span>
            {" "}—{" "}
            Professional Copywriter & Content Writer.
            {" "}All rights reserved.
          </p>

          {/* Made with */}
          <p className="text-xs font-mono text-gray-700 flex items-center gap-1.5">
            Crafted with{" "}
            <span style={{ color: "var(--accent)" }}>
              <HeartIcon />
            </span>
            {" "}&{" "}
            <span style={{ color: "var(--accent)" }}>precision</span>
          </p>

        </div>
      </div>

      {/* ── Scroll to top button ── */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed z-50 flex items-center justify-center transition-all duration-300 border rounded-full bottom-8 right-8 w-11 h-11"
        style={{
          opacity: showScrollTop ? 1 : 0,
          transform: showScrollTop ? "translateY(0) scale(1)" : "translateY(16px) scale(0.8)",
          pointerEvents: showScrollTop ? "auto" : "none",
          background: isDark ? "#000" : "#fff",
          borderColor: "rgba(80,200,120,0.4)",
          color: "var(--accent)",
          boxShadow: "0 0 18px rgba(80,200,120,0.3)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 0 28px rgba(80,200,120,0.6)";
          e.currentTarget.style.borderColor = "rgba(80,200,120,0.8)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 0 18px rgba(80,200,120,0.3)";
          e.currentTarget.style.borderColor = "rgba(80,200,120,0.4)";
        }}
        aria-label="Scroll to top"
      >
        <ArrowUpIcon />
      </button>
    </footer>
  );
}