/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    allowedDevOrigins: ["http://127.0.0.1:3000", "http://localhost:3000"], // or whatever port you're using
  },
};

export default nextConfig;
