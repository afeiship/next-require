(function () {
  'use strict';

  const gulp = require('gulp');
  const saveLicense = require('uglify-save-license');
  const $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*', 'del', '@jswork/gulp-*']
  });

  gulp.task('scripts:main', function () {
    return (
      gulp
        .src('src/*.js')
        .pipe($.insert.wrap(`(function () {`, '})();'))
        .pipe($.prettier())
        // .pipe($.babel())
        .pipe($.jswork.pkgHeader())
        .pipe(gulp.dest('dist'))
        .pipe($.size({ title: '[ default size ]:' }))
        .pipe($.uglify({ output: { comments: saveLicense } }))
    );
  });

  gulp.task('scripts:esm', () => {
    return gulp
      .src('src/*.js')
      .pipe($.jswork.pkgHeader())
      .pipe($.replace('global || this || window', 'global || this'))
      .pipe($.replace(/if \(typeof module !== 'undefined' && module\.exports.*\s+.*\s+}/, 'export default nx.require;'))
      .pipe($.rename({ extname: '.esm.js' }))
      .pipe(gulp.dest('dist'));
  });

  gulp.task('scripts', gulp.series('scripts:main', 'scripts:esm'));
})();
