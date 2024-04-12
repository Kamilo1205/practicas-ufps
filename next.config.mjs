/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
          },
          {
            protocol: 'https',
            hostname: 'ww2.ufps.edu.co'
          }
        ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb'
    }
  }
};


export default nextConfig;
