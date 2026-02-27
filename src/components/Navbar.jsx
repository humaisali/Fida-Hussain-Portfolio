import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

// Sun Icon
const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

// Moon Icon
const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

// Hamburger / Close
const MenuIcon = ({ open }) =>
  open ? (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ) : (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Navbar background on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const sectionIds = ["home", "hero", "about", "skills", "projects", "experience", "testimonials", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.35 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? isDark
            ? "bg-black/80 backdrop-blur-md border-b border-emerald-500/10 shadow-[0_2px_20px_rgba(80,200,120,0.08)]"
            : "bg-white/80 backdrop-blur-md border-b border-emerald-500/20 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
        {/* Logo */}
        <a
          href="#hero"
          onClick={() => handleNavClick("#hero")}
          className="font-sans text-lg font-semibold tracking-tight transition-all duration-300"
          style={{ color: "var(--accent)", textShadow: "0 0 12px rgba(80,200,120,0.5)" }}
        >
          FH<span className={isDark ? "text-white" : "text-zinc-900"}>.copy</span>
        </a>

        {/* Desktop Nav */}
        <nav className="items-center hidden gap-7 md:flex">
          {NAV_LINKS.map(({ label, href }) => {
            const sectionId = href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <button
                key={label}
                onClick={() => handleNavClick(href)}
                className={`font-sans text-sm tracking-wide transition-all duration-300 relative ${
                  isActive
                    ? "text-[color:var(--accent)]"
                    : isDark
                    ? "text-gray-400 hover:text-white"
                    : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                {label}
                {isActive && (
                  <span
                    className="absolute left-0 w-full h-px rounded-full -bottom-1"
                    style={{ background: "var(--accent)", boxShadow: "0 0 8px rgba(80,200,120,0.7)" }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          {/* <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-all duration-300 ${
              isDark
                ? "text-gray-400 hover:text-[color:var(--accent)] hover:bg-emerald-500/10"
                : "text-zinc-500 hover:text-[color:var(--accent)] hover:bg-emerald-500/10"
            }`}
            aria-label="Toggle theme"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button> */}

          {/* Hire Me CTA */}
          <a
            href="#contact"
            onClick={() => handleNavClick("#contact")}
            className="hidden text-sm md:block btn-accent"
            style={{ padding: "8px 20px" }}
          >
            Hire Me
          </a>

          {/* Mobile Menu Toggle */}
          <button
            className={`md:hidden p-2 rounded-lg transition-all duration-300 ${
              isDark ? "text-gray-300" : "text-zinc-700"
            }`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } ${isDark ? "bg-black/95 border-t border-emerald-500/10" : "bg-white/95 border-t border-emerald-500/20"}`}
      >
        <nav className="flex flex-col gap-4 px-6 py-4">
          {NAV_LINKS.map(({ label, href }) => (
            <button
              key={label}
              onClick={() => handleNavClick(href)}
              className={`text-left font-sans text-sm tracking-wide transition-colors duration-300 ${
                isDark
                  ? "text-gray-300 hover:text-[color:var(--accent)]"
                  : "text-zinc-600 hover:text-[color:var(--accent)]"
              }`}
            >
              {label}
            </button>
          ))}
          <a
            href="#contact"
            onClick={() => handleNavClick("#contact")}
            className="mt-2 text-sm text-center btn-accent"
          >
            Hire Me
          </a>
        </nav>
      </div>
    </header>
  );
}
