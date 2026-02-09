/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        sky: {
          950: "#0b1e2d"
        }
      }
    }
  },
  plugins: [require("@tailwindcss/forms")]
};
