/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image URLS
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.winevybe.com'
      }
    ]
  }
}

module.exports = nextConfig
