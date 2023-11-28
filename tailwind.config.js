/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
    hljs: {
      theme: "night-owl", // TODO: Find out why only some of the themes work and how to enable others
    },
  },
  safelist: [
    {
      pattern: /hljs+/,
    },
  ],
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwind-highlightjs"),
  ],
};
