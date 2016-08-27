var gulp = require('gulp'),
  gutil = require('gulp-util'),
  config = require('../../config').fonts.local;

gulp.task('[Local] Fonts', function(){
  return gulp.src(config.src)
    .on('error', gutil.log)
    .pipe(gulp.dest(config.dest));
})