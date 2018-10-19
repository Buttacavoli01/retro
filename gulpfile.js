const gulp = require('gulp'),
      autoprefixer = require('gulp-autoprefixer'),
      sass = require('gulp-sass'),
      browserSync = require('browser-sync').create(),
      minify = require('gulp-minify');

gulp.task('autoprefix', () =>
    gulp.src('app/css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('css'))
);

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: './app'
        }
    });
});

gulp.task('serve', ['sass'], () => {

    browserSync.init({
        server: './app/'
    });

    gulp.watch('app/css/*.css', ['sass']);
    gulp.watch('app/js/*.js');
    gulp.watch('app/*.html').on('change', browserSync.reload);
});

gulp.task('compress', () => {
  gulp.src(['app/js/*.js', 'app/lib/*.mjs'])
    .pipe(minify())
    .pipe(gulp.dest('dist'));
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', () => {
    return gulp.src('app/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
