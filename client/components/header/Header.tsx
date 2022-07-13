
import { useContext, ReactElement } from 'react';
import Logo from '@/components/svgs/Logos';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import { UIContext } from '@/context/ui'



const HideInDesktop = (
  { children, mobile } :  
  {children: ReactElement, mobile: boolean}) => {
 
  const logoStyle = { display: 
    { 
      lg: mobile ? 'none' : 'flex', 
      xs: !mobile ? 'none' :'flex' 
    }}

  return(
    <Box sx={logoStyle}>
      {children}
    </Box>
  )
}

const Header = ({ showMenuBtnAlways }: { showMenuBtnAlways: boolean }) => {

  const { 
    showNav, toggleShowNav, 
    bodyWidth, drawerWidth } = useContext(UIContext)
  
  const MenuBtn =
   <Button
    disableFocusRipple
    disableRipple
    component='button'
    variant='text'
    color='inherit'
    sx={{fontSize: '1.5rem'}}
    onClick={toggleShowNav}> 
      { showMenuBtnAlways ? 'menu' :
       <MenuIcon
        sx={{ fontSize: 40, color: '#fff'  }} /> }
    </Button>

  const appBarSx = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: {
      lg: showMenuBtnAlways ? '0 5rem' : '0 3rem',
      md: '0 3rem',
      xs: '0 1.2rem',
    },
    width: { lg: bodyWidth },
    mr: { lg: `${drawerWidth}` },
  }

  return ( 
    <>
    <AppBar 
      position="sticky" 
      sx={appBarSx} >
      <>
      <Button  
      variant='text' 
      href='/'>
        <Logo />
      </Button>
      {
        showMenuBtnAlways ?
        <>{MenuBtn}</> :
        <HideInDesktop 
          children={MenuBtn} 
          mobile={!showMenuBtnAlways} />
      }
     </>
    </AppBar>
    <Box
        component="nav"
        sx={{ width: { lg: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders">
        <Drawer
          variant={"temporary"}  open={showNav}
          onClose={toggleShowNav}
          ModalProps={{ keepMounted: true }}
          anchor='right'
          sx={{
            display: {
              xs: 'block', 
              lg:  showMenuBtnAlways ? "block" :  'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}>
          {'drawer'}
        </Drawer>
       { !showMenuBtnAlways && <Drawer
          variant="permanent" anchor="right" open
          sx={{
            display: { xs: 'none', lg: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          >
          {'drawer'}
        </Drawer>}
      </Box>
    </>
  )
}

export default Header