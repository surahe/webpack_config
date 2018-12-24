const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const utils = require('./utils')
const config = require('../config')
const devMode = process.env.NODE_ENV !== 'production'

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [utils.resolve('src'), utils.resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  context: utils.resolve(''),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: utils.resolve('dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [utils.resolve('node_modules')], // 指定 node_modules 的绝对路径，避免向上递归搜索
    alias: {
      '@': utils.resolve('src'),
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    // 防止 webpack 解析那些任何与给定正则表达式相匹配的文件，忽略大型的 library 可以提高构建性能
    noParse: function(content) {
      return /lodash/.test(content) // content为文件绝对路径
    },
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.(scss|css)$/,
        use: [
          devMode ? 'vue-style-loader' : {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../../'
            }
          }, {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: true,
              localIdentName: '[local]_[hash:base64:8]'
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          utils.resolve('src'),
          utils.resolve('test'),
          utils.resolve('node_modules/webpack-dev-server/client')
        ],
        exclude: file => (
          /node_modules/.test(file) &&
          !/\.vue\.js/.test(file)
        ),
        options: {
          cacheDirectory: true // 缓存转换结果
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          video: ['src', 'poster'],
          source: 'src',
          img: 'src',
          image: 'xlink:href'
        }
      },
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
  plugins: [
    new VueLoaderPlugin()
  ],
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
