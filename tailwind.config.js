let labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    ...labelsClasses.map((lbl) => `bg-${lbl}-500`),
    ...labelsClasses.map((lbl) => `bg-${lbl}-200`),
    ...labelsClasses.map((lbl) => `accent-${lbl}-600`),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
