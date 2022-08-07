

import { forwardRef } from 'react'
import Button, { ButtonProps } from '@mui/material/Button'
import { Theme } from '@mui/material'
import { rounded, padded } from '@/styles/styles'

const btnStyles = (theme: Theme) => ({
  padding: '10px 15px',
  textTransform: 'uppercase',
  fontSize: '1.4rem',
  lineHeight: '24px',
  fontWeight: '700',
  textAlign: 'center',
  ...rounded().sm,
  [theme.breakpoints.up('sm')]: {
    ...padded().sm,
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
    '&:hover': {
      color: theme.palette.text.secondary,
    }})}
    >{children}</Button>
  )
})

export const WhiteButton = forwardRef(({children, sx, ...otherProps}: 
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
      color: theme.palette.primary.main,
      background:  theme.palette.text.secondary,
    }
    })}
    >{children}</Button>
  )
})