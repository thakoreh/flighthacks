/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: process.env.NODE_ENV === 'production' ? '/flighthacks' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/flighthacks/' : '',
};
module.exports = nextConfig;
