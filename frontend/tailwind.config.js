/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
      },
      colors: {
        dark: {
          bg: '#09090F',
          surface: '#111118',
          card: '#18181F',
          border: '#27272F',
        },
      },
      boxShadow: {
        'amber-glow': '0 0 30px rgba(245, 158, 11, 0.15)',
        'panel': '0 -8px 40px rgba(0,0,0,0.6)',
      }
    },
  },
  plugins: [],
}
