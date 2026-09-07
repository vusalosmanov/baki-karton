/** @type {import('next').NextConfig} */
const nextconfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: '83.229.84.217',
        port: '5000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'bakikarton.az',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/az',
        permanent: true, // Axtarış sistemləri (SEO) üçün daimi yönləndirmə
      },
    ];
  },
};

export default nextconfig;