var gulp        = require('gulp');
var server      = require('gulp-express');
var sourcemaps  = require('gulp-sourcemaps');
var traceur     = require('gulp-traceur');
var clean       = require('gulp-clean');
var runSequence = require('run-sequence');


var srcDirJs = 'src/**/*.js';
var distDir = 'dist/';
var srcStaticFiles = ['src/**/*.html', 'src/**/*.css'];

gulp.task('server', function () {
    server.run({
        file: distDir + 'server.js'
    });
});

gulp.task('compileJs', function () {
    return gulp.src(srcDirJs, {base: './src/'})
        .pipe(sourcemaps.init())
        .pipe(traceur())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(distDir));
});

gulp.task('moveStaticFiles', function () {
    return gulp.src(srcStaticFiles, {base: './src/'})
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(distDir));
});

gulp.task('clean', function () {
    return gulp.src(distDir+'*')
        .pipe(clean())
});

gulp.task('watch', function() {
    gulp.watch(srcDirJs, runSequence('compileJs','server'));
    gulp.watch(srcStaticFiles, runSequence('moveStaticFiles','server'));

});

gulp.task('default', runSequence('compileJs', 'moveStaticFiles', 'server', 'watch'));