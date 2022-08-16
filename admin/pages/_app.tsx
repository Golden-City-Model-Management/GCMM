

import '../styles/globals.css'
import CssBaseline from '@mui/material/CssBaseline';
import ContextProvider from '@/context/provider'
import type { AppPropsWithLayout } from '@/types/pages'


function MyApp({ Component, pageProps }: AppPropsWithLayout) {

  const getLayout = Component.getLayout ?? ((page) => page)

    return (
      <>
        {
          ContextProvider(<>
              <CssBaseline enableColorScheme />
              {getLayout(<Component {...pageProps} />)}
          </>)
        }
      </>
    )
}

export default MyApp


