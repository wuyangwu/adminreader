module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8088',
        // ws: true, // 开启websocket
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/api': '/'
        }
      }
    },
    overlay: {
      warnings: true,
      errors: true
    }
  }
}
