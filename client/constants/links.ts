

import FacebookIcon from '@mui/icons-material/Facebook'
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
    name: 'About Us',
    to: '/about-us'
  }
]
// Todo change links to appropriate routes
const socialLinks = [
  {
    name: InstagramIcon,
    to: 'https://www.instagram.com/goldencitymodelsng/?igshid=YmMyMTA2M2Y%3D',
  },
  {
    name: FacebookIcon, 
    to: 'https://web.facebook.com/goldencitymodelsng-113310673451415/',
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
