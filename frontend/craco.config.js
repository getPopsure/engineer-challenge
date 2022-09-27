// craco.config.js
module.exports = {
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  }, 
  
  devServer: {
    hot: true,
    inline: false
 }
};
