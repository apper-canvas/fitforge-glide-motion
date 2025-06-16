/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
theme: {
    extend: {
colors: {
        primary: '#9575CD',
        secondary: '#B39DDB',
        accent: '#7E57C2',
        surface: {
          50: '#FFFFFF',
          100: '#F8F5FF',
          200: '#F3EFFF',
          300: '#E8E2FF',
          400: '#D1C4E9',
          500: '#B39DDB',
          600: '#9575CD',
          700: '#7E57C2',
          800: '#673AB7',
          900: '#512DA8',
          950: '#4527A0'
        },
        'text-readable': {
          primary: '#1A1A1A',
          secondary: '#4D4D4D',
          tertiary: '#424242'
        },
        card: '#FFFFFF',
        background: '#F8F5FF',
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
        info: '#2196F3'
      },
      fontFamily: {
        display: ['Bebas Neue', 'ui-sans-serif', 'system-ui'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      gridTemplateColumns: {
        '8': 'repeat(8, 1fr)',
      }
    },
  },
  plugins: [],
}