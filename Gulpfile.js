/**
 * Created by aleksandr on 11.06.2015.
 */
var browserify = require('browserify'),
    gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    gutil = require('gulp-util'),
    clean = require('gulp-clean'),
    runSequence = require('gulp-run-sequence');

//pre tasks
gulp.task('clean', function(){
    return gulp.src(['./build/src/*'], {read:false})
        .pipe(clean());
});

gulp.task('prebuild_copy_all', function() {
    console.log('prebuild_copy_all');
    return gulp.src(
        [   'src/assets/**/*',
            'src/images/**/*',
            //'node_modules/**/*',//addd if you wnat updATE NODE-MODULE
            'src/scripts/**/*.html',
            '*.html'
        ], {base:"."})
        .pipe(gulp.dest('./build/'));
});

gulp.task('browserify-game', function() {
    console.log('browserify-game start');
    return browserify('./src/scripts/ng-game.js')
        .bundle()
        .pipe(source('ng-game.js'))
        // Передаем имя файла, который получим на выходе, vinyl-source-stream

        .pipe(gulp.dest('./build/src/scripts/'));
});


//global tasks
gulp.task('build_app', function() {
    runSequence('clean', 'prebuild_copy_all', 'browserify-game');
});

gulp.task('default', ['build_app']);