module.exports = {
  devServer: {
    proxy: {
      '/ajax/*': {
        target: 'http://m.maoyan.com',
        changeOrigin: true                         //是否改变传入进来的地址
      },
      '/dianying': {
        target: 'http://m.maoyan.com',
        changeOrigin: true                         //是否改变传入进来的地址
      },
      '/search*': {
        target: 'https://i.maoyan.com/apollo/ajax',
        changeOrigin: true                         //是否改变传入进来的地址
      }
    }
  }
}
