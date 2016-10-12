// Только для сборки javascript
var gulp = require('gulp'),
  gutil = require("gulp-util"),
  webpack = require('webpack'),
  configUncompressed = require('../../../webpack.config.scripts.local'),
  configCompressed = require('../../../webpack.config.scripts.local.min');

gulp.task('[Local] WebpackUncompressed', function(callback){
  webpack(configUncompressed, function(error, stats){
    if (error) throw new gutil.PluginError('webpack', error);
    gutil.log('[webpack]', stats.toString());
    callback();
  });
});

gulp.task('[Local] WebpackCompressed', function(callback){
  webpack(configCompressed, function(error, stats){
    if (error) throw new gutil.PluginError('webpack', error);
    gutil.log('[webpack]', stats.toString());
    callback();
  });
});

gulp.task('[Local] Webpack', ['[Local] WebpackUncompressed', '[Local] WebpackCompressed']);