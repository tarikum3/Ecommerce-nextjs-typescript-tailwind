/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        // protocol: "https",
        // hostname: "cdn.shopify.com",
        // pathname: "/s/files/**",
        protocol: "https",
        hostname: "qvkdnhfbjppmzromhdae.supabase.co",
        pathname: "/storage/**",
      },
    ],
  },
};

export default nextConfig;
