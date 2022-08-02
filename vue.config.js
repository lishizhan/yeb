let proxyObj = {}
proxyObj['/'] = {
  ws: false,//websocket的代理
  target: 'http://localhost:8081',
  //发送请求头host会被设置为target
  changeOrigin: true,
  pathRewrite: {
    '^/': '/'
  }
}
module.exports = {
  lintOnSave: false,
  devServer: {
    host: 'localhost',
    port: '8080',
    proxy: proxyObj
    /* proxy: {
       // 请求前缀：toBlogs
       '/toYeb': {
         target: 'http://localhost:8081',
         ws: true,
         changeOrigin: true,
         //过滤掉toMovie
         pathRewrite:{'^/toYeb':''}
       },*/
  }
}
