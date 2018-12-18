process.env.NODE_ENV = 'production'

const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin")
const WorkboxPlugin = require('workbox-webpack-plugin')
const smp = new SpeedMeasurePlugin()
const common = require('./webpack.common.js')
const utils = require('./utils')
const config = require('../config')

var webpackConfig = merge(common, {
  mode: 'production',
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        // styles: {
        //   name: 'styles',
        //   test: /\.scss|css$/,
        //   chunks: 'all',
        //   enforce: true,
        // },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true 
      }),
      new OptimizeCSSPlugin({})
    ],
    /*
     * webpack 就会把 chunk 文件名全部存到一个单独的 chunk 中，
     * 这样更新一个文件只会影响到它所在的 chunk 和 runtimeChunk，避免了引用这个 chunk 的文件也发生改变
     */
    runtimeChunk: 'single'
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], { 
      root: path.resolve(__dirname, '..'),
      dry: false // 启用删除文件
    }),
    new ManifestPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: utils.resolve('src/index.html'),
      inject: true
    }),
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      chunkFilename: utils.assetsPath('css/[id].[contenthash].css')
    }),
    /*
      使用文件路径的 hash 作为 moduleId。
      虽然我们使用 [chunkhash] 作为 chunk 的输出名，但仍然不够。
      因为 chunk 内部的每个 module 都有一个 id，webpack 默认使用递增的数字作为 moduleId。
      如果引入了一个新文件或删掉一个文件，可能会导致其他文件的 moduleId 也发生改变，
      那么受影响的 module 所在的 chunk 的 [chunkhash] 就会发生改变，导致缓存失效。
      因此使用文件路径的 hash 作为 moduleId 来避免这个问题。
    */
    new webpack.HashedModuleIdsPlugin(),
    new CopyWebpackPlugin([
      {
        from: utils.resolve(config.build.assetsSubDirectory),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    new WorkboxPlugin.GenerateSW({
      // 这些选项帮助 ServiceWorkers 快速启用
      // 不允许遗留任何“旧的” ServiceWorkers
      clientsClaim: true,
      skipWaiting: true
    })
  ],
  output: {
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  }
});

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = smp.wrap(webpackConfig)