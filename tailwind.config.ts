import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--text-primary, #1c1917)", // For text-primary
          bg: "var(--bg-primary, #fafaf9)", // For bg-primary
        },
        secondary: {
          DEFAULT: "var(--text-secondary, #44403c)", // For text-secondary
          bg: "var(--bg-secondary, #f5f5f4)", // For bg-secondary
        },
        muted: {
          DEFAULT: "var(--text-muted, #78716c)", // For text-muted
          bg: "var(--bg-muted, #e7e5e4)", // For bg-muted
        },
        overlay: {
          DEFAULT: "var(--bg-overlay, #0c0a09)", // For bg-overlay
        },
        border: {
          primary: "var(--border-primary, #d6d3d1)", // For border-primary
          secondary: "var(--border-secondary, #a8a29e)", // For border-secondary
          strong: "var(--border-strong, #57534e)", // For border-strong
          muted: "var(--border-muted, #e7e5e4)", // For border-muted
        },
      },
      fontFamily: {
        mont: ["var(--font-montserrat)"],
        vol: ["var(--font-vollkorn)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
