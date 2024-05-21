/** @type {import('next').NextConfig} */
module.exports = {
  async rewrites() {
    return [
      // `/en/api` yolu için `/api` rotasına yeniden yönlendirme      
      {
        source: '/:lang/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
  },
  transpilePackages: ["@repo/ui", "@repo/ayasofyazilim-ui"],
  output: "standalone",
};

