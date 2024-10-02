import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      backgroundColor: {
        neutral: "#020617", // Previously 'neutral'
        "cloud-blue": "#EFF6FF", // Previously 'cloud-blue'
        "warm-yellow": "#FEF3C7", // Previously 'yellow-100'
        "blush-pink": "#F3E8FF", // Previously 'light-pink'
      },
      textColor: {
        "matte-black": "#0f172a",
        "stone-gray": "#9CA3A1", // Previously 'gray'
        "navy-blue": "#1D4ED8", // Previously 'navy-blue'
        "crimson-red": "#DC2626", // Previously 'red'
        "light-purple": "#d8b4fe",
      },
      fontFamily: {
        'lato': ['Lato'],
        'poppins': ['Poppins'],
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
