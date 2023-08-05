/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  tailwindConfig: './styles/tailwind.config.js',
  theme: {
    extend: {
      colors: {
        // Define your color palette here
        darkText: '#ffffff', // White text color for dark mode
        lightText: '#333333', // Dark text color for light mode
        // ... other colors
      },
    },
  },
  plugins: [],
}
