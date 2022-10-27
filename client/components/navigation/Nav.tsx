
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import { LinkListItem } from '@/components/common/Links'
import { mainNavLinks, subNavLinks, socialLinks } from '@/constants/links'
import Mapper from '@/components/common/Mapper'

const Navigation = ({
  onClick
}: {
  onClick?: () => void
}) => {
  return (
      <Box sx={() => ({
        padding: '10px 0 10px 32px',
      })}>
      <Box sx={() => ({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '80vh'
      })}>
      <List>
          <Mapper 
            itemName='link'
            list={mainNavLinks.map(el => ({...el, onClick}))}  
            ComponentItem={LinkListItem} 
            mapKey='to' 
            itemProps={{variant:'mainNavLink', onClick}} />
        </List>
        <List >
          <Mapper
            itemName='link'  
            list={subNavLinks.map(el => ({...el, onClick}))}
            ComponentItem={LinkListItem}
            mapKey='to'
            itemProps={{variant:'subNavLink', onClick}} />
        </List>
        <List 
          sx={() => ({
            display: 'flex', 
            maxWidth: '20%',
            marginTop: 'auto', 
            })}>
          <Mapper
            itemName='link'
            list={socialLinks.map(el => ({...el, onClick}))}
            ComponentItem={LinkListItem}
            mapKey='to'
            itemProps={{variant:'subNavLink', onClick}} />
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

export default Navigation

