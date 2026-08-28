/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
        instrument: ['"Instrument Serif"', 'serif'],
      },
      colors: {
        brand: '#5ed29c',
        dark: '#070b0a',
        light: '#f8f6f1',
        surface: '#ffffff',
      },
      animation: {
        'ticker': 'ticker 25s linear infinite',
        'fade-in': 'fadeIn 0.6s ease forwards',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
