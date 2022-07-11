

import '../styles/globals.css'
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles'
import theme from '../styles/theme'
import type { AppPropsWithLayout } from '@/types/pages'


function MyApp({ Component, pageProps }: AppPropsWithLayout) {

  const getLayout = Component.getLayout ?? ((page) => page)

  return(
  <>
    <ThemeProvider theme={theme}>
     <CssBaseline enableColorScheme  />
     {getLayout( <Component {...pageProps} />)}
    </ThemeProvider>
  </>
  )
}

export default MyApp
