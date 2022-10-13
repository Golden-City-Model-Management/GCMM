/** @type {import('next').NextConfig} */

const ADMIN_URL = process.env.ADMIN_URL ||  'http://localhost:4000'

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
    ]
  },
  images: {
    domains: ['res.cloudinary.com'],
  }
}
