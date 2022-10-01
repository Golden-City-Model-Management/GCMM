
const navLinks = [
  {
    name: 'models',
    to: '/models',
    subLinks: [
      {
        name: 'add new model',
        to: '/models/new',
      },
    ]
  },
  {
    name: 'gallery',
    to: '/gallery',
    subLinks: [
      {
        name: 'add new image',
        to: '/gallery/new',
      }
    ]
  },
  {
    name: 'staff',
    to: '/staff',
    subLinks: [
      {
        name: 'create account',
        to: '/staff/new',
      },
    ]
  },
  {
    name: 'applications',
    to: '/applications',
    subLinks: [
      {
        name: 'models',
        to: '/applications/models',
      },
    ]
  },
  {
    name: 'feedbacks',
    to: '/feedbacks',
    subLinks: []
  },
]

export  { navLinks }
