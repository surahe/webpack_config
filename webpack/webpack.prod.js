const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./webpack.common.js')
const utils = require('./utils')
const config = require('../config')

module.exports = merge(common, {
  mode: 'production',
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
    runtimeChunk: 'single'
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], { 
      root: path.resolve(__dirname, '..'),
      dry: false // 启用删除文件
    }),
    new ManifestPlugin(),
    new UglifyJSPlugin({
      sourceMap: true,
      parallel: true,
      cache: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new HtmlWebpackPlugin(),
    new webpack.HashedModuleIdsPlugin()
  ],
  output: {
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  }
});