const { src, dest, watch, series, parallel } = require('gulp');
const gulpSass = require('gulp-sass');
const sass = require('sass');
const browserSync = require('browser-sync').create();

const scssCompiler = gulpSass(sass);

// Compile SCSS
function scss() {
  return src('sass/main.scss')
    .pipe(scssCompiler({ outputStyle: 'expanded' }).on('error', scssCompiler.logError))
    .pipe(dest('css'))
    .pipe(browserSync.stream()); // inject CSS without full reload
}

// Start BrowserSync
function serve(done) {
  browserSync.init({
    proxy: "http://localhost:8080/luka-radenovic-bootstrapcss", 
    // OR use this if it's just static HTML:
    // server: { baseDir: "./" },
  });
  done();
}

// Watch files
function watcher() {
  watch('sass/**/*.scss', scss);
  watch('**/*.php').on('change', browserSync.reload);
  watch('**/*.html').on('change', browserSync.reload);
}

exports.default = series(
  scss,
  serve,
  watcher
);

exports.scss = scss;