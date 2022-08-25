import { padded, rounded } from "@/styles/styles"
import { Theme } from "@mui/material"

export const btnStyles = (theme: Theme) => ({
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

export const StyledBorderBtnSx = (theme: Theme) => {

  return ({
    border: `2px solid currentColor`,
    background: 'transparent',
    color: theme.palette.text.primary,
    transition: 'all .3s ease',
    '&:hover': {
      color: theme.palette.secondary.main,
      borderRadius: '30px'
    },
    ...btnStyles(theme),
  })
}

export const BasicBtnSx = (theme: Theme, sx: (theme: Theme) => ({})) => {
  
  return ({
    background:  theme.palette.text.primary,
    color: theme.palette.primary.main,
    ...btnStyles(theme),
    ...sx(theme),
    '&:hover': {
      color:  theme.palette.text.primary,
      background: theme.palette.primary.main,
      filter: 'brightness(1.5)'
    }
  })
}