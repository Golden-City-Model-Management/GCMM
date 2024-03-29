


import { createTheme } from '@mui/material/styles';

const styleOverrides = {
  "*, *::before, *::after": {
    boxSizing: "border-box",
  },
  body: {
    color: '#fff',
    background: '#191919'
  },
  html: { fontSize: "62.5%",
  '@media (min-width: 600px)': {
    fontSize: "75%",
  },
  '@media (min-width: 900px)': {
    fontSize: "100%",
  },
  '@media (min-width: 1700px)': {
    fontSize: "115%",
  },
}
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#191919',
      light: '#292929',
      dark: '#0D0D0D',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FFDD26',
      light: '#FFDD26',
      dark: '#FFDD26',
      contrastText: '#00000066',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#FFDD26',
    },
  },
  adminPalette: {
    main: '#1c2e4a',
    light: '#0201267d',
    dark: '#152238',
    contrastText: '#FFFFFF',
  },
  typography(palette) {
    return {
      fontFamily: 'Inter, sans-serif',
      fontSize: 14,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
      color: palette.text.primary,
      caption: {
        fontSize: '3.5rem',
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
      },
      mainNavLink: {
        fontSize: '2rem',
        fontWeight: 700,
        lineHeight: 1.2,
        textDecoration: 'none',
        '&:hover': {
          color: palette.text.secondary,
          textDecoration: 'none'
        }
      },
      subNavLink: {
        fontSize: '1.3rem',
        fontWeight: 700,
        lineHeight: .8,
        '&:hover': {
          color: palette.text.secondary,
          textDecoration: 'none'
        }
      },
      defaultNavLink: {
        fontSize: '1.25rem',
        // padding: '0',
        '&:hover': {
          color: palette.text.secondary,
          textDecoration: 'none' 
        }
      },
      small: {
       fontSize: '0.65rem',
      }
    };
  },
  breakpoints: {
   values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1700,  
   }
  },
  components: {
    MuiCssBaseline: { styleOverrides, },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1.4rem',
        }
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          textDecorationColor: 'none',
          textTransform: 'capitalize',
          margin: 0,
          padding: 0,
        }
      },
    },
 }
})

export default theme