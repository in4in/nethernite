const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/v1/": {
        target: "https://data.jsdelivr.com/",
        secure: false,
        changeOrigin: true,
      },
      "/-/": {
        target: "https://registry.npmjs.com/",
        secure: false,
        changeOrigin: true,
      },
    },
  },
})
