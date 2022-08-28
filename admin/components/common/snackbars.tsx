import Snackbar, { SnackbarProps } from '@mui/material/Snackbar';
import { forwardRef } from 'react';


const disableTransitionProps = {
  TransitionComponent: ({ children }: { children: React.ReactElement<any, any>}) => children
};

export const TopCenteredSnackbar = forwardRef<HTMLDivElement, SnackbarProps>((props, ref) => {
  return (
    <Snackbar 
    {...disableTransitionProps}
    anchorOrigin={{vertical: 'top', horizontal: 'center'}}
    ref={ref}
    {...props}>
     {props.children}
    </Snackbar>
  )
})

TopCenteredSnackbar.displayName = 'TopCenteredSnackbar'