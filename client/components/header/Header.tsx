
import { useContext, ReactElement } from 'react';
import Logo from '@/components/svgs/Logos';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import { SvgIconComponent } from '@mui/icons-material';
import Navigation from '@/components/navigation/Nav';
import { UIContext } from '@/context/ui'
import { Theme } from '@mui/material';

const HideInDesktop = (
  { children, mobile, sxProp }: { children: ReactElement, mobile: boolean, sxProp?: object }) => {
 
  const sx = {
    display:{ 
      lg: mobile ? 'none' : 'flex', 
      xs: !mobile ? 'none' :'flex' 
    },
    ...sxProp
  }

  return(
    <Box sx={sx}>
      {children}
    </Box>
  )
}

const ToggleMenuBtn = ({Icon, onClick}:
   {
    Icon: SvgIconComponent | string,
    onClick: () => void
   }) => {
  return(
    <Button
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

const Header = ({ showMenuBtnAlways }: { showMenuBtnAlways: boolean }) => {

  const {showNav, toggleShowNav, bodyWidth, drawerWidth } = useContext(UIContext)
  
  const OpenMenuBtn = <ToggleMenuBtn 
    onClick={toggleShowNav} 
    Icon={showMenuBtnAlways ? 'menu' : MenuIcon} />

  const CloseMenuBtn = <HideInDesktop 
    sxProp={{justifyContent: 'flex-end', padding: {
      lg: '64px 64px 0 0',
      md: '18px 18px 0 0',
      xs: '13px 13px 0 0',
    },}}
    children={ <ToggleMenuBtn onClick={toggleShowNav} Icon={CloseIcon}/>} 
    mobile={showMenuBtnAlways} />

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

  const drawerSx = (theme: Theme) => ({
    '& .MuiDrawer-paper': { 
    boxSizing: 'border-box',
    width: {
      sm: drawerWidth,
      xs: 250
    },  background: theme.palette.primary.dark,
    paddingTop: {
      lg: !showMenuBtnAlways ? '75px' : ''
    }
   },
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
      sx={(theme) => ({...appBarSx(theme)})}
      > 
      <>
      <Button  
      variant='text' 
      href='/'>
        <Logo />
      </Button>
      {
        showMenuBtnAlways ?
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
        <Drawer
          data-testid='nav'
          aria-label="nav"
          variant={"temporary"}  open={showNav}
          onClose={toggleShowNav}
          ModalProps={{ keepMounted: false }}
          anchor='right'
          sx={theme => ({
            display: {
              xs: 'block', 
              lg:  showMenuBtnAlways ? "block" :  'none' },
              ...drawerSx(theme),
          })}>
          {DrawerChildren}
        </Drawer>
       { !showMenuBtnAlways && <Drawer
          data-testid='nav'
          variant="permanent" 
          anchor="right" open
          sx={(theme) => ({
            display: { xs: 'none', lg: 'block' },
            ...drawerSx(theme),
          })}
          >
          {DrawerChildren}
        </Drawer>}
      </Box>
    </>
  )
}

export default Header