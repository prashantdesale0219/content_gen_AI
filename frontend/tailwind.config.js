/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6",
        secondary: "#10B981",
        dark: "#1F2937",
        light: "#F9FAFB",
        vidiq: {
          blue: "#2563EB",
          purple: "#7C3AED",
          darkBlue: "#1E40AF",
          lightBlue: "#DBEAFE"
        }
      }
    },
  },
  plugins: [],
}