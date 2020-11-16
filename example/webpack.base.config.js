const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const nps = require('path')

module.exports = {
  devtool: false,
  context: __dirname,
  output: {
    filename: '[name].js',
    path: nps.join(__dirname, '../dist')
  },
  entry: nps.join(__dirname, '../src/index.ts'),
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
        use: [MiniCssExtractPlugin.loader, { loader: 'css-loader' }]
      },
      {
        test: /\.(eot|ttf|woff)$/,
        use: [{ loader: 'url-loader' }]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })
  ]
}
