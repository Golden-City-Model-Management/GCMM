

import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import theme from '../styles/theme'
import UIProvider from '@/context/ui'
import UserProvider from '@/context/user'

const ContextProvider = ({ children }: {
  children: React.ReactNode | React.ReactNode[]
}) => {

  return (
    <>
      <UserProvider>
        <UIProvider>
          <MuiThemeProvider theme={theme}>
            {children}
          </MuiThemeProvider>
        </UIProvider>
      </UserProvider>
    </>
  )
}

export default ContextProvider