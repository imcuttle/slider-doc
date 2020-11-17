const merge = require('lodash.merge')
const nps = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = merge({}, require('./webpack.base.config'), {
  entry: nps.join(__dirname, './src/index.tsx'),
  mode: 'development'
})

module.exports.plugins.push(
  new HTMLWebpackPlugin({
    template: 'index.html'
    // filename: "index.html"
  })
)
