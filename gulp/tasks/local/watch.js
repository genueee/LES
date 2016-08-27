var gulp = require('gulp'),
  watch = require('gulp-watch');

gulp.task('[Local] Watch', ['[Local] BrowserSync'], function(){
  watch('./app/scripts/**/*', function(){
    gulp.start(['[Local] Webpack']);
  })

  watch('./app/iconfont/icons/*.svg', function(){
    gulp.start(['[Local] Iconfont']);
  })

  watch('./app/fonts/**/*', function(){
    gulp.start(['[Local] Fonts']);
  })

  watch('./app/stylesheets/**/*', function(){
    gulp.start('[Local] Styles');
  })

  watch('./app/templates/**/*', function(){
    gulp.start(['[Local] Pug']);
  })
})