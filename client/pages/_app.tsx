

import '../styles/globals.css'
import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from '../styles/ThemeProvider'
import type { AppPropsWithLayout } from '@/types/pages'
import UIProvider from '@/context/ui'

function MyApp({ Component, pageProps }: AppPropsWithLayout) {

  const getLayout = Component.getLayout ?? ((page) => page)

  return(
  <>
    { 
    ThemeProvider(<UIProvider>
      <CssBaseline enableColorScheme  />
      {getLayout( <Component {...pageProps} />)}
     </UIProvider>)
    }
  </>
  )
}

export default MyApp
