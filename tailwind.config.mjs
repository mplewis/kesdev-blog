/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      serif: ["Optima", "serif"],
      handwritten: ["Sriracha", "sans-serif"],
    },
    fontWeight: {
      normal: 300,
      bold: 500,
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
