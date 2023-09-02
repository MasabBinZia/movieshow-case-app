/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    domains:["image.tmdb.org"]
  },
  reactStrictMode: true,
  experimental: {
    appDir: true,
    serverActions:true
  },
}

export default nextConfig
