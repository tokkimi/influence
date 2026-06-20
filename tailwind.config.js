/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-playfair)', 'serif'],
      },
      colors: {
        rose: {
          DEFAULT: '#ff2d55',
          light: '#ff6b81',
          dark: '#d90429',
        },
        apple: {
          bg: '#f5f5f7',
          surface: '#ffffff',
          text: '#1d1d1f',
          secondary: '#6e6e73',
          border: 'rgba(0,0,0,0.08)',
        },
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(160deg, #f5f5f7 0%, #ffffff 100%)',
      },
    },
  },
  plugins: [],
}
