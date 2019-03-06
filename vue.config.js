// vue config.js
module.exports = {
  publicPath: process.env.BASE_URL,
  outputDir: 'dist',
  assetsDir: 'public',
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true, // 取消hostname检查
    host: '0.0.0.0',
    port: '8802',
    proxy: {
      '/api': {
        target: 'http://192.168.11.182:3015'
      }
    }
  }
}