

import { forwardRef } from 'react';
import Alert, { AlertProps } from '@mui/material/Alert';


const alertSx = {textTransform: 'capitalize', fontSize: '1rem'}

export const SuccessAlert =
forwardRef<HTMLDivElement, AlertProps>((
  props,
  ref,
) => {
  return (<Alert {...props} sx={alertSx}  ref={ref} severity="success">{props.children}</Alert>)
})
SuccessAlert.displayName = 'SuccessAlert'

export const ErrorAlert = forwardRef<HTMLDivElement, AlertProps>((
  props,
  ref,
) => {
  return (
  <Alert {...props} sx={alertSx}  ref={ref} severity="error">{props.children}</Alert>
  )
})
ErrorAlert.displayName = 'ErrorAlert'