
import { Theme } from '@mui/material'
import Input, { InputProps } from '@mui/material/Input'

export const WhiteBorderInput = ({ 
  value, onChange, type, name, sx, ...rest }: {
    sx?: (theme: Theme) => (object)
  } & InputProps) => {

  return (
    <Input
    sx={(theme) => ({
       color: theme.palette.text.primary,
       border: `2px solid currentColor`,
       borderRadius: '8px',
       padding: '10px 10px',
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
      ...(sx ? sx(theme) : {})
      })}
    name={name}
    value={value} 
    onChange={onChange} 
    type={type} />
  )
}