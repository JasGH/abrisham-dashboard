module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://192.168.5.43:700',
        pathRewrite: {'^/api/': '/api/'},
        ws: true,
        xfwd: true
      }
    }
  }
}
