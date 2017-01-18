var gulp = require('gulp');
var sass = require('gulp-sass');
var pleeease = require('gulp-pleeease');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var plumber = require("gulp-plumber");
var cmq = require('gulp-combine-media-queries');
var csscomb = require('gulp-csscomb');

// Sass
gulp.task('sass', function () {
    gulp.src('sass/**/*.scss')
        .pipe(sass({
          outputStyle: 'expanded'
        }).on('error', sass.logError)) // Keep running gulp even though occurred compile error
        .pipe(pleeease({
            autoprefixer: { browsers: ['last 2 versions'] },
            minifier: false
        }))
        .pipe(gulp.dest('build/css'))
        .pipe(reload({stream:true}));
});

// Combine media queries
gulp.task('cmq', function () {
  gulp.src('build/css/*.css')
    .pipe(cmq({
      log: true
    }))
    .pipe(csscomb())
    .pipe(gulp.dest('build/css'));
});

// Js-concat-uglify
gulp.task('js', function() {
    gulp.src(['js/*.js'])
        .pipe(concat('scripts.js'))
        .pipe(uglify({preserveComments: 'some'})) // Keep some comments
        .pipe(gulp.dest('build/js'))
        .pipe(reload({stream:true}));
});

// Static server
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "build/", //　Target directory
            index  : "index.html" // index file
        }
    });
});

// Reload all browsers
gulp.task('bs-reload', function () {
    browserSync.reload();
});


// Task for `gulp` command
gulp.task('default',['browser-sync'], function() {
    gulp.watch('sass/**/*.scss',['sass']);
    gulp.watch('js/*.js',['js']);
    gulp.watch("./*.html", ['bs-reload']);
});
