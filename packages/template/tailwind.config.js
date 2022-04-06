module.exports = {
  content: ["./lib/**/*.{ts,tsx}", "./index.html"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require("daisyui")],
};
