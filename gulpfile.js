const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

gulp.task('sass', () =>
  gulp
    .src('client/scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: 'expanded',
      }).on('error', sass.logError)
    )
    .pipe(
      autoprefixer({
        browsers: ['> 1%', 'last 2 versions'],
      })
    )
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.stream())
);

gulp.task('build', ['sass'], () => {});

gulp.task('browser', ['build'], () => {
  browserSync.init({
    proxy: 'localhost:8080',
  });
});

gulp.task('watch', () => {
  gulp.watch(['client/scss/**/*.scss'], ['sass']);
});

gulp.task('serve', ['browser', 'watch']);
