const merge = require('lodash.merge')
const webpackConfig = require('./webpack.config')

module.exports = [
  merge({}, webpackConfig, {
    name: '1',
    mode: 'development',
    output: {
      filename: 'doc-slider.js',
      libraryTarget: 'umd',
      library: 'DocSlider'
    }
  }),
  merge({}, webpackConfig, {
    name: '2',
    mode: 'production',
    output: {
      filename: 'doc-slider.min.js',
      libraryTarget: 'umd',
      library: 'DocSlider'
    }
  })
]
