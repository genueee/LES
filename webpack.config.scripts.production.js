var path = require('path'),
  webpack = require('webpack');

var SRC = './app',
  DIST = './dist';

module.exports = {
  context: path.join(__dirname, SRC),

  entry: './scripts/production.js',

  output: {
    path: path.join(__dirname, DIST),
    filename: 'js/bundle.min.js'
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
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
}