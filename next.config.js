/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    mapbox_key:
      "pk.eyJ1IjoibWFyZWxsYSIsImEiOiJjbGZ2Z2djODUwNzFlM2ZvNzVnYmx1aXRjIn0.STHXakMgCnQ_N-oi5zHO8g",
    server_url:"https://shoppingo.onrender.com"  
  },
  images: {
    domains: ['f005.backblazeb2.com'],
  },
};

module.exports = nextConfig;
