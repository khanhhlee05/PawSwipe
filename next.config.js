/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/dashboard',  // The page to load when accessing "/"
      },
    ]
  },
};

export default nextConfig;
