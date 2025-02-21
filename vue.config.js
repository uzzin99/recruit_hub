const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //for proxy
  outputDir: "../recruit_hub/src/main/resources/static", //build 경로
  devServer : {
    proxy: {
      '/auth/api': {
        target: "http://localhost:8080",
        changeOrigin: true
      }
    }
  }
})
