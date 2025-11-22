import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'travelorientalmindoro.ph',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.travelorientalmindoro.ph',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'beachsearcher.si',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdns.app',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'scontent.fmnl13-2.fna.fbcdn.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'scontent.fmnl13-1.fna.fbcdn.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.coltonyacht.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.oklilytoys.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'watercraftzone.com.au',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.zrinflatable.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.vivovenetia.it',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '5.imimg.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
