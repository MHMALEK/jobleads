var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var htmlReplace = require('gulp-html-replace');
var htmlMin = require('gulp-htmlmin');
var del = require('del');
var sequence = require('run-sequence');

var pathes = {
  dist: 'dist/',
  src: 'src/',
  cssin: 'src/css/**/*.css',
  jsin: 'src/js/**/*.js',
  imgin: 'src/images/**/*.{jpg,jpegs,svg}',
  fontsIn: 'src/fonts/**/*.{eot,ttf,woff}',
  htmlin: 'src/*.html',
  scssin: 'src/scss/**/*.scss',
  cssout: 'dist/css/',
  jsout: 'dist/js/',
  imgout: 'dist/images/',
  htmlout: 'dist/',
  scssout: 'src/css/',
  fontsOut: 'dist/fonts/',
  cssoutname: 'style.css',
  cssreplaceout: 'css/style.css',
  jsreplaceout: 'js/script.js'
};

gulp.task('reload', function () {
  browserSync.reload();
});

gulp.task('serve', ['sass'], function () {
  browserSync({
    server: pathes.src
  });

  gulp.watch([pathes.htmlin, pathes.jsin], ['reload']);
  gulp.watch(pathes.scssin, ['sass']);
});

gulp.task('sass', function () {
  return gulp.src(pathes.scssin)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 3 versions']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(pathes.scssout))
    .pipe(browserSync.stream());
});

gulp.task('css', function () {
  return gulp.src(pathes.cssin)
    .pipe(concat(pathes.cssoutname))
    .pipe(cleanCSS())
    .pipe(gulp.dest(pathes.cssout));
});

gulp.task('js', function () {
  return gulp.src(pathes.jsin)
    .pipe(concat("script.js"))
    .pipe(uglify())
    .pipe(gulp.dest(pathes.jsout));
});

gulp.task('fonts', function () {
  return gulp.src(pathes.fontsIn)
    .pipe(gulp.dest(pathes.fontsOut));
})

gulp.task('img', function () {
  return gulp.src(pathes.imgin)
    .pipe(imagemin())
    .pipe(gulp.dest(pathes.imgout));
});

gulp.task('html', function () {
  return gulp.src(pathes.htmlin)
    .pipe(htmlReplace({
      'css': pathes.cssreplaceout,
      'js': pathes.jsreplaceout
    }))
    .pipe(htmlMin({
      sortAttributes: true,
      sortClassName: true,
      collapseWhitespace: true
    }))
    .pipe(gulp.dest(pathes.dist))
});

gulp.task('clean', function () {
  return del([pathes.dist]);
});

gulp.task('build', function () {
  sequence('clean', ['html', 'js', 'css', 'img', 'fonts']);
});

gulp.task('default', ['serve']);