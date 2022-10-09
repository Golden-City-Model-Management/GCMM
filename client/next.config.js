/** @type {import('next').NextConfig} */

const ADMIN_URL =  'http://localhost:4000/'

// const nextConfig = {
//   reactStrictMode: true,
//   async rewrites() {
//     return {
//       fallback: [
//         {
//           source: '/admin',
//           destination: process.env.ADMIN_URL || ADMIN_URL,
//         },
//       ]
//     }
//   },
// }
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
}
// module.exports = nextConfig
