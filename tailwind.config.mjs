/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      serif: ["Optima", "serif"],
      handwritten: ["Sriracha", "sans-serif"],
      mono: ["Fantasque Sans Mono", "monospace"],
    },
    fontWeight: {
      normal: 400,
      bold: 700,
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
