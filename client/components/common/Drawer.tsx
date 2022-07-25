

import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer';
import { DrawerProps } from '@mui/material/Drawer/Drawer'
import { Theme } from '@mui/material'

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

const TemporaryDrawer = ({children, open, handleClose, isInDesktop, drawerWidth}: TemporaryDrawerInterface) => {

  return(
    <Drawer
    data-testid='nav'
    aria-label="nav"
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
const PermanentDrawer = ({ children, drawerWidth, }: PermanentDrawerInterface) => {

  return(
    <Drawer
      data-testid='nav'
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

const ResponsiveDrawer = ({ children, drawerWidth, open, handleClose, isInDesktop,}: TemporaryDrawerInterface ) => {

  return(
    <Box
    component="nav"
    sx={{ width: { lg: drawerWidth }, flexShrink: { sm: 0 } }}>
      <TemporaryDrawer open={open} handleClose={handleClose} isInDesktop={isInDesktop} drawerWidth={drawerWidth}>
        {children}
      </TemporaryDrawer>
    { !isInDesktop &&
    <PermanentDrawer drawerWidth={drawerWidth}>
      {children}
    </PermanentDrawer>
    }
  </Box>
  )
}
export { TemporaryDrawer, PermanentDrawer, ResponsiveDrawer }