/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      width: {
        1100: "1100px",
      },
      colors: {
        primary: "#F5F5F5",
        secondary1: "#1266dd",
        secondary2: "#f73859",
        "overlay-30": "rgba(0,0,0,0.3)",
        "overlay-70": "rgba(0,0,0,0.7)",
      },
      maxWidth: {
        600: "600px",
        1100: "1100px",
      },
      minWidth: {
        200: "200px",
        300: "300px",
      },
      cursor: {
        pointer: "pointer",
      },
      flex: {
        3: "3 3 0%",
        2: "2 2 0%",
      },
    },
  },
  plugins: [],
};
