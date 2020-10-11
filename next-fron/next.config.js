module.exports = {
  async rewrites() {
    return [
      {
        source: "/v1",
        destination: "/v1/index.html",
      },
      {
        source: "/v1/:slug*",
        destination: "/v1/index.html",
      },
    ];
  },
};
