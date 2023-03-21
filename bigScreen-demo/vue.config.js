module.exports = {
  publicPath: './',
  // 反编译
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api': {
        // target: 'http://218.95.181.240:8809/tysyq', // 对应后端的接口
        // target: 'http://192.168.1.18:8090/tysyq', // 对应后端的接口
        target: 'http://10.2.14.66:8099/tysyq', // 对应后端的接口
        // target: 'http://localhost:8080/tysyq', // 对应后端的接口
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  transpileDependencies: [
    'biyi-admin',
    'biyi-captcha'
  ]
}
