


import { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { HideInDesktop, IconOrTextBtn } from '@/components/common/bones'
import AdminNavigation from '@/components/navigation/AdminNav';
import { ResponsiveDrawer } from '@/components/common/Drawer'
import Logo from '@/components/svgs/Logos';
import { UIContext } from '@/context/ui';
import UserAvatar from '@/components/common/Avatar';


const AdminLayoutHeader = ({
  avatar
}: {
  avatar: {
    src: string;
    alt: string;
  }
}) => {
  const {showNav, toggleShowNav, drawerWidth } = useContext(UIContext)

  return (
    <AppBar>
      <Logo />
     <Box>
      <Box sx={(theme) => ({
        display: 'none',
        [theme.breakpoints.up('md')]: {
          display: 'flex',
        }
      })}>
        <UserAvatar avatar={avatar} />
      </Box>
      <Box  sx={(theme) => ({
        display: 'flex',
        [theme.breakpoints.up('md')]: {
          display: 'none',
        }
      })}>
        <IconOrTextBtn Icon={MenuIcon} onClick={() => toggleShowNav()} />
      </Box>
     </Box>
      <ResponsiveDrawer 
       component="nav"
       open={showNav} 
       handleClose={() => toggleShowNav()}
       isInDesktop={false} 
       drawerWidth={400}>
        <AdminNavigation />
      </ResponsiveDrawer>
    </AppBar>
  )
}

export default AdminLayoutHeader;