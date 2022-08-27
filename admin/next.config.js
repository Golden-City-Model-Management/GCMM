/** @type {import('next').NextConfig} */

const ADMIN_URL =  'http://localhost:4000/'

const nextConfig = {
  reactStrictMode: true,
  basePath: '/admin',
  images: {
    domains: ['images.unsplash.com']
  },
}

module.exports = nextConfig
