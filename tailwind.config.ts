import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        brand: {
          "washed-purple": "#b5b2ff",
          "washed-blue": "#6889ff",
          "primary-blue": "#0469ff",
          "primary-purple": "#7000ff",
          dark: "#030014",
        },
        "washed-blue": {
          50: "#f0f3ff",
          100: "#d0daff",
          200: "#bac9ff",
          300: "#9ab0ff",
          400: "#86a1ff",
          500: "#6889ff",
          600: "#5f7de8",
          700: "#4a61b5",
          800: "#394b8c",
          900: "#2c3a6b",
        },
        "washed-purple": {
          50: "#f8f7ff",
          100: "#e8e7ff",
          200: "#dddcff",
          300: "#cecbff",
          400: "#c5c1ff",
          500: "#b6b2ff",
          600: "#a6a2e8",
          700: "#817eb5",
          800: "#64628c",
          900: "#4c4b6b",
        },
        "primary-blue": {
          50: "#e6f0ff",
          100: "#b2d1ff",
          200: "#8cbaff",
          300: "#589bff",
          400: "#3787ff",
          500: "#0569ff",
          600: "#0560e8",
          700: "#044bb5",
          800: "#033a8c",
          900: "#022c6b",
        },
        "primary-purple": {
          50: "#f1e6ff",
          100: "#d3b0ff",
          200: "#bd8aff",
          300: "#9f54ff",
          400: "#8d33ff",
          500: "#7000ff",
          600: "#6600e8",
          700: "#5000b5",
          800: "#3e008c",
          900: "#2f006b",
        },
        "Neutrals/neutrals": {
          1: "#ffffff",
          2: "#fcfcfd",
          3: "#f5f5f6",
          4: "#f0f0f1",
          5: "#d9d9dc",
          6: "#c0bfc4",
          7: "#8d8c95",
          8: "#5b5966",
          9: "#464553",
          10: "#282637",
          11: "#201f30",
          12: "#161427",
          13: "#020014",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
  plugins: [animate],
};

export default config;
