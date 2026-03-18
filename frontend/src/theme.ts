import { createTheme, type ThemeOptions } from '@mui/material';

declare module '@mui/material/styles' {
  interface TypeBackground {
    muted: string;
    highlight: string;
  }
  interface Palette {
    background: TypeBackground;
    header: {
      bg: string;
      text: string;
      border: string;
    };
  }
  interface PaletteOptions {
    background?: Partial<TypeBackground>;
    header?: {
      bg: string;
      text: string;
      border: string;
    };
  }
}

// 1. Nordic Slate (Cool & Professional)
const nordicPalette: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: { main: '#3B82F6' }, // Electric Blue
    secondary: { main: '#64748B' }, // Slate Grey
    background: {
      default: '#F8FAFC',
      paper: '#FFFFFF',
      muted: '#F1F5F9',
      highlight: '#F0F9FF',
    },
    text: {
      primary: '#1E293B',
      secondary: '#64748B',
    },
    warning: {
      main: '#F59E0B',
      light: '#FEF3C7',
      contrastText: '#92400E',
    },
    error: {
      main: '#E11D48',
      light: '#FFF1F2',
      contrastText: '#FFFFFF',
    },
    header: {
      bg: '#1E293B',
      text: '#F8FAFC',
      border: '#0F172A',
    },
  },
};

// 2. Desert Sand (Warm & Organic)
const desertPalette: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: { main: '#D97706' }, // Amber
    secondary: { main: '#78716C' }, // Stone
    background: {
      default: '#FDFBF7',
      paper: '#F5F1E9',
      muted: '#EFE9DB',
      highlight: '#FFFDFB',
    },
    text: {
      primary: '#44403C',
      secondary: '#78716C',
    },
    warning: {
      main: '#B45309',
      light: '#FFF7ED',
      contrastText: '#78350F',
    },
    error: {
      main: '#991B1B',
      light: '#FEF2F2',
      contrastText: '#FFFFFF',
    },
    header: {
      bg: '#E7E0D2', // Deeper "Wet Sand" color
      text: '#44403C', // Dark Stone text
      border: 'rgba(0, 0, 0, 0.1)',
    },
  },
};

// 3. Midnight Navy (Soft Dark Mode)
const midnightPalette: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: { main: '#818CF8' }, // Indigo/Lavender
    secondary: { main: '#94A3B8' }, // Cool Grey
    background: {
      default: '#0F172A', // Deep Space Blue
      paper: '#1E293B', // Lighter Navy for cards
      muted: '#0B1120',
      highlight: '#334155',
    },
    text: {
      primary: '#F1F5F9',
      secondary: '#94A3B8',
    },
    warning: {
      main: '#FBBF24',
      light: 'rgba(251, 191, 36, 0.1)',
      contrastText: '#FBBF24', // On dark, text matches the glow
    },
    error: {
      main: '#FB7185',
      light: 'rgba(251, 113, 133, 0.1)',
      contrastText: '#0F172A', // Dark text on light coral for dark mode buttons
    },
    header: {
      bg: '#111827', // Absolute Navy (Darker than Midnight BG)
      text: '#818CF8', // Lavender/Indigo text (Matches Primary)
      border: 'rgba(255, 255, 255, 0.1)',
    },
  },
};

export const theme = createTheme({
  spacing: 4,
  typography: {
    fontFamily: ['Inter', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
  },
});

const createCustomTheme = (options: ThemeOptions) => {
  return createTheme({
    ...options,
    spacing: 4,
    typography: {
      fontFamily: ['Inter', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
    },
  });
};

export const nordicTheme = createCustomTheme(nordicPalette);
export const desertTheme = createCustomTheme(desertPalette);
export const midnightTheme = createCustomTheme(midnightPalette);
