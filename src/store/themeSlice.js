import { createSlice } from '@reduxjs/toolkit';

const themes = {
  'lavender-lift': {
    id: 'lavender-lift',
    name: 'Lavender Lift',
    description: 'Elegant purple tones for sophisticated workouts',
    colors: {
      primary: '#9575CD',
      secondary: '#B39DDB',
      accent: '#7E57C2',
      background: '#F8F5FF',
      card: '#FFFFFF',
      text: {
        primary: '#1A1A1A',
        secondary: '#2D2D2D',
        tertiary: '#404040'
      },
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
      }
    }
  },
  'hiit-it-hard': {
    id: 'hiit-it-hard',
    name: 'HIIT It Hard',
    description: 'Fiery reds and oranges for high-intensity training',
    colors: {
      primary: '#F44336',
      secondary: '#FF7043',
      accent: '#D32F2F',
      background: '#FFF8F5',
      card: '#FFFFFF',
      text: {
        primary: '#1A1A1A',
        secondary: '#2D2D2D',
        tertiary: '#404040'
      },
      surface: {
        50: '#FFFFFF',
        100: '#FFF8F5',
        200: '#FFEBE3',
        300: '#FFD0B3',
        400: '#FFAB91',
        500: '#FF7043',
        600: '#F44336',
        700: '#D32F2F',
        800: '#C62828',
        900: '#B71C1C',
        950: '#8E0000'
      }
    }
  },
  'zen-mode': {
    id: 'zen-mode',
    name: 'Zen Mode',
    description: 'Calming greens and teals for mindful movement',
    colors: {
      primary: '#4CAF50',
      secondary: '#26A69A',
      accent: '#388E3C',
      background: '#F3FDF4',
      card: '#FFFFFF',
      text: {
        primary: '#1A1A1A',
        secondary: '#2D2D2D',
        tertiary: '#404040'
      },
      surface: {
        50: '#FFFFFF',
        100: '#F3FDF4',
        200: '#E8F8E9',
        300: '#C8E6C9',
        400: '#A5D6A7',
        500: '#26A69A',
        600: '#4CAF50',
        700: '#388E3C',
        800: '#2E7D32',
        900: '#1B5E20',
        950: '#0D4F14'
      }
    }
  },
  'iron-steel': {
    id: 'iron-steel',
    name: 'Iron & Steel',
    description: 'Cool blues and steel tones for strength training',
    colors: {
      primary: '#2196F3',
      secondary: '#03A9F4',
      accent: '#1976D2',
      background: '#F5F8FF',
      card: '#FFFFFF',
      text: {
        primary: '#1A1A1A',
        secondary: '#2D2D2D',
        tertiary: '#404040'
      },
      surface: {
        50: '#FFFFFF',
        100: '#F5F8FF',
        200: '#E3F2FD',
        300: '#BBDEFB',
        400: '#90CAF9',
        500: '#03A9F4',
        600: '#2196F3',
        700: '#1976D2',
        800: '#1565C0',
        900: '#0D47A1',
        950: '#01579B'
      }
    }
  },
  'tropic-pump': {
    id: 'tropic-pump',
    name: 'Tropic Pump',
    description: 'Vibrant cyans and turquoise for tropical energy',
    colors: {
      primary: '#00BCD4',
      secondary: '#4DD0E1',
      accent: '#0097A7',
      background: '#F0FDFF',
      card: '#FFFFFF',
      text: {
        primary: '#1A1A1A',
        secondary: '#2D2D2D',
        tertiary: '#404040'
      },
      surface: {
        50: '#FFFFFF',
        100: '#F0FDFF',
        200: '#E0F7FA',
        300: '#B2EBF2',
        400: '#80DEEA',
        500: '#4DD0E1',
        600: '#00BCD4',
        700: '#0097A7',
        800: '#00838F',
        900: '#006064',
        950: '#004D5C'
      }
    }
  },
  'sunrise-burn': {
    id: 'sunrise-burn',
    name: 'Sunrise Burn',
    description: 'Warm oranges and yellows for morning motivation',
    colors: {
      primary: '#FF9800',
      secondary: '#FFC107',
      accent: '#F57C00',
      background: '#FFFBF0',
      card: '#FFFFFF',
      text: {
        primary: '#1A1A1A',
        secondary: '#2D2D2D',
        tertiary: '#404040'
      },
      surface: {
        50: '#FFFFFF',
        100: '#FFFBF0',
        200: '#FFF8E1',
        300: '#FFECB3',
        400: '#FFE082',
        500: '#FFC107',
        600: '#FF9800',
        700: '#F57C00',
        800: '#EF6C00',
        900: '#E65100',
        950: '#BF360C'
      }
    }
  }
};

// Load theme from localStorage or default to lavender-lift
const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('fitforge-theme');
    return saved && themes[saved] ? saved : 'lavender-lift';
  }
  return 'lavender-lift';
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    currentTheme: getInitialTheme(),
    themes,
  },
  reducers: {
    setTheme: (state, action) => {
      const themeId = action.payload;
      if (themes[themeId]) {
        state.currentTheme = themeId;
        // Apply theme to CSS custom properties
        if (typeof window !== 'undefined') {
          const theme = themes[themeId];
          const root = document.documentElement;
          
          // Set CSS custom properties
          root.style.setProperty('--color-primary', theme.colors.primary);
          root.style.setProperty('--color-secondary', theme.colors.secondary);
          root.style.setProperty('--color-accent', theme.colors.accent);
          root.style.setProperty('--color-background', theme.colors.background);
          root.style.setProperty('--color-card', theme.colors.card);
          root.style.setProperty('--color-text-primary', theme.colors.text.primary);
          root.style.setProperty('--color-text-secondary', theme.colors.text.secondary);
          root.style.setProperty('--color-text-tertiary', theme.colors.text.tertiary);
          
          // Set surface colors
          Object.entries(theme.colors.surface).forEach(([key, value]) => {
            root.style.setProperty(`--color-surface-${key}`, value);
          });
          
          // Save to localStorage
          localStorage.setItem('fitforge-theme', themeId);
        }
      }
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;