var gulp = require('gulp'),
  gutil = require('gulp-util'),
  config = require('../../config').assets.production;

gulp.task('[Production] Assets', function(){
  return gulp.src(config.src)
    .on('error', gutil.log)
    .pipe(gulp.dest(config.dest));
})