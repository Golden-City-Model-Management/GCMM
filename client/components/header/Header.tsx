
import { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { Theme } from '@mui/material';
import { HideInDesktop, IconOrTextBtn } from '@/components/common/bones'
import Navigation from '@/components/navigation/Nav';
import { ResponsiveDrawer } from '@/components/common/Drawer'
import Logo from '@/components/svgs/Logos';
import { UIContext } from '@/context/ui'
 

const Header = ({ showMenuBtnAlways }: { showMenuBtnAlways: boolean }) => {

  const {showNav, toggleShowNav, drawerWidth } = useContext(UIContext)
  
  const OpenMenuBtn = <IconOrTextBtn 
    data-testid="menu-button"
    onClick={toggleShowNav} 
    Icon={showMenuBtnAlways ? 'menu' : MenuIcon} />

  const CloseMenuBtn = <HideInDesktop 
    sxProp={{justifyContent: 'flex-end', padding: {
      md: '18px 18px 0 0',
      xs: '13px 13px 0 0',
    },}}
    children={ <IconOrTextBtn data-testid="close-menu-button" onClick={toggleShowNav} Icon={CloseIcon}/>} 
    hideInDesktop={!showMenuBtnAlways} />

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
          hideInDesktop={!showMenuBtnAlways} />
       }
     </>
    </AppBar>
    <ResponsiveDrawer 
      component="nav"
      open={showNav} 
      handleClose={toggleShowNav} 
      isInDesktop={showMenuBtnAlways} 
      drawerWidth={drawerWidth}>
      {DrawerChildren}
    </ResponsiveDrawer>
    </>
  )
}

export default Header