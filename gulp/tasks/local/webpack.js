// Только для сборки javascript
var gulp = require('gulp'),
  gutil = require("gulp-util"),
  webpack = require('webpack'),
  config = require('../../../webpack.config.scripts.local');

gulp.task('[Local] Webpack', function(callback){
  webpack(config, function(error, stats){
    if (error) throw new gutil.PluginError('webpack', error);
    gutil.log('[webpack]', stats.toString());
    callback();
  });
})