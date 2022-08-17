


import { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { flexRowJustifyBetweenAlignCenter, padded } from '@/styles/styles';
import { IconOrTextBtn } from '@/components/common/bones'
import AdminNavigation from '@/components/navigation/Nav';
import { TemporaryDrawer } from '@/components/common/Drawer'
import Logo from '@/components/svgs/Logos';
import { UIContext } from '@/context/ui';
import UserAvatar from '@/components/common/Avatar';
import { WithNextLink } from '@/components/common/Links'


const UserIcconLink = ({ avatar }: {
  avatar: {
    src: string;
    alt: string;
  }
}) => {

  return (
    <WithNextLink href="/admin/me" passHref={true}>
      <UserAvatar component='a' avatar={avatar} />
    </WithNextLink>
  )
}

const Header = ({
  avatar
}: {
  avatar: {
    src: string;
    alt: string;
  }
}) => {
  const { showNav, toggleShowNav, drawerWidth } = useContext(UIContext)

  return (
    <AppBar
      position="sticky"
      sx={theme => ({
        background: theme.palette.primary.dark,
        ...flexRowJustifyBetweenAlignCenter(),
        padding: {
          lg: '0 55px',
          md: padded().lg['padding'],
          xs: padded().sm['padding'],
        },
      })} >
      <Logo />
      <Box sx={{ marginLeft: 'auto' }}>
        <Box sx={(theme) => ({
          display: 'none',
          [theme.breakpoints.up('md')]: {
            display: 'flex',
            alignItems: 'center'
          }
        })}>
          <Typography component='span' mr={2}>
            Welcome Back
          </Typography>
          <UserIcconLink avatar={avatar} />
        </Box>
        <Box sx={(theme) => ({
          display: 'flex',
          [theme.breakpoints.up('md')]: {
            display: 'none',
          }
        })}>
          <IconOrTextBtn data-testid='admin-nav-toggle' Icon={MenuIcon} onClick={() => toggleShowNav()} />
        </Box>
      </Box>
      <TemporaryDrawer
        background={(theme) => (theme.palette.primary.dark)}
        open={showNav}
        handleClose={() => toggleShowNav()}
        isInDesktop={false}
        drawerWidth={drawerWidth}>    <Box
          sx={{ 
            padding: '30px 20px',
            display: 'flex', 
            flexDirection: 'column',
            gap: 5,
           }}
          component="nav">
          <Box sx={
            {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <UserIcconLink avatar={avatar} />
            <IconOrTextBtn
              Icon={CloseIcon}
              onClick={() => toggleShowNav()} />
          </Box>
          <AdminNavigation />
        </Box> 
      </TemporaryDrawer>
    </AppBar>
  )
}

export default Header;