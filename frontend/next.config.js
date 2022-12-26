/** @type {import('next').NextConfig} */

const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL ||  'http://localhost:4000'

const modelpaths = ['main-board', 'men', 'women', 'new-faces'] 

module.exports = {
  async rewrites() {
    return [
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
        destination: '/models/:slug', 
      })),
      ...modelpaths.map(path => ({
        source: `/${path}/:slug/portfolio`,
        destination: '/models/:slug/portfolio', 
      })),
      ...modelpaths.map(path => ({
        source: `/${path}/:slug/polaroids`,
        destination: '/models/:slug/polaroids', 
      }))
    ]
  },
  images: {
    domains: ['res.cloudinary.com'],
  }
}
