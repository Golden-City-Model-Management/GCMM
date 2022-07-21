
import { useRouter } from 'next/router'
import NextLink from 'next/link';
import { Link as MUILink } from '@mui/material';
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import { SvgIconComponent } from '@mui/icons-material';
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'

const mainNavLinks = [
  {
    name: 'Main Board',
    to: '/main-board',
  },
  {
    name: 'Women',
    to: '/women',
  },
  {
    name: 'Men',
    to: '/men',
  },
  {
    name: 'New Faces',
    to: '/new-faces'
  },
  {
    name: 'Gallery',
    to: '/gallery'
  },
]

const subNavLinks = [
  {
    name: 'Contact Us',
    to: '/contact-us'
  },
  {
    name: 'About Us',
    to: '/about-us'
  }
]

const socialLinks = [
  {
    name: InstagramIcon,
    to: 'https://www.instagram.com/',
  },
  {
    name: FacebookIcon, 
    to: 'https://www.facebook.com',
  },
  {
    name:  TwitterIcon,
    to: 'https://www.twitter.com',
  }
]

const NavLinkItem = ({link, variant,}: {
  link: {
    name: string | SvgIconComponent,
    to: string
  },
  variant?: 'mainNavLink' | 'subNavLink'  
}) => {

  const router = useRouter()
  const isActive = router.asPath === link.to
  const Icon = link.name
  
  return (
    <ListItem sx={{padding: '8px 0'}}>
    <NextLink href={link.to} passHref>
     <MUILink
     variant={variant} 
     sx={(theme) => ({
      color: isActive ? theme.palette.text.secondary : theme.palette.text.primary,
      textTransform: 'capitalize',
      '&:hover': {
        color: theme.palette.text.secondary,
        textDecoration: 'none'
      }
     })}
     >{typeof link.name === 'string' ? link.name : <Icon /> }</MUILink>
   </NextLink>
  </ListItem>
  )
}

const listSx = () => ({
    margin: '0 0 30px 0'
  })
const Navigation = () => {

  return (
      <Box sx={() => ({
        padding: '10px 0 10px 32px',
      })}>
        <List sx={() => ({...listSx()})}>
          {mainNavLinks.map(link => (<NavLinkItem
          key={link.to} 
          variant='mainNavLink'
          link={link} />))}

        </List>
        <List  sx={() => ({...listSx()})}>
         {subNavLinks.map(link => ( <NavLinkItem
          key={link.to} 
          variant='subNavLink'
          link={link} />))}
        </List>
        <List 
          sx={() => ({
            display: 'flex', 
            maxWidth: '40%',})}>
          {socialLinks.map(link => (<NavLinkItem 
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