import { createTheme } from '@mui/material/styles';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin-ext'],
});

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      *{
        transition: color 0.15s ease, background-color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
      },
      html{
        font-size: 14px;
      },
      .gm-style iframe + div { border:none !important; },
      `,
    },
    MuiLink: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
      defaultProps: {
        underline: 'none',
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 2,
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: 'xl',
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
      },
    },
  },
  typography: {
    fontFamily: `${poppins.style.fontFamily}`,
  },
  palette: {
    // red color
    primary: {
      dark: '#be3831',
      main: '#ec503f',
      light: '#fbcfd3',
      100: '#fdecee',
    },
    // blue color
    secondary: {
      dark: '#132839',
      main: '#334e66',
      light: '#c1d4e6',
      100: '#e3eefd',
    },
    common: {
      white: '#ffffff',
      black: '#000000',
    },
    text: {
      secondary: '#5E7D91',
    },
    grey: {
      50: '#eaf0f5',
      100: '#cdd9e0',
      200: '#afc0ca',
      300: '#607f91',
      400: '#5c5c5c',
      500: '#25343d',
    },
    // pinkish red
    error: {
      main: '#d10d0d',
      light: '#ffcbce',
      100: '#ffeaec',
    },
    // green color
    success: {
      dark: '#388e3c',
      main: '#66bb6a',
      light: '#81c784',
      100: '#e8f5e9',
    },
    // yellow color
    warning: {
      dark: '#f57c00',
      main: '#ff9700',
      light: '#ffe0b2',
      100: '#fff3e0',
    },
  },
});

export default theme;
