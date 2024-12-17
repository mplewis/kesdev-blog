/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      serif: ["Optima LT Std", "serif"],
      handwritten: ["Sriracha", "sans-serif"],
    },
    fontWeight: {
      normal: 300,
      bold: 500,
      xbold: 600,
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
