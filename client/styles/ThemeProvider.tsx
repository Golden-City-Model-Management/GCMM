

import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import theme from './theme'

const ThemeProvider = ( children: React.ReactNode | React.ReactNode[] ) => {

  return(
    <MuiThemeProvider theme={theme}>
    { children }
   </MuiThemeProvider>
  )
}

export default ThemeProvider