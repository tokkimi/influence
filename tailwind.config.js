/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f5f3ff',
          100: '#ede8ff',
          200: '#d6ceff',
          300: '#b3a3ff',
          400: '#8b72ff',
          500: '#6448f5',
          600: '#4f2de0',
          700: '#3d1fbf',
          800: '#2d149b',
          900: '#1a0a6e',
          950: '#0d0538',
        },
        gold: {
          300: '#f5d98a',
          400: '#efc84a',
          500: '#d4a843',
          600: '#b8882e',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-playfair)', 'serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0d0538 0%, #1a0a6e 40%, #2d149b 100%)',
        'gold-gradient': 'linear-gradient(135deg, #efc84a 0%, #d4a843 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
      },
      boxShadow: {
        'gold': '0 0 40px rgba(212, 168, 67, 0.15)',
        'ink': '0 4px 30px rgba(13, 5, 56, 0.15)',
      },
    },
  },
  plugins: [],
}
