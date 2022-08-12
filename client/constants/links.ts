

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

const adminLinks = [
  {
    name: 'models',
    to: '/models',
    subLinks: [
      {
        name: 'add model',
        to: '/models/add',
      },
      {
        name: 'view models',
        to: '/models'
      }
    ]
  },
  {
    name: 'gallery',
    to: '/gallery',
    subLinks: [
      {
        name: 'add new item',
        to: '/gallery/add',
      }
    ]
  },
  {
    name: 'staff',
    to: '/staff',
    subLinks: [
      {
        name: 'create account',
        to: '/staff/add',
      },
      {
        name: 'view staff',
        to: '/staff'
      }
    ]
  },
  {
    name: 'applications',
    to: '/applications',
    subLinks: [
      {
        name: 'model applications',
        to: '/applications/models',
      },
      {
        name: 'career applications',
        to: '/applications/careers'
      }
    ]
  },
  {
    name: 'feedback',
    to: '/feedback',
    subLinks: []
  },
]

export  { mainNavLinks, subNavLinks, socialLinks, heroLinks, adminLinks}
