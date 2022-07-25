

import { Theme } from '@mui/material'
import Box, { BoxProps } from '@mui/material/Box'
import Drawer, { DrawerProps } from '@mui/material/Drawer'

interface DrawerSxInterface {
  theme: Theme,
  drawerWidth: number,
  temporary: boolean,
}
 const drawerSx = ({theme, drawerWidth, temporary}: DrawerSxInterface) => ({
    '& .MuiDrawer-paper': { 
    boxSizing: 'border-box',
    width: {
      sm: drawerWidth,
      xs: 250
    },  background: theme.palette.primary.dark,
    paddingTop: {
      lg: !temporary ? '75px' : ''
    }
   },
})

interface TemporaryDrawerInterface extends DrawerProps {
  children: React.ReactNode | React.ReactNode[],
  open: boolean,
  handleClose: () => void,
  isInDesktop: boolean,
  drawerWidth: number
}

const TemporaryDrawer = ({children, open, handleClose, isInDesktop, drawerWidth, ...otherProps}: TemporaryDrawerInterface) => {

  return(
    <Drawer
    {...otherProps}
    variant={"temporary"}  open={open}
    onClose={handleClose}
    ModalProps={{ keepMounted: false }}
    anchor='right'
    sx={theme => ({
      display: {
        xs: 'block', 
        lg:  isInDesktop ? "block" :  'none' },
        ...drawerSx({theme, drawerWidth, temporary: true}),
    })}>
    {children}
  </Drawer>
  )
}

interface PermanentDrawerInterface extends DrawerProps {
  children: React.ReactNode | React.ReactNode[]
  drawerWidth: number
}
const PermanentDrawer = ({ children, drawerWidth, ...otherProps}: PermanentDrawerInterface) => {

  return(
    <Drawer
     {...otherProps}
      variant="permanent" 
      anchor="right" open
      sx={(theme) => ({
        display: { xs: 'none', lg: 'block' },
        ...drawerSx({theme, drawerWidth, temporary: false}),
      })}
      >
      {children}
    </Drawer>
  )
}

interface ResponsiveDrawerInterface extends BoxProps {
  children: React.ReactNode | React.ReactNode[],
  open: boolean,
  handleClose: () => void,
  isInDesktop: boolean,
  drawerWidth: number,
}
const ResponsiveDrawer = ({ children, drawerWidth, open, handleClose, isInDesktop, ...otherProps}: ResponsiveDrawerInterface ) => {

  return(
    <Box
    {...otherProps}
    sx={{ width: { lg: drawerWidth }, flexShrink: { sm: 0 } }}>
      <TemporaryDrawer 
       data-testid='nav'
       open={open} 
       handleClose={handleClose} 
       isInDesktop={isInDesktop} 
       drawerWidth={drawerWidth}>
        {children}
      </TemporaryDrawer>

    { !isInDesktop &&
    <PermanentDrawer
      data-testid='nav'
      drawerWidth={drawerWidth}>
      {children}
    </PermanentDrawer>
    }
  </Box>
  )
}
export { TemporaryDrawer, PermanentDrawer, ResponsiveDrawer }