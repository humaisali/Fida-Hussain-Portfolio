/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",

  theme: {
    fontFamily: {
      sans: ["Inter", "system-ui", "sans-serif"],
      mono: ["JetBrains Mono", "monospace"],
    },

    extend: {
      colors: {
        emerald: {
          glow: "#50C878",
        },
      },
      boxShadow: {
        "glow-sm": "0 0 10px rgba(80, 200, 120, 0.3)",
        "glow-md": "0 0 20px rgba(80, 200, 120, 0.5)",
        "glow-lg": "0 0 35px rgba(80, 200, 120, 0.7)",
        "glow-xl": "0 0 60px rgba(80, 200, 120, 0.9)",
        "glow-border":
          "0 0 15px rgba(80, 200, 120, 0.4), inset 0 0 15px rgba(80, 200, 120, 0.05)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "pulse-glow": "pulseGlow 2.5s ease-in-out infinite",
        blink: "blink 1s step-end infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": {
            boxShadow: "0 0 10px rgba(80, 200, 120, 0.3)",
          },
          "50%": {
            boxShadow: "0 0 30px rgba(80, 200, 120, 0.7)",
          },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },

  plugins: [],
};
