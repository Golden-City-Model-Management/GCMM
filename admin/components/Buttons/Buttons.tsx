

import { forwardRef } from 'react'
import Button, { ButtonProps } from '@mui/material/Button'
import { SvgIconComponent } from '@mui/icons-material'
import { Theme } from '@mui/material'
import * as styles from './style'

export const StyledBorderBtn = forwardRef(({children, ...otherProps}: ButtonProps, ref) => {
  return (
    <Button {...otherProps} sx={styles.StyledBorderBtnSx}>{children}</Button>
  )
})
StyledBorderBtn.displayName = 'StyledBorderBtn'

export const BasicBtn = forwardRef(({children, sx, ...otherProps}: 
  { sx: (theme: Theme) => ({}) } & ButtonProps, ref) => {
  return (
    <Button
    {...otherProps}
    sx={theme => styles.BasicBtnSx(theme, sx)}>{children}</Button>
  )
})
BasicBtn.displayName = 'BasicBtn'

export const IconOrTextBtn = ({Icon, onClick, ...otherProps}:
  {
   Icon: SvgIconComponent | string,
   onClick: () => void
  }) => {
 return(
   <Button
   {...otherProps}
   disableFocusRipple
   disableRipple
   component='button'
   variant='text'
   color='inherit'
   onClick={onClick}> 
   { typeof Icon === 'string' ? 
   Icon :
   <Icon sx={{ fontSize: 40, color: 'palette.primary.contrastText' }} />}
   </Button>
  )
} 