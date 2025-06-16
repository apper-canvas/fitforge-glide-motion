/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary, #9575CD)',
        secondary: 'var(--color-secondary, #B39DDB)', 
        accent: 'var(--color-accent, #7E57C2)',
        surface: {
          50: 'var(--color-surface-50, #FFFFFF)',
          100: 'var(--color-surface-100, #F8F5FF)',
          200: 'var(--color-surface-200, #F3EFFF)',
          300: 'var(--color-surface-300, #E8E2FF)',
          400: 'var(--color-surface-400, #D1C4E9)',
          500: 'var(--color-surface-500, #B39DDB)',
          600: 'var(--color-surface-600, #9575CD)',
          700: 'var(--color-surface-700, #7E57C2)',
          800: 'var(--color-surface-800, #673AB7)',
          900: 'var(--color-surface-900, #512DA8)',
          950: 'var(--color-surface-950, #4527A0)'
        },
        'text-readable': {
          primary: 'var(--color-text-primary, #1A1A1A)',
          secondary: 'var(--color-text-secondary, #2D2D2D)',
          tertiary: 'var(--color-text-tertiary, #404040)'
        },
        card: 'var(--color-card, #FFFFFF)',
        background: 'var(--color-background, #F8F5FF)',
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