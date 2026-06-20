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
      backgroundImage: {
        'hero-gradient': 'linear-gradient(160deg, #080c1a 0%, #0d1a2e 50%, #080c1a 100%)',
        'mesh': 'radial-gradient(ellipse at 20% 50%, #0a2a5a 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, #0a3a4a 0%, transparent 60%), radial-gradient(ellipse at 50% 80%, #1a0a3a 0%, transparent 60%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delay': 'float 6s ease-in-out 3s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
