

import '../styles/globals.css'
import CssBaseline from '@mui/material/CssBaseline';
import ContextProvider from '@/context/provider'
import { AppProps } from "next/app"

function MyApp({ Component, pageProps }: AppProps) {

    return (
      <>
        {
          ContextProvider(
          <>
            <CssBaseline enableColorScheme />
            <Component {...pageProps} />
          </>
          )
        }
      </>
    )
}

export default MyApp


