

import { forwardRef } from 'react'
import Button, { ButtonProps } from '@mui/material/Button'

export const StyledBorderBtn = forwardRef(({ children, ...otherProps }: ButtonProps, ref) => {
  return (
    <Button {...otherProps} variant='outlined' color='inherit' sx={t => ({ '&:hover': { color: t.palette.secondary.main } })}>
      {children}
    </Button>)
})