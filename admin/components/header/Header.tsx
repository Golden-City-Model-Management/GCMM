


import { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { IconOrTextBtn } from '@/components/common/bones'
import AdminNavigation from '@/components/navigation/Nav';
import { TemporaryDrawer } from '@/components/common/Drawer'
import Logo from '@/components/svgs/Logos';
import { UIContext } from '@/context/ui';
import Avatar from '@mui/material/Avatar';
import { WithNextLink } from '@/components/common/Links'
import * as styles from './style'



const Header = ({ avatar }: {
  avatar: {
    src: string;
    alt: string;
  }
}) => {
  const { showNav, toggleShowNav, drawerWidth } = useContext(UIContext)

  return (
    <AppBar component='header' position="sticky" sx={styles.AppbarSx} >
      <Logo />

      <Box ml='auto'>
        <Box sx={styles.AvatarSectionSx}>
          <Typography component='span' mr={2}>  Welcome Back </Typography>
          <WithNextLink href="/me" passHref={true}>
            <Avatar src={avatar.src} alt={avatar.alt} component={'a'} />
          </WithNextLink>        </Box>
        <Box sx={styles.MenuBtnSectionSx}>

          <IconOrTextBtn data-testid='admin-nav-toggle' Icon={MenuIcon} onClick={() => toggleShowNav()} />
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
            <WithNextLink href="/me" passHref={true}>
              <Avatar src={avatar.src} alt={avatar.alt} component={'a'} />
            </WithNextLink>            <IconOrTextBtn Icon={CloseIcon} onClick={() => toggleShowNav()} />
          </Box>
          <AdminNavigation />

        </Box>
      </TemporaryDrawer>
    </AppBar>
  )
}

export default Header;