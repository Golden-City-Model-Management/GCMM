


import { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import { IconOrTextBtn } from '@/components/Buttons/Buttons'
import AdminNavigation from '@/components/navigation/Nav';
import { TemporaryDrawer } from '@/components/common/Drawer'
import Logo from '@/components/svgs/Logos';
import { UIContext } from '@/context/ui';
import * as styles from './style'
import List from '@mui/material/List';
import Mapper from '../Mapper';
import { NavLinkListItemWithSubLinks } from '../common/Links';
import { navLinks } from '@/constants/links';

const Header = () => {
  const { showNav, toggleShowNav, drawerWidth, boxPadding } = useContext(UIContext)
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
          itemProps={{background: true}} />
      </List>
          <Box sx={styles.MenuBtnSectionSx}>
            <IconOrTextBtn data-testid='admin-nav-toggle' Icon={MenuIcon} onClick={() => toggleShowNav()} />
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

          <Box display='flex' justifyContent='space-between' alignItems='center'>
            <IconOrTextBtn Icon={CloseIcon} onClick={() => toggleShowNav()} />
          </Box>
          <AdminNavigation />

        </Box>
      </TemporaryDrawer>
    </AppBar>
  )
}

export default Header;