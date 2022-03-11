module.exports = {
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
  devServer: {
    // allows to avoid CORS policies in local development environment
    // in production environment it will be hidden behind reverse proxy
    proxy: {
      "/api": process.env.BACKEND_URL || "http://localhost:4000",
    },
  },
};
