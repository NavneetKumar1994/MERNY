const path = require("path");

module.exports = {
  // Other Webpack configuration options...

  resolve: {
    fallback: {
      "path": require.resolve("path-browserify")
    }
  }
};
