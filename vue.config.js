// vue.config.js
const webpack = require('webpack')

module.exports = {
    // 更改路径别名
    configureWebpack: {
        plugins: [
          new webpack.ProvidePlugin({
                $:"jquery",
                jQuery:"jquery",
                "windows.jQuery":"jquery"
            })
        ],
        resolve: {
          alias: {
            'assets': '@/assets',
            'components': '@/components',
            'views': '@/views',
            'common': '@/common',
            'network':'@/network',
            'util':'@/util'
          }
        },
        //警告 webpack 的性能提示
        performance: {
            hints:'warning',
            //入口起点的最大体积 整数类型（以字节为单位）
            maxEntrypointSize: 50000000,
            //生成文件的最大体积 整数类型（以字节为单位 300k）
            maxAssetSize: 30000000,
            //只给出 js 文件的性能提示
            assetFilter: function(assetFilename) {
                return assetFilename.endsWith('.js');
            }
        }
      },
      runtimeCompiler: true,
      publicPath: './', //输出的根路径  默认是/ 如果你的网站是app.com/vue 这更改此配置项
      outputDir:'benzun',
      assetsDir:'static',
      lintOnSave: false, // eslint 不限制
      devServer: {
        open: true, //是否自动弹出浏览器页面
        host: "192.168.1.96", //192.168.1.8
        port: '8085',
        https: false,
        hotOnly: false, 
        proxy: {
            '/api': {
                target: 'http://47.254.235.22:8081', //API服务器的地址，正式
                // target: 'http://58.87.127.217:8081', //API服务器的地址，测试
                ws: true,  //代理websockets
                changeOrigin: true, // 虚拟的站点需要更管origin
                pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                    '^/api': ''
                }
            }
        },
    }
  }