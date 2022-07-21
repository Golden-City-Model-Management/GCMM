


import Button from '@mui/material/Button'


export const StyledBorderBtn = ({children}: {children: React.ReactNode | React.ReactNode[]}) => {
  return (
    <Button
    sx={(theme) => ({  
    border: `2px solid currentColor`,
    background: 'transparent',
    color: theme.palette.text.primary,
    padding: '10px 15px',
    textTransform: 'uppercase',
    fontSize: '1.6rem',
    lineHeight: '24px',
    fontWeight: '700',
    textAlign: 'center',
    '&:hover': {
      color: theme.palette.text.secondary,
    },
    [theme.breakpoints.up('sm')]: {
      padding: '15px 20px',
    }})}
    >{children}</Button>
  )
}

