

import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import theme from '../styles/theme'
import UIProvider from '@/context/ui'

const ContextProvider = ( { children }:{
  children:  React.ReactNode | React.ReactNode[] 
}) => {

  return(
    <>
     <UIProvider>
      <MuiThemeProvider theme={theme}>
        { children }
      </MuiThemeProvider>
     </UIProvider>
    </>
  )
}

export default ContextProvider