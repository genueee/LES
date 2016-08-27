var gulp = require('gulp'),
  githubPages = require('gulp-gh-pages'),
  config = require('../../config').githubPages.local;

gulp.task('[Local] GithubPages', function(){
  return gulp.src(config.src)
    .pipe(githubPages(config.options));
})