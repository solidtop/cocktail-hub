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
        'container-color': 'rgba(250, 252, 192, 0.1)', 
        'backdrop-color': '#2C3639',
        'border-color': 'rgba(255, 255, 255, .1)',
        'hover-color': 'rgba(255, 255, 255, .2)',
        'primary-color': '#24c4bc',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        rollDown: {
          '0%': { height: '0' },
          '100%': { height: '384px' },
        }
      },
      animation: {
        'dropdown-reveal': 'rollDown .2s ease-out',
      }
    },
  },
  plugins: [],
}
