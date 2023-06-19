/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/src/assets/introbg.jpg')",
        'footer-bg': "url('/src/assets/hcue_random_bg.jpg')"
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
