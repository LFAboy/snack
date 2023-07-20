const path = require('path');
const copyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  // 当设置为 开发模式时，打包的代码就是经过打包和压缩后的代码，可读性非常差，所以我们一般如果要查看只是经过打包后的代码的话，
  // 可以设置为 生产模式
  mode: "development",
  // mode: "production",
  entry: "./src/main.ts",
  output: {
    // __dirname 是 node.js 的变量，值是 当前文件的文件夹目录（绝对目录），path 是我们设置的打包后的文件存放的目录，这个值要求是一个
    // 绝对路径。
    path: path.resolve(__dirname, 'dist'),
    filename: "main.js",
    // 在打包前自动清理打包目录。
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.ts$/i,
        exclude: /(node_modules|bower_components)/,
        use: [
          // 对于 TS 文件应该先经过 编译成 JS 代码然后经过 babel转译成 低版本的 JS 代码
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
              ]
            }
          },
          "ts-loader"
        ]
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          "style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.(png | ico | jpg | gif)$/i,
        type: "asset/resource"
      }
    ]
  },
  plugins: [
    new copyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'public'), to: path.resolve(__dirname, 'dist') },
      ],
    })
  ],
  resolve: {
    // 这个选项是 尝试按照顺序添加后缀名解析 文件
    extensions: ['.js', '.json', '.wasm', '.ts'],
    // 下面的配置是配置 ts 中的 路径路径别名，配置这个选项前还需要配置 tsconfig.json 文件
    alias: {
      '@': path.resolve(__dirname, "src/") //src文件夹路径
    },
  },
  devtool: "inline-source-map"
}