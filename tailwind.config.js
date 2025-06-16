/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
theme: {
    extend: {
      colors: {
        primary: '#8B7CF6',
        secondary: '#F472B6',
        accent: '#6EE7B7',
        surface: {
          50: '#faf9fb',
          100: '#f4f2f7',
          200: '#e9e4ef',
          300: '#d4cce0',
          400: '#a89bb5',
          500: '#7c6f85',
          600: '#5d5366',
          700: '#453c4a',
          800: '#2e2832',
          900: '#1a161c'
        },
        card: '#2a2330',
        background: '#1a161c',
        success: '#6EE7B7',
        warning: '#FBBF85',
        error: '#FCA5A5',
        info: '#93C5FD'
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