/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'sm': '640px',
        'md': '900px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      colors: {
        primary: {
          DEFAULT: 'rgb(113, 145, 170)',
          light: 'rgb(133, 165, 190)',
          dark: 'rgb(93, 125, 150)'
        }
      },
      fontFamily: {
        serif: ['EB Garamond', 'serif'],
        sans: ['Jost', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
