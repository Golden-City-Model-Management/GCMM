
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import { NavLinkListItemWithSubLinks, } from '@/components/common/Links'
import { adminLinks, } from '@/constants/links'
import Mapper from '@/components/common/Mapper'


export const AdminNavigationDesktop = () => {

  return (
    <Box sx={theme => ({
      position: 'sticky',
      top: 0,
      left: 0,
      right: 0,
      display: 'none', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: theme.adminPalette.light,
      [theme.breakpoints.up('md')]: {
        display: 'flex'
      }
     })}>
         <List
          sx={theme => ({
           display: 'flex', 
           alignItems: 'center', 
           justifyContent: 'center',
           gap: 7,
          })} >
          <Mapper 
            itemName='link'
            list={adminLinks}  
            ComponentItem={NavLinkListItemWithSubLinks} 
            mapKey='to' 
            itemProps={{  }} />
        </List>
    </Box>
  )
}

const AdminNavigationMobile = () => {
  return (
      <Box>
      <Box >
         <List sx={{
           display: 'flex', 
           flexDirection: 'column',
           alignItems: 'flex-start', 
           justifyContent: 'flex-start',
           gap: 7,
         }} >
          <Mapper 
            itemName='link'
            list={adminLinks}  
            ComponentItem={NavLinkListItemWithSubLinks} 
            mapKey='to' 
            itemProps={{variant:'mainNavLink'}} />
        </List>
        <Typography
         sx={(theme) => 
          ({
            color: theme.palette.text.primary,
            textTransform: 'capitalize',
          })}
          variant='small'
          component='small'>
          &copy; GOLDEN CITY MODEL MANAGEMENT {new Date().getFullYear()}
        </Typography>
      </Box>
      </Box>
  );
}

export default AdminNavigationMobile

