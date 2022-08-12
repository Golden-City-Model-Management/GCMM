
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import { NavLinkListItemWithSubLinks, } from '@/components/common/Links'
import { adminLinks, } from '@/constants/links'
import Mapper from '@/components/common/Mapper'


const AdminNavigation = () => {
  return (
      <Box sx={() => ({
        padding: '10px 0 10px 32px',
      })}>
      <Box sx={() => ({
        display: 'flex',
        flexDirection: {
          xs: 'column',
          md: 'row'
        },
        alignItems: {
          xs: 'flex-start',
          md: 'space-between'
        },
        justifyContent: {
          xs: 'center',
          md: 'space-between'
        },
        minHeight: '80vh'
      })}>
      <List>
          <Mapper 
            itemName='link'
            list={adminLinks}  
            ComponentItem={NavLinkListItemWithSubLinks} 
            key='to' 
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

export default AdminNavigation

