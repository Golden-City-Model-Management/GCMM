

import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import theme from '../styles/theme'
import UIProvider from '@/context/ui'
import UserProvider from '@/context/user'
import ModelsProvider from '@/context/models'


const ContextProvider = ({ children }: {
  children: React.ReactNode | React.ReactNode[]
}) => {

  return (
    <>

      <UserProvider>
        <ModelsProvider>
          <UIProvider>
            <MuiThemeProvider theme={theme}>
              {children}
            </MuiThemeProvider>
          </UIProvider>
        </ModelsProvider>
      </UserProvider>
    </>
  )
}

export default ContextProvider