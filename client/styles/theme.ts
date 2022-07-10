


import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#191919',
      light: '#292929',
      dark: '#0D0D0D',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: 'FFDD26',
      light: '#FFDD26',
      dark: '#FFDD26',
      contrastText: '#00000066',
    },
  },
  typography(palette) {
    return {
      fontFamily: 'Inter, sans-serif',
      fontSize: 14,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
      largHeading: {
        fontSize: '2.5rem',
        fontWeight: 400,
        color: palette.text.primary,
      },
      h1: {
        fontSize: '2.25rem',
        fontWeight: 400,
        color: palette.text.primary,
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 500,
        color: palette.text.primary,
      },
      h3: {
        fontSize: '1.875rem',
        fontWeight: 500,
        color: palette.text.primary,
      },
      h4: {
        fontSize: '1.75rem',
        fontWeight: 500,
        color: palette.text.primary,
      },
      h5: {
        fontSize: '1.625rem',
        fontWeight: 500,
        color: palette.text.primary,
      },
      h6: {
        fontSize: '1.5rem',
        fontWeight: 500,
        color: palette.text.primary,
      }
    };
  },
  breakpoints: {
   values: {
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1700,  
   }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*, *::before, *::after": {
          boxSizing: "border-box",
        },
        html: {
          fontSize: "62.5%",
          '@media (min-width: 600px)': {
            fontSize: "75%",
          },
          '@media (min-width: 900px)': {
            fontSize: "100%",
          },
          '@media (min-width: 1700px)': {
            fontSize: "115%",
          }
        },
      },
    },
  }
})

export default theme