const merge = require('lodash.merge')
const webpackConfig = require('./webpack.base.config')

module.exports = [
  merge({}, webpackConfig, {
    name: '2',
    mode: 'production',
    output: {
      filename: 'slider-doc.min.js',
      libraryTarget: 'umd',
      library: 'SliderDoc',
      libraryExport: 'default'
    }
  }),
  merge({}, webpackConfig, {
    name: '1',
    mode: 'development',
    output: {
      filename: 'slider-doc.js',
      libraryTarget: 'umd',
      library: 'SliderDoc',
      libraryExport: 'default'
    }
  })
]
