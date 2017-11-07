/* eslint-disable import/no-extraneous-dependencies */
const gulp = require('gulp');
const htmlhint = require('gulp-htmlhint');


gulp.task('lint-html', () => {
  gulp.src(['**/*.html', '!node_modules/**/*.html'])
    .pipe(htmlhint('.htmlhintrc'))
    .pipe(htmlhint.reporter());
});
