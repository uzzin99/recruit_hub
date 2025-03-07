const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //for proxy
  //outputDir: "../recruit_hub/src/main/resources/static", //build 경로
  devServer : {
    proxy: {
      '/auth/api': {
        target: process.env.VUE_APP_API_BASE_URL,
        changeOrigin: true
      },
      '/email/api': {
        target: process.env.VUE_APP_API_BASE_URL,
        changeOrigin: true
      },
      '/loginProcess': {
        target: process.env.VUE_APP_API_BASE_URL,
        changeOrigin: true
      }
    }
  }
})