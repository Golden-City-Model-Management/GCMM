


import { createTheme } from '@mui/material/styles';

const styleOverrides = {
  "*, *::before, *::after": {
    boxSizing: "border-box",
  },
  body: {
    color: '#fff',
    background: '#152238'
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
      main: '#1c2e4a',
      light: '#19182f7d',
      dark: '#152238',
      contrastText: '#D9D9D9',
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
  typography(palette) {
    return {
      fontFamily: 'Inter, sans-serif',
      fontSize: 14,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
      color: palette.text.primary,
      caption: {
        fontSize: '2.5rem',
        fontWeight: 400,
        color: palette.text.primary,
        textTransform: 'capitalize',
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
       fontSize: '0.85rem',
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
      // defaultProps: {
      //   disableRipple: true,
      // },
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