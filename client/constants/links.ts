

import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'

const mainNavLinks = [
  {
    name: 'main board',
    to: '/mainboard',
  },
  {
    name: 'women',
    to: '/women',
  },
  {
    name: 'men',
    to: '/men',
  },
  {
    name: 'new faces',
    to: '/newfaces'
  },
  {
    name: 'gallery',
    to: '/gallery'
  },
]

const subNavLinks = [
  {
    name: 'about us',
    to: '/about'
  },
  {
    name: 'contact us',
    to: '/contact'
  }
]

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
    name: 'main board',
    to: '/mainboard'
  },
  {
    name: 'new faces',
    to: '/newfaces'
  }
]

export  { mainNavLinks, subNavLinks, socialLinks, heroLinks }
