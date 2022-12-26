


import { useContext, useCallback } from 'react';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import AdminNavigation from '@/components/navigation/Nav';
import { TemporaryDrawer } from '@/components/common/Drawer'
import Logo from '@/components/svgs/Logos';
import * as styles from './style'
import List from '@mui/material/List';
import Mapper from '../Mapper';
import { NavLinkListItemWithSubLinks } from '../common/Links';
import { navLinks } from '@/constants/links';
import { IconButton } from '@mui/material';
import { StoreContext } from 'reducers/store';

const Header = () => {
  const { state: { ui: { showNav, drawerWidth, boxPadding, }}, combinedDispatch} = useContext(StoreContext)

  const toggleShowNav = useCallback((e?: React.ChangeEvent<HTMLAnchorElement>) => {
    if(e?.target.href.includes('/login')){
      localStorage.removeItem('access_token')
    }
    combinedDispatch.uiDispatch({type: 'TOGGLE_SHOW_NAV', payload: !showNav})
  }, [combinedDispatch, showNav])

  return (
    <AppBar component='header' position="sticky" sx={styles.AppbarSx} >
      <Box display='flex' justifyContent='space-between' alignItems='center'  padding={{ ...boxPadding }}>
        <Logo />

        <Box ml='auto'>
        <List 
         sx={styles.DesktopNavSx} >
        <Mapper
          itemName='link'
          list={navLinks}
          ComponentItem={NavLinkListItemWithSubLinks}
          mapKey='to'
          itemProps={{background: true, onClick: () => {}}} />
      </List>
          <Box sx={styles.MenuBtnSectionSx}>
            <IconButton color='secondary' data-testid='admin-nav-toggle' onClick={() => toggleShowNav()}>
              <MenuIcon fontSize='large' />
            </IconButton>
          </Box>
        </Box>
      </Box>


      <TemporaryDrawer
        background={(theme) => (theme.palette.primary.dark)}
        open={showNav}
        handleClose={() => toggleShowNav()}
        isInDesktop={false}
        drawerWidth={drawerWidth}>
        <Box sx={styles.TemporaryDrawerSx} component="nav">

          <Box display='flex' justifyContent='flex-end' alignItems='center'>
            <IconButton color='secondary' onClick={() => toggleShowNav()}>
              <CloseIcon fontSize='large' />
            </IconButton>
          </Box>
          <AdminNavigation toggleShowNav={toggleShowNav} />

        </Box>
      </TemporaryDrawer>
    </AppBar>
  )
}

export default Header;

