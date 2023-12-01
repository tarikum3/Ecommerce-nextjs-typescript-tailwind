
/** @type {import('next').NextConfig} */
const nextConfig = {
  framework: {
    name: process.env.NEXT_PUBLIC_FRAMEWORK
  },
  i18n: {
    locales: ["en-US", "es"],
    defaultLocale: "en-US"
  },	
    "provider": "shopify",
    "features": {
      "wishlist": true,
      "customerAuth": true
    },
    images: {
      domains: ['cdn.shopify.com'],
    },
};

module.exports = nextConfig;

console.log("next.config.js", JSON.stringify(module.exports, null, 2))