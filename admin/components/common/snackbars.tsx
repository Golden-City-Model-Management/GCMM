import Snackbar, { SnackbarProps } from '@mui/material/Snackbar';
import { forwardRef } from 'react';


export const TopCenteredSnackbar = forwardRef<HTMLDivElement, SnackbarProps>((props, ref) => {
  return (
    <Snackbar 
    anchorOrigin={{vertical: 'top', horizontal: 'center'}}
    ref={ref}
    {...props}>
     {props.children}
    </Snackbar>
  )
})

TopCenteredSnackbar.displayName = 'TopCenteredSnackbar'