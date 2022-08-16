
const navLinks = [
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
        name: 'add new image',
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
    name: 'feedbacks',
    to: '/feedbacks',
    subLinks: []
  },
]

export  { navLinks }
