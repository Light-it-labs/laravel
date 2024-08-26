/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./resources/**/*.blade.php",
    "./resources/js/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
    function ({ addUtilities }) {
      const newUtilities = {
        ".no-spinners": {
          "&::-webkit-inner-spin-button, &::-webkit-outer-spin-button": {
            "-webkit-appearance": "none",
            margin: 0,
          },
          "-moz-appearance": "textfield", // Firefox
          "&::-webkit-clear-button": {
            display: "none", // For type="search"
          },
        },
      };
      addUtilities(newUtilities, ["responsive"]);
    },
  ],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    screens: {
      // These are the default media queries.
      // We're declaring them to make it easier to import and use in react for js checks
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
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
};
