const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const utils = require('./utils')
const config = require('../config')
const devMode = process.env.NODE_ENV !== 'production'


module.exports = {
  entry: {
    app: './src/index.js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [utils.resolve('node_modules')], // 指定 node_modules 的绝对路径，避免向上递归搜索
    alias: {
      '@': utils.resolve('src')
    }
  },
  module: {
    // 防止 webpack 解析那些任何与给定正则表达式相匹配的文件，忽略大型的 library 可以提高构建性能
    noParse: function(content) {
      return /lodash/.test(content) // content为文件绝对路径
    },
    rules: [
      {
        test: /\.css$/,
        use: [
          devMode ? 'style-loader' :{
            loader:MiniCssExtractPlugin.loader,
            options:{
              publicPath: '../../'
            }
          },
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          devMode ? 'style-loader' : {
            loader:MiniCssExtractPlugin.loader,
            options:{
              publicPath: '../../'
            }
          },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      // {
      //   test: /\.(js|vue)$/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre',
      //   include: [utils.resolve('src'), utils.resolve('test')],
      //   options: {
      //     formatter: require('eslint-friendly-formatter')
      //   }
      // },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [utils.resolve('src'), utils.resolve('test')],
        exclude: utils.resolve('node_modules'),
        options: {
          cacheDirectory: true // 缓存转换结果
        }
      },
      // {
      //   test: /\.vue$/,
      //   loader: 'vue-loader',
      //   options: vueLoaderConfig
      // },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: utils.resolve('dist'),
    chunkFilename: '[name].bundle.js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath,
  }
};