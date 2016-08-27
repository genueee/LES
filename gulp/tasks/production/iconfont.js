var gulp = require('gulp'),
  iconfont = require('gulp-iconfont'),
  consolidate = require('gulp-consolidate'),
  config = require('../../config').iconfont.production;

gulp.task('[Production] Iconfont', function(){
  return gulp.src(config.icons.src)
    .pipe(iconfont(config.icons.options))
    .on('glyphs', function(glyphs, options){
      gulp.src(config.templates.styles.src)
        .pipe(consolidate('lodash', {
          glyphs: glyphs,
          fontName: config.icons.options.fontName,
          fontPath: config.icons.options.cssFontPath,
          className: config.templates.styles.className
        }))
        .pipe(gulp.dest(config.templates.styles.dest));
    })
    .pipe(gulp.dest(config.icons.dest));
})