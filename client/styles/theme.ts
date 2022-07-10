


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
  // typography(palette) {
  //   return {
  //     fontFamily: 'Inter, sans-serif',
  //     fontSize: 14,
  //     fontWeightRegular: 400,
  //     fontWeightMedium: 500,
  //     fontWeightBold: 700,
  //     h1: {
  //       fontSize: '2.25rem',
  //       fontWeight: 400,
  //       lineHeight: 1.2,
  //       color: palette.text.primary,
  //     },
  //     h2: {
  //       fontSize: '2rem',
  //       fontWeight: 300,
  //       lineHeight: 1.2,
  //       color: palette.text.primary,
  //     },
  //     h3: {
  //       fontSize: '1.75rem',
  //       fontWeight: 300,
  //       lineHeight: 1.2,
  //       color: palette.text.primary,
  //     },
  //     h4: {
  //       fontSize: '1.5rem',
  //       fontWeight: 300,
  //       lineHeight: 1.2,
  //       color: palette.text.primary,
  //     },
  //     h5: {
  //       fontSize: '1.25rem',
  //       fontWeight: 300,
  //       lineHeight: 1.2,
  //       color: palette.text.primary,
  //     },
  //     h6: {
  //       fontSize: '1rem',
  //       fontWeight: 300,
  //       lineHeight: 1.2,
  //       color: palette.text.primary,
  //     }
  //   };
  // },
})

export default theme