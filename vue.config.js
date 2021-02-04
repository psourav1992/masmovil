module.exports = {
    devServer: {
      port: 8080,
      proxy: {
        "/register-process": {
          target: "http://localhost:8090",
          secure: false
        }
      }
    }
  };