

import { Theme } from '@mui/material'
import TextAreaAutoSize, { TextareaAutosizeProps } from '@mui/material/TextareaAutosize'
import Input, { InputProps } from '@mui/material/Input'
import Box from '@mui/material/Box'
 
const whiteBorderStyles = (theme: Theme) => ({
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
})

export const WhiteBorderInput = ({ 
  value, onChange, type, name, sx, placeholder, ...rest }: {
    sx?: (theme: Theme) => (object),
  } & InputProps) => {

  return (
    <Input
    {...rest}
    sx={(theme) => ({
      ...whiteBorderStyles(theme),
      ...(sx ? sx(theme) : {}),
      borderRadius: '8px',
      padding: '8px 12px'
      })}
    placeholder={placeholder}
    name={name}
    value={value} 
    onChange={onChange} 
    type={type} />
  )
}

export const TextareaAutoResizeWhiteBorder = ({ 
  value, onChange, name, sx, placeholder, ...rest }: {
    sx?: (theme: Theme) => (object),
  } & TextareaAutosizeProps) => {

  return (
    <Box padding={3} borderRadius={3}
     sx={(theme: Theme) => ({
      ...whiteBorderStyles(theme),
      ...(sx ? sx(theme) : {}),
      height: '100%', 
      })}
     >
      <TextAreaAutoSize
      {...rest} 
      placeholder={placeholder}
      name={name}
      value={value} 
      onChange={onChange}
      maxRows={4}
      aria-label="message"
      style={{
         maxWidth: '100%', 
         maxHeight: '100%', 
         height: '100%',
         width: '100%',
         border: 'none', 
         outline: 'none', 
         background: 'transparent', 
         fontSize: 'inherit', 
         fontFamily: 'inherit',
         color: 'inherit' }} 
      />      
    </Box>

  )
}
