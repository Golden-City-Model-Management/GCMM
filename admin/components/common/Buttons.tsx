

import { forwardRef } from 'react'
import Button, { ButtonProps } from '@mui/material/Button'
import { Theme } from '@mui/material'
import { rounded, padded } from '@/styles/styles'

const btnStyles = (theme: Theme) => ({
  ...padded().sm,
  textTransform: 'uppercase',
  fontSize: '1.4rem',
  lineHeight: '24px',
  fontWeight: '700',
  textAlign: 'center',
  ...rounded().sm,
  [theme.breakpoints.up('md')]: {
    ...padded().md,
  }
})
export const StyledBorderBtn = forwardRef(({children, ...otherProps}: ButtonProps, ref) => {
  return (
    <Button
    {...otherProps}
    sx={(theme) => ({  
    border: `2px solid currentColor`,
    background: 'transparent',
    color: theme.palette.text.primary,
    ...btnStyles(theme),
  })}
    >{children}</Button>
  )
})

export const BasicBtn = forwardRef(({children, sx, ...otherProps}: 
  { sx: (theme: Theme) => ({}) } & ButtonProps, ref) => {
  return (
    <Button
    {...otherProps}
    sx={(theme) => ({  
    background:  theme.palette.text.primary,
    color: theme.palette.primary.main,
    ...btnStyles(theme),
    ...sx(theme),
    '&:hover': {
      color:  theme.palette.text.primary,
      background: theme.palette.primary.main,
      filter: 'brightness(1.5)'
    }
    })}
    >{children}</Button>
  )
})