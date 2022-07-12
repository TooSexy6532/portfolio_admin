const { defineConfig } = require("@vue/cli-service")

module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    proxy: {
      "/api/": {
        target: "http://localhost:5050/",
        changeOrigin: true,
      },
      "/uploads/": {
        target: "http://localhost:5050/",
        changeOrigin: true,
      },
    },
  },
})
