/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "ghost-pink": "#FFC0CB",
        "ghost-aqua": "#00FFFF",
        "ghost-orange": "#FFA500",
        blue: "#0000FF",
      },
      borderColor: {
        "border-ghost-pink": "#FFC0CB",
        "border-ghost-aqua": "#00FFFF",
        "border-ghost-orange": "#FFA500",
        "border-blue": "#0000FF",
      },
    },
  },
  plugins: [],
};
