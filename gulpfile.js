var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var bs = require('browser-sync');
var affected = require('gulp-jade-find-affected');
var wiredep = require('wiredep').stream;
var reload = bs.reload;




gulp.task('serve', ['browser-sync'], function () {

    bs.watch('routes/**/*.js').on('change', function () {
        setTimeout(function reload() {
            bs.reload({
                stream: false   //
            });
        }, 500);
    });
    bs.watch('views/**/*.jade').on('change', function () {
        setTimeout(function reload() {
            bs.reload({
                stream: false   //
            });
        }, 500);
    });
    gulp.watch('app/scripts/**/*.jade', ['jade-ang-watch']);
});

gulp.task('jade-ang-watch', ['jade-ang'], bs.reload);

gulp.task('jade-ang', function () {
    var jadeSrc = 'app/scripts/';
    return gulp.src(jadeSrc+'**/*.jade')
        .pipe($.changed(jadeSrc,{extension:'.html'}))
        .pipe($.jade())
        .pipe(gulp.dest(jadeSrc))
});

gulp.task('browser-sync', ['nodemon'], function () {
    bs.init(null, {
        proxy: "http://localhost:5000",
        browser: "google chrome",
        delay: 1000,
        notify: false,
        port: 7000,
    });
});

gulp.task('nodemon', function (cb) {

    var started = false;

    return $.nodemon({
        script: 'server.js'
    }).on('start', function () {
        if (!started) {
            cb();
            started = true;
        }
    }, bs.reload)
        .on('restart', function onRestart() {
            // reload connected browsers after a slight delay
            setTimeout(function reload() {
                bs.reload({
                    stream: false   //
                });
            }, 500);
        });
    ;
});

gulp.task('bower', function () {
    gulp.src('./app/index.html')
        .pipe(wiredep({
            optional: 'configuration',
            goes: 'here'
        }))
        .pipe(gulp.dest('./app'));
});