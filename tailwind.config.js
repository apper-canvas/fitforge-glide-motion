/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
theme: {
    extend: {
      colors: {
        primary: '#B19CD9',
        secondary: '#7FB3D3',
        accent: '#FFB380',
        surface: {
          50: '#FEFBF8',
          100: '#FDF8F3',
          200: '#F9F0E8',
          300: '#F3E6D7',
          400: '#E8D5C4',
          500: '#D4C2A8',
          600: '#B8A082',
          700: '#9A7F5F',
          800: '#7A5F3F',
          900: '#5C3F2A'
        },
        card: '#FEFBF8',
        background: '#FEF7F0',
        success: '#A7E2CC',
        warning: '#F4D19B',
        error: '#F5B7B1',
        info: '#AED6F1'
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