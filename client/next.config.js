/** @type {import('next').NextConfig} */

const ADMIN_URL =  'http://localhost:4000/'

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return {
      fallback: [
        {
          source: '/:path*',
          destination: process.env.ADMIN_URL || ADMIN_URL,
        },
      ]
    }
  },
}

module.exports = nextConfig
