const merge = require('lodash.merge')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = merge({}, require('./webpack.base.config'), {
  mode: 'development'
})

module.exports.plugins.push(
  new HTMLWebpackPlugin({
    template: 'index.html'
    // filename: "index.html"
  })
)
