/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
theme: {
    extend: {
      colors: {
        primary: '#27AE60',
        secondary: '#F39C12',
        accent: '#27AE60',
        surface: {
          50: '#FFFFFF',
          100: '#F5F5F5',
          200: '#E8E8E8',
          300: '#D1D1D1',
          400: '#B4B4B4',
          500: '#9E9E9E',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#2C3E50',
          950: '#1A252F'
        },
        'text-readable': {
          primary: '#1A1A1A',
          secondary: '#4D4D4D',
          tertiary: '#757575'
        },
        card: '#FFFFFF',
        background: '#F5F5F5',
        success: '#27AE60',
        warning: '#F39C12',
        error: '#E74C3C',
        info: '#3498DB'
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