var gulp = require('gulp'),
  gutil = require('gulp-util'),
  config = require('../../config').fonts.production;

gulp.task('[Production] Fonts', function(){
  return gulp.src(config.src)
    .on('error', gutil.log)
    .pipe(gulp.dest(config.dest));
})