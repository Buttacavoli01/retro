const gulp = require('gulp');
const terser = require('gulp-terser');
const concat = require('gulp-concat');
const less = require('gulp-less');
const imagemin = require('gulp-imagemin');
const minifyCSS = require('gulp-cssnano');
const prefix = require('gulp-autoprefixer');
const del = require('del');
const browserSync = require('browser-sync').create();

gulp.task('clean', function() {
  return del(['docs/styles/*.css', 'docs/scripts/*.js',
              '!docs/scripts/resources.js', '!docs/scripts/engine.js']);
});

gulp.task('scripts', function() {
  return gulp.src(['app/scripts/vendor/*.js', 'app/scripts/*.js',
                   '!docs/scripts/resources.js', '!docs/scripts/engine.js'])
    .pipe(terser())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest('docs/scripts'));
});

gulp.task('styles', function(done) {
  return gulp.src('app/styles/less/*.less')
    .pipe(less())
    .pipe(prefix())
    .pipe(minifyCSS())
    .pipe(gulp.dest('docs/styles'))
    .pipe(browserSync.stream());
});


gulp.task('serve', gulp.series('styles', function() {
  browserSync.init({
    server: ['docs'],
    port: 3000
  });
  gulp.watch('app/styles/less/*.less', gulp.series('styles'));
  gulp.watch(['app/scripts/*.js', '!app/vendor/*.js'], gulp.series('scripts'));
//  gulp.watch('docs/*.*').on('change', browserSync.reload);
}));

gulp.task('imgMin', function() {
  return gulp.src('app/img/*.*')
    .pipe(imagemin())
    .pipe(gulp.dest('docs/img'));
});

gulp.task('default',
  gulp.series('clean',
    gulp.parallel('styles', 'scripts', 'imgMin'),
    'serve',
    function watcher(done) {
      gulp.watch(
        ['app/scripts/*.js', '!app/vendor/*.js'],
        gulp.parallel('scripts')
      );
      gulp.watch(
        'docs/**/**',
        browserSync.reload()
      );
      done();
    }
  )
);
