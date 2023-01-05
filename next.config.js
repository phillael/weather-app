/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_OPEN_WEATHER_API_KEY:
      process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY,
    NEXT_PUBLIC_X_RAPIDAPI_KEY: process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY,
  },
};

module.exports = nextConfig;
