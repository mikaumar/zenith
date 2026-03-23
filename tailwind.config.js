/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fef3e2",
          100: "#fde4b9",
          200: "#fbd38d",
          300: "#f6ad55",
          400: "#ed8936",
          500: "#dd6b20",
          600: "#c05621",
          700: "#9c4221",
          800: "#7b341e",
          900: "#652b19",
        },
        surface: {
          50: "#fafaf9",
          100: "#f5f5f4",
          200: "#e7e5e4",
          700: "#44403c",
          800: "#292524",
          900: "#1c1917",
          950: "#0c0a09",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Cal Sans", "Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "flip": "flip 0.6s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "pulse-glow": "pulseGlow 2s infinite",
      },
      keyframes: {
        flip: {
          "0%": { transform: "rotateY(0deg)" },
          "100%": { transform: "rotateY(180deg)" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 5px rgba(237, 137, 54, 0.3)" },
          "50%": { boxShadow: "0 0 20px rgba(237, 137, 54, 0.6)" },
        },
      },
    },
  },
  plugins: [],
}
