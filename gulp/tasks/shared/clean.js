var gulp = require('gulp'),
  del = require('del'),
  config = require('../../config').clean;

gulp.task('[Shared] Clean', function(){
  return del(config.dest);
});