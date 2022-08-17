/** @type {import('next').NextConfig} */

const ADMIN_URL =  'http://localhost:4000/'

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return {
      fallback: [
        {
          source: '/:path*',
          destination: `http://localhost:4000/:path*`,
        },
      ]
    }
  },
}

module.exports = nextConfig
