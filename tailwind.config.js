/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"], // ✅ must be "class" (not "media")
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
