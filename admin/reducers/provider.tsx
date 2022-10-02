

import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import theme from '../styles/theme'
import StoreProvider from './store'

const ContextProvider = ({ children }: {
  children: React.ReactNode | React.ReactNode[]
}) => {
  return (
    <StoreProvider>
      <MuiThemeProvider theme={theme}>
        <>{children}</>
      </MuiThemeProvider>
    </StoreProvider>
  )
}

export default ContextProvider