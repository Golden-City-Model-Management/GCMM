
import { ReactElement } from 'react'
import { SvgIconComponent } from '@mui/icons-material'
import Box, { BoxProps } from '@mui/material/Box'
import Button from '@mui/material/Button'

interface HideInDesktopProps extends BoxProps {
  children: ReactElement, hideInDesktop: boolean, sxProp?: object,
}

const HideInDesktop = (
  { children, hideInDesktop, sxProp, ...otherProps }: HideInDesktopProps ) => {
 
  const sx = {
    display:{ 
      lg: hideInDesktop ? 'none' : 'flex', 
      xs: 'flex'
    },
    ...sxProp
  }

  return(
    <Box {...otherProps} sx={sx}>
      {children}
    </Box>
  )
}

const IconOrTextBtn = ({Icon, onClick, ...otherProps}:
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

export { HideInDesktop, IconOrTextBtn}