/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    mapbox_key:
      "pk.eyJ1IjoibWFyZWxsYSIsImEiOiJjbGMxcHJvajMxMWxrM29tenRicm40NGFrIn0.N_jN0uvNlxmzwNfCAVB1Qw",
  },
};

module.exports = nextConfig;
