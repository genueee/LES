var gulp = require('gulp'),
  pug = require('gulp-pug'),
  inject = require('gulp-inject'),
  gutil = require('gulp-util'),
  config = require('../../config').pug.production;

gulp.task('[Production] Pug', function(){
  var sources = gulp.src(config.inject.src, {read: false});

  return gulp.src(config.src)
    .pipe(pug({
      pretty: true
    }))
    .pipe(inject(sources, config.inject.options))
    .on('error', gutil.log)
    .pipe(gulp.dest(config.dest));
})