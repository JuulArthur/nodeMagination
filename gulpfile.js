var gulp        = require('gulp');
var server      = require('gulp-express');
var sourcemaps  = require('gulp-sourcemaps');
var traceur     = require('gulp-traceur');
var clean       = require('gulp-clean');
var runSequence = require('run-sequence');


var srcDirBackend = 'src/backend/**/*.js';
var srcDirFrontend = 'src/public/js/**/*.js';
var distDir = 'dist/';
var srcStaticFiles = [
    'src/public/css/*',
    'src/public/views/*',
    'src/public/index.html'
];

gulp.task('server', function () {
    server.run({
        file: distDir + 'backend/server.js'
    });
});

gulp.task('compilebackend', function () {
    return gulp.src(srcDirBackend, {base: './src/'})
        .pipe(sourcemaps.init())
        .pipe(traceur())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(distDir));
});

gulp.task('compilefrontend', function () {
    return gulp.src(srcDirFrontend, {base: './src/'})
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
    gulp.watch(srcDirBackend, runSequence('compilebackend','server'));
    gulp.watch(srcDirFrontend, runSequence('compilefrontend','server'));

});

gulp.task('default', runSequence('clean','compilebackend', 'compilefrontend', 'moveStaticFiles', 'server', 'watch'));