import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Vermelho da marca (extraído do logo Premolde)
        flame: {
          50: "#FEF2F1",
          100: "#FCE0DD",
          200: "#F8C3BC",
          300: "#F09A8F",
          400: "#E8675A",
          500: "#E1251B", // cor principal da marca
          600: "#C41A12",
          700: "#A0150F",
          800: "#821712",
          900: "#6C1714",
          950: "#3B0A07",
        },
        // Grafite / preto (texto, secções escuras)
        ink: {
          50: "#F6F6F7",
          100: "#E9E9EB",
          200: "#D1D2D5",
          300: "#ABACB2",
          400: "#7E7F87",
          500: "#5B5C64",
          600: "#46474D",
          700: "#393A3F",
          800: "#26272B",
          900: "#191A1D",
          950: "#0E0F11",
        },
        // Neutros quentes (betão / off-white)
        concrete: {
          50: "#FAFAF9",
          100: "#F3F2F0",
          200: "#E7E5E1",
          300: "#D6D3CD",
          400: "#B4B0A8",
          500: "#928D83",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      maxWidth: {
        container: "80rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(14,15,17,0.04), 0 12px 32px -12px rgba(14,15,17,0.12)",
        cardlg: "0 2px 4px rgba(14,15,17,0.05), 0 28px 60px -20px rgba(14,15,17,0.22)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "float-up": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-8px)" },
        },
        "draw-tip": {
          "0%,100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "float-up": "float-up 2.4s ease-in-out infinite alternate",
        "draw-tip": "draw-tip 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
