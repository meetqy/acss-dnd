module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: 'media', // or 'class'
  plugins: [require('@tailwindcss/typography'), require("daisyui")],
}
