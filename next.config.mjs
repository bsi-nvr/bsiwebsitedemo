/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Unoptimized disabled to allow Next.js to optimize images
  },
}
export default nextConfig
