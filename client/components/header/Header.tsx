
import { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Theme, Typography } from '@mui/material';
import { HideInDesktop, IconOrTextBtn } from '@/components/common/bones'
import Navigation from '@/components/navigation/Nav';
import { ResponsiveDrawer } from '@/components/common/Drawer'
import Logo from '@/components/svgs/Logos';
import { UIContext } from '@/context/context'
import { WithNextLink } from '../common/Links';


const Header = ({ showMenuBtnAlways }: { showMenuBtnAlways: boolean }) => {

  const { showNav, toggleShowNav, drawerWidth } = useContext(UIContext)

  const OpenMenuBtn = <IconOrTextBtn
    data-testid="menu-button"
    onClick={() => toggleShowNav()}
    Icon={showMenuBtnAlways ? 'menu' : MenuIcon} />

  const CloseMenuBtn = <HideInDesktop
    sxProp={{
      justifyContent: 'flex-end', padding: {
        md: '18px 18px 0 0',
        xs: '13px 13px 0 0',
      },
    }}
    hideInDesktop={!showMenuBtnAlways}>
    <IconOrTextBtn
      data-testid="close-menu-button"
      onClick={() => toggleShowNav()}
      Icon={CloseIcon} />
  </HideInDesktop>

  const appBarSx = (theme: Theme) => ({
    background: theme.palette.primary.dark,
    padding: {
      lg: showMenuBtnAlways ? '0 55px' : '0 114px',
      md: '0 35px',
      xs: '0 15px',
    },
    borderBottom: { lg: `1px solid ${theme.palette.secondary.light}` },
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  })

  const DrawerChildren = (
    <>
      {CloseMenuBtn}
      <Navigation onClick={showMenuBtnAlways ? toggleShowNav : undefined} />
    </>
  )

  return (
    <>
      <AppBar
        position="sticky"
        sx={(theme) => ({ ...appBarSx(theme) })}>
        <>
          <WithNextLink href='/' passHref>
          <Button variant='text'>
            <Typography component='span' sx={{display: 'none', visibility:'hidden'}}>Home</Typography>
            <Logo />
          </Button>
          </WithNextLink>
          {showMenuBtnAlways ?
            <>{OpenMenuBtn}</> :
            <HideInDesktop hideInDesktop={!showMenuBtnAlways} >{OpenMenuBtn}</HideInDesktop>
          }
        </>
      </AppBar>
      <Box >
        <ResponsiveDrawer
          component="nav"
          open={showNav}
          handleClose={() => toggleShowNav()}
          isInDesktop={showMenuBtnAlways}
          drawerWidth={drawerWidth}>
          {DrawerChildren}
        </ResponsiveDrawer>
      </Box>
    </>
  )
}

export default Header