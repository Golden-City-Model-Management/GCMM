import { Theme } from "@mui/material"
import { rounded, padded } from '@/styles/styles'

export const borderInputStyles = (theme: Theme, sx?: (theme: Theme) => (object),) => {

  return ({
    color: theme.palette.text.primary,
    border: `2px solid currentColor`,
    '&:hover': {
     color: theme.palette.secondary.main,
    },
    '&:focus': {
     color: theme.palette.secondary.main,
    },
    '&::before':{
     display: 'none'
    },
    '&::after':{
     display: 'none'
    },
    ...rounded().sm,
    ...padded().sm,
    ...(sx ? sx(theme) : {})
  })
}