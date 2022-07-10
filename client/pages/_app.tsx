import '../styles/globals.css'
import type { AppProps } from 'next/app'
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles'
import theme from '../styles/theme'


function MyApp({ Component, pageProps }: AppProps) {

  return(
  <>
    <ThemeProvider theme={theme}>
     <CssBaseline enableColorScheme  />
     <Component {...pageProps} />
    </ThemeProvider>
  </>
  )
}

export default MyApp
