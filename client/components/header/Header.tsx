
import { useContext } from 'react';
import Logo from '@/components/svgs/Logos';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Navigation from '@/components/navigation/Nav';
import { UIContext } from '@/context/ui'
import { Theme } from '@mui/material';
import { HideInDesktop, IconOrTextBtn } from '@/components/common/bones'
import { PermanentDrawer, TemporaryDrawer } from '@/components/common/Drawer'
 

const Header = ({ showMenuBtnAlways }: { showMenuBtnAlways: boolean }) => {

  const {showNav, toggleShowNav, bodyWidth, drawerWidth } = useContext(UIContext)
  
  const OpenMenuBtn = <IconOrTextBtn 
    onClick={toggleShowNav} 
    Icon={showMenuBtnAlways ? 'menu' : MenuIcon} />

  const CloseMenuBtn = <HideInDesktop 
    sxProp={{justifyContent: 'flex-end', padding: {
      lg: '64px 64px 0 0',
      md: '18px 18px 0 0',
      xs: '13px 13px 0 0',
    },}}
    children={ <IconOrTextBtn onClick={toggleShowNav} Icon={CloseIcon}/>} 
    mobile={!showMenuBtnAlways} />

  const appBarSx = (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    background: theme.palette.primary.dark,
    padding: {
      lg: showMenuBtnAlways ? '0 55px' : '0 114px',
      md: '0 35px',
      xs: '0 15px',
    }, 
    width: { lg: !showMenuBtnAlways ? bodyWidth : '100%' },
    borderBottom: { lg: `1px solid ${theme.palette.secondary.light}`},
  })

  const DrawerChildren = (
    <>
    {CloseMenuBtn}
    <Navigation />
    </>
  )

  return ( 
    <>
    <AppBar 
      position="sticky" 
      sx={(theme) => ({...appBarSx(theme)})}> 
      <>
        <Button  
          variant='text' 
          href='/'>
          <Logo />
        </Button>
       { showMenuBtnAlways ?
         <>{OpenMenuBtn}</> :
         <HideInDesktop 
          children={OpenMenuBtn} 
          mobile={!showMenuBtnAlways} />
       }
     </>
    </AppBar>
    <Box
        component="nav"
        sx={{ width: { lg: drawerWidth }, flexShrink: { sm: 0 } }}>
          <TemporaryDrawer open={showNav} handleClose={toggleShowNav} isInDesktop={showMenuBtnAlways} drawerWidth={drawerWidth}>
            {DrawerChildren}
          </TemporaryDrawer>
       { !showMenuBtnAlways &&
        <PermanentDrawer drawerWidth={drawerWidth}>
          {DrawerChildren}
        </PermanentDrawer>
        }
      </Box>
    </>
  )
}

export default Header