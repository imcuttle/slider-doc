const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  context: __dirname,
  output: {
    filename: '[name].js'
  },
  entry: './src/index.tsx',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{ loader: 'ts-loader' }]
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: 'index.html'
      // filename: "index.html"
    })
  ]
}
