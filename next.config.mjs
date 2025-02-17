/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.externals = [...(config.externals || []), '@remotion/renderer'];
    return config;
  },
};

export default nextConfig;
