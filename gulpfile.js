var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var htmlreplace = require('gulp-html-replace');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var htmlmin = require('gulp-htmlmin');
var minifyCSS = require('gulp-minify-css');
var cssnano = require('gulp-cssnano');
var del = require('del');
var uncss = require('uncss');
var autoprefixer = require('autoprefixer');
var rev = require('gulp-rev');
var gulpSequence = require('gulp-sequence');
var cached = require('gulp-cached');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var postcss = require('gulp-postcss');
var cssgrace = require('cssgrace');

var processors = [
    autoprefixer({
      browsers: ['>1%', 'last 2 versior', 'ie 6-11']
    }),
    cssgrace
];


gulp.task('postcss', function(){
    return gulp.src(['', ''])
    .pipe(postcss(processors))
    .pipe(gulp.dest(''));

});

gulp.task('useref&if', function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('dist'));
});
gulp.task('useref', function(){
    return gulp.src('src/tpl/*.html')
    .pipe(useref())
    .pipe(gulp.dest('dist/static'));
});
gulp.task('cssmin', function(){
    return gulp.src('dist/static/css/*.css')
    .pipe(cssnano())
    .pipe(gulp.dest('dist'));
});

gulp.task('sass', function () {
  return gulp.src('src/sass/*.scss')
  .pipe(sass({
    outputStyle: 'compressed'  // 此配置使文件编译并输出压缩过的文件
  }))
  .pipe(gulp.dest('dist/static/css'))
})

gulp.task('js', function () {
  return gulp.src('src/js/*.js')
  .pipe(gulp.dest('dist/static/js'))
})

gulp.task('html', function(){
    return gulp.src('src/tpl/*.html')
    .pipe(gulp.dest('dist'))
});

gulp.task('htmlreplace', function(){
    return gulp.src('src/tpl/*.html')
    .pipe(htmlreplace({
      js: {
      src: 'adir',
      tpl: '<script src="%s/%f.min.js"></script>'
    },
     css: 'default.min.css'
    }))
    .pipe(gulp.dest('dist/'))
});
gulp.task('html:dev', function(){
    return gulp.src('src/tpl/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(reload({stream:true}))
});
gulp.task('js:dev', function(){
    return gulp.src('src/js/*.js')
    .pipe(gulp.dest('dist/static/js'))
    .pipe(reload({stream:true}))
});
gulp.task('sass:dev', function(){
    return gulp.src('src/sass/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/static/css'))
    .pipe(reload({stream:true}))
});
gulp.task('dev', ['js:dev', 'html:dev', 'sass:dev'], function(){
    browserSync.init({
      server: {
        baseDir: "./dist",
      },
      port: 4000,
      notify: false
    });
    gulp.watch('src/js/*.js', ['js:dev']);
    gulp.watch('src/sass/*.scss', ['sass:dev']);
    gulp.watch('src/js/*.js', ['js:dev']);
    gulp.watch('dist/*.html').on('change', reload);
});
gulp.task('build', ['sass', 'js', 'html'])

