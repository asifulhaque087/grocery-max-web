module.exports = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return process.env.NODE_ENV === "production"
      ? [
          {
            source: "/images/:slug*",
            destination: `https://grocery-max-server.herokuapp.com/images/:slug*`,
          },
        ]
      : [
          {
            source: "/images/:slug*",
            destination: `http://localhost:5000/images/:slug*`,
          },
        ];
  },
};
