/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      Kanit: ['"Kanit"', "sans-serif"],
    },
    extend: {
      colors: {
        primaryBg: "#D22B2B",
        primaryText: "#F8F7F4",
        whiteBg: "#F8F7F4",
        blackColor: "	#36454F",
      },
    },
  },
  plugins: [],
};
