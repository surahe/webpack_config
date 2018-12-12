const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    vendor: './src/jquery.js',
    app: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[hash].js',
  },
  // 如何处理项目中的不同类型的模块
  module: {
    // 创建模块时，匹配请求的规则数组
    // 这些规则能够修改模块的创建方式
    // 这些规则能够对模块(module)应用 loader，或者修改解析器(parser)
    rules: [
      { test: /\.txt$/, use: 'raw-loader'},
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.scss$/, 
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'sass-loader',
            options: {
              noIeCompat: true
            }
          }
        ]
      }
    ],
    // 防止 webpack 解析那些任何与给定正则表达式相匹配的文件，忽略大型的 library 可以提高构建性能
    // content为文件绝对路径
    noParse: function(content) {
      return /jquery|lodash/.test(content);
    }
  },
  resolve: {
    // 解析模块时应该搜索的目录
    // （不适用于对 loader 解析）
    modules: [
      "node_modules",
      path.resolve(__dirname, "app")
    ],
    // 自动解析确定的扩展
    // 使用此选项，会覆盖默认数组，这就意味着 webpack 将不再尝试使用默认扩展来解析模块
    extensions: ['.wasm', '.mjs', '.js', '.json'],
    // 当从 npm 包中导入模块时，决定在 package.json 中使用哪个字段导入模块
    // 当 target 属性设置为 webworker, web 或者没有指定，默认值为
    mainFields: ['browser', 'module', 'main'],
    // 创建 import 或 require 的别名
    alias: {
      // 模块别名列表
      "module": "new-module",
      // 起别名："module" -> "new-module" 和 "module/path/file" -> "new-module/path/file"
      "only-module$": "new-module",
      // 起别名 "only-module" -> "new-module"，但不匹配 "only-module/path/file" -> "new-module/path/file"
      "module": path.resolve(__dirname, "app/third/module.js"),
      // 起别名 "module" -> "./app/third/module.js" 和 "module/file" 会导致错误
      // 模块别名相对于当前上下文导入
    }
  },
  // 此选项控制是否生成，以及如何生成 source map
  // 使用 SourceMapDevToolPlugin 进行更细粒度的配置
  devtool: "eval-source-map", // 将 SourceMap 嵌入到每个模块中
  optimization: {
    // 是否使用UglifyjsWebpackPlugin压缩包
    // production模式下为true
    minimize: false,
    // 提供一个或多个自定义的UglifyjsWebpackPlugin实例来覆盖默认压缩库
    minimizer: [
      new UglifyJsPlugin({ /* your config */ })
    ],
    // 默认情况下，webpack v4 +为动态导入的模块提供了开箱即用的新common chunks 策略
    // webpack将根据以下条件自动拆分块：
    // 1、可以共享新块或来自node_modules文件夹的模块
    // 2、新块将大于30kb（在min + gz之前）
    // 3、根据需要加载块时的最大并行请求数将小于或等于5
    // 4、初始页面加载时的最大并行请求数将小于或等于3
    // 当试图满足最后两个条件时，首选更大的块。
    splitChunks: {
      chunks: 'async', // 这表示将选择哪些块进行优化。 如果提供了字符串，则可能的值为all，async和initial。 提供all可以特别强大，因为这意味着即使在异步和非异步块之间也可以共享块。
      minSize: 30000, // 最小尺寸
      minChunks: 1, // 最小chunks
      maxAsyncRequests: 5, // 最大异步请求chunks
      maxInitialRequests: 3, // 最大初始化chunks
      automaticNameDelimiter: '~', // 默认情况下，webpack将使用块的名称和名称生成名称（例如vendors~main.js）。 此选项允许您指定用于生成的名称的分隔符。
      name: true, // 拆分块的名称。 提供true将自动生成基于块和缓存组密钥的名称。 提供字符串或函数将允许您使用自定义名称。 如果名称与入口点名称匹配，则将删除入口点。
      /**
       * cacheGroups
       * 可以从splitChunks.*继承和/或覆盖任何选项; 但是test，priority和reuseExistingChunk只能在cacheGroups级别配置。 要禁用任何默认缓存组，请将它们设置为false。
       * 
       * priority：模块可以属于多个缓存组。 优化将优先选择具有更高优先级的缓存组。 默认组具有负数值优先级，以允许自定义组获得更高的优先级（自定义组的默认值为0）。
       * reuseExistingChunk：如果当前块包含已从主bundle拆分的模块，则将重用它而不是生成新的块。 这可能会影响块的结果文件名。
       * test：控制此缓存组选择的模块。它可以匹配绝对模块资源路径或块名称。匹配块名称时，将选择块中的所有模块。
       */
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    // 将optimization.runtimeChunk设置为true会为仅包含runtime时的每个入口点添加一个额外的块。 可以通过提供字符串值来使用插件的预设模式：
    //  single：创建要为所有生成的块共享的运行时文件。
    //  multiple：为公共块创建多个运行时文件。
    // 通过将optimization.runtimeChunk设置为object，只能提供name属性，该属性代表运行时块的名称或名称工厂。
    // 默认值为false：每个条目chunk嵌入runtime。
    runtimeChunk: {
      name: entrypoint => `runtimechunk~${entrypoint.name}`
    },
    noEmitOnErrors: true,
    // 告诉webpack使用可读模块标识符以获得更好的调试。 如果未在webpack配置中设置optimization.namedModules，则webpack将默认在开发模式使用并在生产模式禁用
    namedModules: false,
    // 告诉webpack使用可读的块标识符以获得更好的调试。 如果webpack配置中未提供任何选项，则此选项在开发模式时默认启用，在生产模式时禁用。
    namedChunks: false,
    // 告诉webpack将process.env.NODE_ENV设置为给定的字符串值。 
    // optimization.nodeEnv使用DefinePlugin，除非设置为false。 
    // 可能的值：
    // 任何字符串：将process.env.NODE_ENV设置为的值。
    // false：不修改/设置process.env.NODE_ENV的值。
    nodeEnv: 'production',
    // 设置为true时告诉webpack通过将导入更改为更短的字符串来减小WASM的大小。 它会破坏模块和导出名称。
    mangleWasmImports: false,
    // 当模块已包含在所有父项中时，告诉webpack检测并从块中删除这些模块。 将optimization.removeAvailableModules设置为false将禁用此优化。
    removeAvailableModules : true,
    // 告诉webpack检测并删除空的块。 将optimization.removeEmptyChunks设置为false将禁用此优化。
    removeEmptyChunks: true,
    // 告诉webpack合并包含相同模块的块。 将optimization.mergeDuplicateChunks设置为false将禁用此优化。
    mergeDuplicateChunks: true,
    // 告诉webpack确定并标记作为其他块的子集的块，其方式是当已经加载较大的块时不必加载子集。
    // 默认情况下，optimization.flagIncludedChunks在生产模式下启用，否则禁用。
    flagIncludedChunks: false
  },
  // 告知 webpack 为目标(target)指定一个环境。
  target: 'web',
  // 启用 Watch 模式。这意味着在初始构建之后，webpack 将继续监听任何已解析文件的更改。Watch 模式默认关闭。
  // webpack-dev-server 和 webpack-dev-middleware 里 Watch 模式默认开启。
  watch: false,
  watchOptions: {
    aggregateTimeout: 300, // 当第一个文件更改，会在重新构建前增加延迟。这个选项允许 webpack 将这段时间内进行的任何其他更改都聚合到一次重新构建里。以毫秒为单位
    poll: 1000, // 通过传递 true 开启 polling，或者指定毫秒为单位进行轮询。
    ignored: /node_modules/ // 对于某些系统，监听大量文件系统会导致大量的 CPU 或内存占用。这个选项可以排除一些巨大的文件夹，例如 node_modules
  },
  // 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖(external dependencies)。
  externals: {
    jquery: 'jQuery', // 表示应该排除 import $ from 'jquery' 中的 jquery 模块。为了替换这个模块，jQuery 的值将被用来检索一个全局的 jQuery 变量。
    lodash : { // lodash 这个外部 library 可以在 AMD 和 CommonJS 模块系统中通过 lodash 访问，但在全局变量形式下用 _ 访问
      commonjs: 'lodash',
      amd: 'lodash',
      root: '_' // 指向全局变量
    },
    subtract : { // subtract 可以通过全局 math 对象下的属性 subtract 访问（例如 window['math']['subtract']）
      root: ['math', 'subtract']
    }
  },
  // webpack-dev-server(简写为：dev-server) 行为的选项
  devServer: {
    // 启用 webpack 的模块热替换特性
    // 必须有 webpack.HotModuleReplacementPlugin 才能完全启用 HMR。
    // 如果 webpack 或 webpack-dev-server 是通过 --hot 选项启动的，那么这个插件会被自动添加，所以你可能不需要把它添加到 webpack.config.js
    hot: true,
    // 启用 open 后，dev server 会打开浏览器
    // 通过 CLI 使用 webpack-dev-server --open
    // 如果没有提供浏览器（如上所示），则将使用您的默认浏览器。要指定不同的浏览器，只需传递其名称：webpack-dev-server --open 'Google Chrome'
    open: true,
    openPage: '/different/page', // 指定打开浏览器时的导航页面。
    contentBase: path.join(__dirname, 'dist'), // 告诉服务器从哪个目录中提供内容。只有在你想要提供静态文件时才需要
    compress: true, // 服务是否启用 gzip 压缩
    // 指定要监听请求的端口号
    // 通过CLI：webpack-dev-server --port 8080
    port: 8080,
    proxy: {
      '/api': 'http://localhost:3000'
    },
    host: 'localhost',
    headers: { // 在所有响应中添加首部内容
      'X-Custom-Foo': 'bar'
    },
    // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
    // 可以传入对象进行进一步控制
    historyApiFallback: true,
  },
  // plugins 选项用于以各种方式自定义 webpack 构建过程。
  // webpack 附带了各种内置插件，可以通过 webpack.[plugin-name] 访问这些插件。
  plugins: [
    new HtmlWebpackPlugin({template: './src/intex.html'})
  ]
}