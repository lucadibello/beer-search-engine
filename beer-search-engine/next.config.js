/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image URLS
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ]
  }
}

module.exports = nextConfig
