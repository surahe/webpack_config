var path = require('path')

module.exports = {
  build: {
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/', // 静态资源公共路径，可以填CDN地址
    productionSourceMap: false,
    // 执行 `npm run build --report` 可以使用 webpack-bundle-analyzer
    bundleAnalyzerReport: process.env.npm_config_report,
    showSpeed: false,
    usePWA: false
  },
  dev: {
    useIP: false, // 是否允许服务器外部访问（PWA在开发环境只允许localhost）
    port: 8080,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false
  }
}
