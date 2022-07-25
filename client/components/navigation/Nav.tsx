
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import { LinkListItem } from '@/components/common/Links'
import { mainNavLinks, subNavLinks, socialLinks } from '@/constants/links'

const listSx = () => ({
    margin: '0 0 30px 0'
  })
const Navigation = () => {

  return (
      <Box sx={() => ({
        padding: '10px 0 10px 32px',
      })}>
        <List sx={() => ({...listSx()})}>
          {mainNavLinks.map(link => (<LinkListItem
          key={link.to} 
          variant='mainNavLink'
          link={link} />))}

        </List>
        <List  sx={() => ({...listSx()})}>
         {subNavLinks.map(link => ( <LinkListItem
          key={link.to} 
          variant='subNavLink'
          link={link} />))}
        </List>
        <List 
          sx={() => ({
            display: 'flex', 
            maxWidth: '40%',})}>
          {socialLinks.map(link => (<LinkListItem 
          key={link.to} 
          variant='subNavLink'
          link={link} />))}
        </List>
        <Typography
         sx={(theme) => 
          ({
            color: theme.palette.text.primary,
            textTransform: 'capitalize'
          })}
          variant='small'
          component='small'>
          &copy; GOLDEN CITY MODEL MANAGEMENT {new Date().getFullYear()}
        </Typography>
      </Box>
  );
}

export default Navigation

