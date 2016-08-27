var gulp = require("gulp"),
  requireDir = require('require-dir'),
  runSequence = require('run-sequence');

requireDir('./gulp/tasks', {recurse: true});

gulp.task('dist', ['[Shared] Clean'], function(cb){
  runSequence(
    [
      '[Production] Webpack',
      '[Production] Iconfont',
    ],
    [
      '[Production] Styles',
      '[Production] Fonts',
      '[Production] Assets'
    ],
    '[Production] Pug',
    cb
  );
});

gulp.task('build', ['[Shared] Clean'], function(cb){
  runSequence(
    [
      '[Local] Webpack',
      '[Local] Iconfont',
    ],
    [
      '[Local] Styles',
      '[Local] Fonts',
      '[Local] Assets'
    ],
    '[Local] Pug',
    cb
  );
});

gulp.task('deploy', ['dist'], function(){
  gulp.start('[Local] GithubPages');
});

gulp.task('server', ['[Local] SetWatch', 'build'], function(){
  gulp.start('[Local] Watch');
});

gulp.task('default', ['server']);