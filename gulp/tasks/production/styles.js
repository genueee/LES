var gulp = require('gulp'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  cleanCSS = require('gulp-clean-css'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  gutil = require('gulp-util'),
  config = require('../../config').styles.production;

gulp.task('[Production] Styles', function(){
  return gulp.src(config.sass.src)
    .on('error', gutil.log)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ browsers: ['ie >= 8', 'last 8 versions', '> 1%'] }))
    .pipe(cleanCSS())
    .pipe(rename(config.sass.outputName))
    .pipe(gulp.dest(config.sass.dest));
});