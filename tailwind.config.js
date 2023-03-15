const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-poppins)", ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        opacity: {
          "0%": { opacity: 0.5 },
          "100%": { opacity: 1 },
        },
        scale: {
          "0%": { transform: "scale(.95)", opacity: 0.5 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
