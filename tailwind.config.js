/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
theme: {
    extend: {
      colors: {
        primary: '#059669',
        secondary: '#10B981',
        accent: '#84CC16',
        surface: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
          950: '#052E16'
        },
        'text-readable': {
          primary: '#052E16',
          secondary: '#14532D',
          tertiary: '#166534'
        },
        card: '#F0FDF4',
        background: '#F7FEF0',
        success: '#A7F3D0',
        warning: '#FDE047',
        error: '#FCA5A5',
        info: '#7DD3FC'
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