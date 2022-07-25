

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
  // {
  //   name: 'Contact Us',
  //   to: '/contact-us'
  // },
  {
    name: 'About Us',
    to: '/about-us'
  }
]
// Todo change links to appropriate routes
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

const heroLinks = [
  {
    name: 'Main Board',
    to: '/main-board'
  },
  {
    name: 'New Faces',
    to: '/new-faces'
  }
]

export  { mainNavLinks, subNavLinks, socialLinks, heroLinks }
