var path = require('path')
var config = require('../config')

function resolve (dir) {
  return path.join(__dirname,  dir)
}

var config = {
  // 起点或是应用程序的起点入口
  entry: resolve('src/index.js'),
  // 在哪里输出它所创建的 bundles，以及如何命名这些文件
  // 主输出文件默认为 **./dist/main.js**，其他生成文件的默认输出目录是 **./dist**。
  output: {
    // 所有输出文件的目标路径，必须是绝对路径
    path: resolve(__dirname, 'dist'),
    // 每个输出 bundle 的名称
    filename: '[name].[hash].bundle.js',
    // 输出解析文件的目录，url 相对于 HTML 页面
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    // 非入口 chunk 文件的名称
    chunkFilename: '[name].[hash].bundle.js',
  },
  // 如何处理项目中的不同类型的模块
  module: {
    // 防止 webpack 解析那些任何与给定正则表达式相匹配的文件，忽略大型的 library 可以提高构建性能
    noParse: function(content) {
      return /jquery|lodash/.test(content) // content为文件绝对路径
    },
    rules: [
      {
        // 命中 JavaScript 文件
        test: /\.js$/,
        // 用 babel-loader 转换 JavaScript 文件
        // ?cacheDirectory 表示传给 babel-loader 的参数，用于缓存 babel 编译结果加快重新编译速度
        use: ['babel-loader?cacheDirectory'],
        // 只命中src目录里的js文件，加快 Webpack 搜索速度
        include: path.resolve(__dirname, 'src')
      },
      {
        // 命中 SCSS 文件
        test: /\.scss$/,
        // 使用一组 Loader 去处理 SCSS 文件。
        // 处理顺序为从后到前，即先交给 sass-loader 处理，再把结果交给 css-loader 最后再给 style-loader。
        use: ['style-loader', 'css-loader', 'sass-loader'],
        // 排除 node_modules 目录下的文件
        exclude: path.resolve(__dirname, 'node_modules'),
      },
      {
        // 对非文本文件采用 file-loader 加载
        test: /\.(gif|png|jpe?g|eot|woff|ttf|svg|pdf)$/,
        use: ['file-loader'],
      },
    ]
  },
  // 如何寻找模块所对应的文件
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    },
    extensions: ['.js', '.json', '.jsx', '.css'],
    modules: ['node_modules']
  },
  // 优化
  optimization: {
    minimizer: [
      new UglifyJsPlugin({ /* your config */ })
    ],
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: {
      name: 'runtime'
    }
  },
  // 配置
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    }),
  ],
  // 生成以及如何生成 source map
  devtool: 'cheap-eval-source-map',
  // webpack-dev-server 配置
  devServer: {
    // 切换成 HTTPS 服务
    https: true,
    host: 'localhost',
    port: 8080,
    // 一般要与output.publicPath相同
    publicPath: '/',
    // http-proxy-middleware
    proxy: {
      '/api': 'http://localhost:3000'
    },
    // 启用 webpack 的模块热替换特性
    hot: true,
    // 打开浏览器
    open: true
  }
}

module.exports = config