

import '../styles/globals.css'
import CssBaseline from '@mui/material/CssBaseline';
import ContextProvider from 'reducers/provider'
import { AppProps } from "next/app"
import { ErrorAlert, SuccessAlert } from '@/components/common/alert';
import { TopCenteredSnackbar } from '@/components/common/snackbars';
import { Box } from '@mui/material';
import { ReactNode, useContext } from 'react';
import { StoreContext, notificationReducer } from 'reducers/store';

const NotificationHelper = ({ children }: {
  children: ReactNode | ReactNode[]
}) => {
  const store = useContext(StoreContext)
  const notification = store.state.notification
  const { notificationDispatch } = store.combinedDispatch
  const { notificationActions: { clearNotification } } = notificationReducer

  return (
    <>
      <Box>
        { notification && 
        <TopCenteredSnackbar autoHideDuration={6000} open={notification.show} onClose={() => 
           notificationDispatch({type: clearNotification, payload: undefined})}>
          <>
            {notification.type === 'error' && <ErrorAlert>{notification.message}</ErrorAlert>}
            {notification.type === 'success' && <SuccessAlert>{notification.message}</SuccessAlert>}
          </>
        </TopCenteredSnackbar>}
      </Box> 
      {children}
   </>
  )
}

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <ContextProvider>
        <NotificationHelper>
          <CssBaseline enableColorScheme />
          <Component {...pageProps} />          
        </NotificationHelper>
      </ContextProvider>
    </>
  )
}

export default MyApp


