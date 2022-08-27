import { padded } from '@/styles/styles'
import { Theme } from '@mui/material'


export const AppbarSx = (theme: Theme) => {
  return ({
    background: theme.palette.primary.dark,
    boxShadow: '0 20px 30px #ffffff12'
  })
}

export const AvatarSectionSx = (theme: Theme) => {
  return ({
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      alignItems: 'center'
    }
  })
}

export const MenuBtnSectionSx = (theme: Theme) => {
  return ({
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    }
  })
}

export const TemporaryDrawerSx = (theme: Theme) => {
  return ({
    padding: '30px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  })
}