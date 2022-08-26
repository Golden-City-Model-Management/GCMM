

import { Theme } from '@mui/material'
import Input, { InputProps } from '@mui/material/Input'
import * as styles from './style'


export const BorderInput = ({ 
  value, onChange, type, name, sx, placeholder, ...rest }: {
    sx?: (theme: Theme) => (object),
  } & InputProps) => {

  return (
    <Input
    {...rest}
    sx={(theme) => styles.borderInputStyles(theme, sx)}
    placeholder={placeholder}
    name={name}
    value={value} 
    onChange={onChange} 
    type={type} />
  )
}

