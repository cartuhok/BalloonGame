/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'LuckiestGuy-Regular': ['LuckiestGuy-Regular', 'sans'],  
        'PressStart2P-Regular': ['PressStart2P-Regular', 'sans']
      }
    },
  },
  plugins: [],
}