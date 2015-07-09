var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var bs = require('browser-sync');
var reload = bs.reload;



gulp.task('serve', ['browser-sync', 'jade'], function () {
    gulp.watch('views/**/*.jade', gulp.run('jade'));
    gulp.watch('views/**/*.html').on('change', bs.reload);

    bs.watch('routes/**/*.js').on('change', function () {
        setTimeout(function reload() {
            bs.reload({
                stream: false   //
            });
        }, 500);
    });
});

gulp.task('jade', function () {
    return gulp.src('views/**/*.jade')
        .pipe($.jade({
            pretty: true
        }))
        .pipe(gulp.dest('views/'))
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
        script: 'app.js'
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
