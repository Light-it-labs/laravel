/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./resources/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
  // Have more structure and conventions here on how to name colors...
  theme: {
  },
};
