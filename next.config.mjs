/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/landing",
        destination: "/home",
        permanent: true,
      },
      {
        source: "/products",
        destination: "/",
        permanent: true,
      },
      {
        source: "/products/:path*",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
