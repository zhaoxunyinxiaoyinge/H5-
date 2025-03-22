const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');
const path=require('path');

module.exports = {
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
    ],
    resolve:{
      alias:{
        "@":path.resolve(__dirname,'src')
      }  
    }
  },

  devServer: {
    https:false,
    port:80,
    disableHostCheck: true,
    host:"0.0.0.0",
    proxy: {
      '/api': {
        target: 'http://localhost:7001',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/api": "/api",
        },
      }
    }
  },
}