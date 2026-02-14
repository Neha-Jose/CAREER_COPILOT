/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-bg": "#1e1e1e",
        "dark-panel": "#252526",
        "dark-border": "#3e3e42",
        "dark-text": "#cccccc",
        "accent-blue": "#007acc",
        "accent-green": "#4ec9b0",
        "accent-purple": "#c586c0",
        "accent-orange": "#ce9178",
      },
    },
  },
  plugins: [],
};
