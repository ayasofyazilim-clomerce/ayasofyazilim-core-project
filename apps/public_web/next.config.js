const path = require("path");

module.exports = {
  env: {
    async rewrites() {
      return [
        // `/en/api` yolu için `/api` rotasına yeniden yönlendirme      
        {
          source: '/:lang/api/:path*',
          destination: '/api/:path*',
        },
      ];
    },
    BASE_URL: process.env.BASE_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
  },
  reactStrictMode: true,
  transpilePackages: ["@repo/ui", "@repo/ayasofyazilim-ui"],
  output: "standalone",
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
};