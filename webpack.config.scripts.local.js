var path = require('path'),
  webpack = require('webpack');

var SRC = './app',
  BUILD = './build';

module.exports = {
  context: path.join(__dirname, SRC),

  entry: './scripts/local.js',

  output: {
    path: path.join(__dirname, BUILD),
    filename: 'js/bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel-loader'
      }
    ]
  },

  resolve: {
    modulesDirectories: ['bower_components', 'node_modules'],
    extensions: ['', '.js'],
    alias: {
      'jquery': 'jquery/dist/jquery'
    }
  }
}