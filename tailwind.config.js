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
        ink: '#0f0f0f',
        muted: '#6b6b6b',
        faint: '#aaaaaa',
        sand: '#fafaf8',
        accent: '#1a1a2e',
        gold: '#c9993a',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(160deg, #fafaf8 0%, #f0ede8 100%)',
      },
      animation: {
        'float': 'float 7s ease-in-out infinite',
        'float2': 'float 7s ease-in-out 3.5s infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
