var gulp = require('gulp'),
  gutil = require('gulp-util'),
  config = require('../../config').assets.local;

gulp.task('[Local] Assets', function(){
  return gulp.src(config.src)
    .on('error', gutil.log)
    .pipe(gulp.dest(config.dest));
})