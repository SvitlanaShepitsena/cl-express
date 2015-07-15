var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var bs = require('browser-sync');
var wiredep = require('wiredep').stream;
var reload = bs.reload;
var nib = require('nib');

var scripts = "app/scripts/";

var onError = function (err) {
    $.notify.onError({
        title: "Gulp",
        subtitle: "Failure!",
        message: "Error: <%= error.message %>",
        sound: "Beep"
    })(err);
    this.emit('end');
};

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
    gulp.watch(["app/scripts/**/*.styl", "app/styles/**/*.styl"], ['stylus:main']);
});

gulp.task('jade-ang-watch', ['jade-ang'], bs.reload);

gulp.task('jade-ang', function () {
    var jadeSrc = 'app/scripts/';
    return gulp.src(jadeSrc+'**/*.jade')
        .pipe($.changed(jadeSrc,{extension:'.html'}))
        .pipe($.jade())
        .pipe(gulp.dest(jadeSrc))
});



gulp.task("stylus:scripts", function () {
    return gulp.src(["app/scripts/**/*.styl"])
        .pipe($.changed(scripts, {ext: '.css'}))
        .pipe($.plumber({errorHandler: onError}))
        .pipe($.stylus({use: [nib()]}))
        .pipe(gulp.dest("./app/scripts/"))
        .pipe(reload({stream: true}));
    ;
});

gulp.task("stylus:main", ['stylus:scripts'], function () {
    return gulp.src(["app/styles/**/*.styl",])
        .pipe($.changed(scripts, {ext: '.css'}))
        .pipe($.plumber({errorHandler: onError}))
        .pipe($.stylus({use: nib()}))
        .pipe(gulp.dest("./app/styles/"))
        .pipe(reload({stream: true}));
});


gulp.task('browser-sync', ['nodemon'], function () {
    bs.init(null, {
        proxy: "http://localhost:5000",
        browser: "google chrome",
        delay: 1000,
        notify: false,
        port: 7000
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