const gulp = require('gulp');
const terser = require('gulp-terser');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
//const less = require('gulp-less');
const imagemin = require('gulp-imagemin');
const minifyCSS = require('gulp-cssnano');
const prefix = require('gulp-autoprefixer');
const del = require('del');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const paths = {
  styles: {
    src: 'app/src/styles/**/*.sass',
    dest: 'app/dist/styles/'
  },
  scripts: {
    src: 'app/src/scripts/**/*.js',
    dest: 'app/dist/scripts/'
  },
  images: {
    src: 'app/src/assets/images/*.*',
    dest: 'app/dist/assets/images/'
  },
  views: {
    src: 'app/src/views/index.pug',
    dest: 'app/dist/',
    rest: 'app/src/views/*.pug'
  }
};

const cleanArry = [
  paths.styles.dest,
  paths.scripts.dest,
  paths.images.dest,

];

const folders = [
  'app',
  'app/dist',
  'app/src',
  'src/assets',
  'src/assets/fonts',
  'src/assets/images',
  'src/styles',
  'src/scripts',
  'src/views'
];

gulp.task('mkdir' , function() {
  return gulp.src('*.*', {read: false})
    .pipe(gulp.dest("./app"))
    .pipe(gulp.dest("app/dist"))
    .pipe(gulp.dest("app/src"))
    .pipe(gulp.dest('app/src'))
    .pipe(gulp.dest('app/src/assets'))
    .pipe(gulp.dest('app/src/assets/fonts'))
    .pipe(gulp.dest('app/src/assets/images'))
    .pipe(gulp.dest('app/src/styles'))
    .pipe(gulp.dest('app/src/scripts'))
    .pipe(gulp.dest('app/src/views'))
    .pipe(gulp.dest('app/vendor'))
    .pipe(gulp.dest('app/vendor/scripts'))
    .pipe(gulp.dest('app/vendor/styles'));
});

gulp.task('clean', function() {
  return del(cleanArry);
});

gulp.task('views', function() {
  return gulp.src(paths.views.src)
    .pipe(pug({
      doctype: 'html',
      filename: 'index.html'
      //,pretty: true
    }))
    .pipe(gulp.dest("app/"));
});

gulp.task('scripts', function() {
  return gulp.src(paths.scripts.src)
    .pipe(terser())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.scripts.dest));
});

gulp.task('styles', function(done) {
  return gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(prefix())
    .pipe(concat('main.min.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
});


gulp.task('serve', gulp.series('styles', function() {
  browserSync.init({
    server: {
      baseDir: 'app',
      index: 'index.html'
    },
    port: 3000
  });
  gulp.watch(paths.styles.src, gulp.series('styles'));
  gulp.watch(paths.scripts.src, gulp.series('scripts'));
  gulp.watch(paths.views.rest, gulp.series('views'));
  gulp.watch('app/dist/*').on('change', browserSync.reload);
}));

gulp.task('imgMin', function() {
  return gulp.src(paths.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest));
});

gulp.task('run', gulp.series('clean',
  gulp.parallel('styles', 'scripts', 'imgMin', 'views'),
  'serve',
  function watcher(done) {
    gulp.watch(paths.scripts.src,
      gulp.parallel('scripts')
    );
    gulp.watch(
      'app/dist/',
      browserSync.reload()
    );
    done();
  }
));
