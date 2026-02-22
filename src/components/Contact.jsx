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
const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const UpworkIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.546-1.405 0-2.543-1.14-2.545-2.546V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"/>
  </svg>
);

const SendIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const ExternalIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

// ── Contact Info Card ──
function ContactCard({ icon, label, value, href, isDark, delay = 0 }) {
  const [ref, inView] = useInView(0.1);

  return (
    <a
      ref={ref}
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className={`flex items-center gap-4 p-4 rounded-xl group
        ${isDark ? "bg-zinc-900/60" : "bg-white/80"}
        border border-[rgba(80,200,120,0.2)] hover:border-[rgba(80,200,120,0.55)]
        transition-all duration-300`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : "translateX(-20px)",
        transition: `opacity 0.5s ease-out ${delay}ms, transform 0.5s ease-out ${delay}ms, box-shadow 0.3s, border-color 0.3s`,
        boxShadow: "0 0 14px rgba(80,200,120,0.07)",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 24px rgba(80,200,120,0.22)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 0 14px rgba(80,200,120,0.07)"; }}
    >
      {/* Icon box */}
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0
          ${isDark ? "bg-black" : "bg-zinc-100"}
          border border-[rgba(80,200,120,0.2)] group-hover:border-[rgba(80,200,120,0.5)]
          transition-all duration-300`}
        style={{ color: "var(--accent)" }}
      >
        {icon}
      </div>

      <div className="flex flex-col min-w-0">
        <span className={`text-[11px] font-mono uppercase tracking-widest ${isDark ? "text-gray-600" : "text-zinc-400"}`}>
          {label}
        </span>
        <span className={`text-sm font-medium truncate mt-0.5
          ${isDark ? "text-gray-200 group-hover:text-white" : "text-zinc-700 group-hover:text-zinc-900"}
          transition-colors duration-300`}
        >
          {value}
        </span>
      </div>

      <span
        className={`ml-auto flex-shrink-0 transition-all duration-300
          ${isDark ? "text-gray-700 group-hover:text-[color:var(--accent)]" : "text-zinc-400 group-hover:text-[color:var(--accent)]"}`}
      >
        <ExternalIcon />
      </span>
    </a>
  );
}

// ── Form Input ──
function FormField({ label, id, type = "text", placeholder, value, onChange, isDark, rows, required }) {
  const isTextarea = type === "textarea";
  const baseClass = `w-full px-4 py-3 rounded-xl text-sm font-sans outline-none
    transition-all duration-300 resize-none
    ${isDark
      ? "bg-zinc-900/80 text-white placeholder-gray-600 border border-[rgba(80,200,120,0.2)] focus:border-[rgba(80,200,120,0.6)]"
      : "bg-white text-zinc-900 placeholder-zinc-400 border border-[rgba(80,200,120,0.25)] focus:border-[rgba(80,200,120,0.6)]"
    }`;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className={`text-xs font-mono uppercase tracking-widest ${isDark ? "text-gray-500" : "text-zinc-500"}`}
      >
        {label}{required && <span style={{ color: "var(--accent)" }}> *</span>}
      </label>
      {isTextarea ? (
        <textarea
          id={id}
          rows={rows || 5}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={baseClass}
          style={{ boxShadow: "0 0 0 0 transparent" }}
          onFocus={(e) => { e.target.style.boxShadow = "0 0 16px rgba(80,200,120,0.15)"; }}
          onBlur={(e) => { e.target.style.boxShadow = "0 0 0 0 transparent"; }}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={baseClass}
          onFocus={(e) => { e.target.style.boxShadow = "0 0 16px rgba(80,200,120,0.15)"; }}
          onBlur={(e) => { e.target.style.boxShadow = "0 0 0 0 transparent"; }}
        />
      )}
    </div>
  );
}

// ════════════════════════════════════════
//  CONTACT COMPONENT
// ════════════════════════════════════════
export default function Contact() {
  const { isDark } = useTheme();
  const [headerRef, headerInView] = useInView(0.2);
  const [formRef, formInView] = useInView(0.1);

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate submission — wire to EmailJS / Formspree / backend as needed
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const CONTACT_LINKS = [
    { icon: <PhoneIcon />,    label: "Phone",    value: "+92 345 8220081",          href: "tel:+923458220081" },
    { icon: <MailIcon />,     label: "Email",    value: "fida@thecopynest.com",      href: "mailto:fida@thecopynest.com" },
    { icon: <UpworkIcon />,   label: "Upwork",   value: "upwork.com/in/fidacopywriter", href: "https://upwork.com/in/fidacopywriter" },
    { icon: <LinkedInIcon />, label: "LinkedIn", value: "linkedin.com/in/fidacopywriter", href: "https://linkedin.com/in/fidacopywriter" },
  ];

  return (
    <section
      id="contact"
      className={`relative min-h-screen flex flex-col justify-center overflow-hidden
        ${isDark ? "bg-black" : "bg-zinc-50"}`}
    >
      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(80,200,120,0.04) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 w-full px-6 py-24 mx-auto max-w-7xl">
        {/* Two-column layout */}
        <div className="grid lg:grid-cols-[1fr_420px] gap-12 items-start">

          {/* LEFT — Section Header + Contact form */}
          <div className="flex flex-col gap-8">
            {/* Section Header */}
            <div ref={headerRef}>
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
                <span className="text-xs section-label">Contact</span>
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
                  Let's Work{" "}
                  <span
                    className="heading-underline"
                    style={{ color: "var(--accent)", textShadow: "0 0 18px rgba(80,200,120,0.4)" }}
                  >
                    Together.
                  </span>
                </h2>

                <p
                  className={`mt-8 text-base max-w-xl ${isDark ? "text-gray-400" : "text-zinc-600"}`}
                  style={{
                    opacity: headerInView ? 1 : 0,
                    transition: "opacity 0.6s ease-out 0.25s",
                  }}
                >
                  Looking for copy that converts, content that connects, and words that truly represent your brand? Let's talk.
                </p>
              </div>
            </div>

            {/* Contact form */}
            <div
              ref={formRef}
              className={`rounded-2xl p-8
                ${isDark ? "bg-zinc-900/40" : "bg-white/80"}
                border border-[rgba(80,200,120,0.2)]`}
              style={{
                opacity: formInView ? 1 : 0,
                transform: formInView ? "translateY(0)" : "translateY(28px)",
                transition: "opacity 0.6s ease-out 0.1s, transform 0.6s ease-out 0.1s",
                boxShadow: "0 0 30px rgba(80,200,120,0.08)",
              }}
            >

            {submitted ? (
              /* ── Success state ── */
              <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                <div
                  className="flex items-center justify-center w-16 h-16 rounded-full"
                  style={{
                    background: "rgba(80,200,120,0.1)",
                    border: "2px solid rgba(80,200,120,0.5)",
                    color: "var(--accent)",
                    boxShadow: "0 0 24px rgba(80,200,120,0.3)",
                  }}
                >
                  <CheckCircleIcon />
                </div>
                <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-zinc-900"}`}>
                  Message Sent!
                </h3>
                <p className={`text-sm max-w-xs ${isDark ? "text-gray-400" : "text-zinc-600"}`}>
                  Thanks for reaching out. Fida will get back to you within 24 hours.
                </p>
                <button
                  className="mt-2 text-sm btn-outline"
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              /* ── Form ── */
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    id="name" label="Your Name" placeholder="John Doe"
                    value={form.name} onChange={handleChange("name")}
                    isDark={isDark} required
                  />
                  <FormField
                    id="email" label="Email Address" type="email" placeholder="you@example.com"
                    value={form.email} onChange={handleChange("email")}
                    isDark={isDark} required
                  />
                </div>
                <FormField
                  id="subject" label="Subject" placeholder="Project inquiry / Collaboration"
                  value={form.subject} onChange={handleChange("subject")}
                  isDark={isDark} required
                />
                <FormField
                  id="message" label="Message" type="textarea" placeholder="Tell me about your project, goals, and timeline..."
                  value={form.message} onChange={handleChange("message")}
                  isDark={isDark} rows={5} required
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-accent flex items-center justify-center gap-2.5 font-semibold mt-1 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <span
                        className="w-4 h-4 border-2 rounded-full border-black/30 border-t-black animate-spin"
                      />
                      Sending…
                    </>
                  ) : (
                    <>
                      <SendIcon />
                      Start a Project
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
          </div>

          {/* RIGHT — Contact info */}
          <div className="flex flex-col gap-4">

            {/* Intro text card */}
            <div
              className={`rounded-2xl p-6 mb-2
                ${isDark ? "bg-zinc-900/40" : "bg-white/80"}
                border border-[rgba(80,200,120,0.2)]`}
              style={{
                opacity: formInView ? 1 : 0,
                transform: formInView ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.6s ease-out 0.2s, transform 0.6s ease-out 0.2s",
                boxShadow: "0 0 20px rgba(80,200,120,0.07)",
              }}
            >
              <p className="mb-3 text-xs section-label">Get in Touch</p>
              <p className={`text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-zinc-600"}`}>
                Whether you have a project ready to go or just an idea brewing — reach out. No lengthy forms, no gatekeeping. Just a direct conversation about how good copy can move your business forward.
              </p>

              {/* Available badge */}
              <div className="flex items-center gap-2.5 mt-4">
                <span
                  className="flex-shrink-0 w-2 h-2 rounded-full animate-pulse"
                  style={{ background: "var(--accent)", boxShadow: "0 0 8px rgba(80,200,120,0.9)" }}
                />
                <span
                  className="font-mono text-xs"
                  style={{ color: "var(--accent)" }}
                >
                  Available for new projects
                </span>
              </div>
            </div>

            {/* Contact link cards */}
            {CONTACT_LINKS.map(({ icon, label, value, href }, i) => (
              <ContactCard
                key={label}
                icon={icon} label={label} value={value} href={href}
                isDark={isDark} delay={i * 80 + 200}
              />
            ))}

            {/* Response time note */}
            <div
              className={`rounded-xl px-4 py-3 flex items-center gap-3 mt-1
                ${isDark ? "bg-zinc-900/40" : "bg-white/60"}
                border border-[rgba(80,200,120,0.15)]`}
              style={{
                opacity: formInView ? 1 : 0,
                transition: "opacity 0.6s ease-out 0.7s",
              }}
            >
              <span
                className="flex-shrink-0 text-lg"
                role="img" aria-label="clock"
              >⏱️</span>
              <p className={`text-xs font-mono ${isDark ? "text-gray-500" : "text-zinc-500"}`}>
                Typical response time:{" "}
                <span style={{ color: "var(--accent)" }}>within 24 hours</span>
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}