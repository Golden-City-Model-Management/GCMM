

import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import theme from '../styles/theme'
import UIProvider from '@/context/ui'
import UserProvider from '@/context/user'
import ModelsProvider from '@/context/models'
import ModelContextProvider from '@/context/singlemodel'
import { useRouter } from 'next/router'

const ContextProvider = ({ children }: {
  children: React.ReactNode | React.ReactNode[]
}) => {

  const router = useRouter()
  const isSingleModelPath = router.query.hasOwnProperty('name')

  console.log(isSingleModelPath)
  return (
    <>
      <UserProvider>
        <ModelsProvider>
          <UIProvider>
            <MuiThemeProvider theme={theme}>
              {isSingleModelPath ? 
                <ModelContextProvider>
                  {children}
                </ModelContextProvider> :
                <>{children}</>}
            </MuiThemeProvider>
          </UIProvider>
        </ModelsProvider>
      </UserProvider>
    </>
  )
}

export default ContextProvider