/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'cinzel': ['Cinzel', 'serif'],
        'lato': ['Lato', 'sans-serif'],
      },
      colors: {
        primary: '#E30613',
        accent: '#D3A74F',
        background: '#000000',
        surface: '#F6E9D8',
      },
    },
  },
  plugins: [],
};