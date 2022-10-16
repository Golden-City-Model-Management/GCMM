/** @type {import('next').NextConfig} */

const ADMIN_URL = process.env.ADMIN_URL ||  'http://localhost:4000'

const modelpaths = ['main-board', 'men', 'women', 'new-faces'] 

module.exports = {
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `/:path*`,
      },
      {
        source: '/admin',
        destination: `${ADMIN_URL}/admin`,
      },
      {
        source: '/admin/:path*',
        destination: `${ADMIN_URL}/admin/:path*`,
      },
      ...modelpaths.map(path => ({
        source: `/${path}/:slug`,
        destination: '/models/:slug', // Matched parameters can be used in the destination
      })),
      ...modelpaths.map(path => ({
        source: `/${path}/:slug/portfolio`,
        destination: '/models/:slug/portfolio', // Matched parameters can be used in the destination
      }))
    ]
  },
  images: {
    domains: ['res.cloudinary.com'],
  }
}
