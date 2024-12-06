/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#F1EFEA",
        secondary: "#E3E0D8",
        buttonPrimary: "#405EC1",
        buttonSecondary: "#7356E5",
        darkPrimary: "#242424",
        darkSecondary: "#323232",
      },
      fontFamily: {
        lexend: ["Lexend", "sans-serif"],
      },
    },
  },
  plugins: [
  ],
};
