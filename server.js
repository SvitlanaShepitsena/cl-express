var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var Firebase = require("firebase");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

var expRouter = express.Router();

app.use('/', expRouter);

expRouter.get('/', function (req, res, next) {

    var userAgent = req.get('user-agent');
    console.log(userAgent);

    if (userAgent.indexOf('facebookexternalhit') !== -1) {
    //if (userAgent.indexOf('facebookexternalhit') === -1) {
        res.redirect('/home');

    } else {
        console.log('node');
        var vm = {
            title: 'Home page title'
        }

        var ref = new Firebase('https://sv-app-test.firebaseio.com')
        ref.child("posts").on("value", function (snapshot) {
            var posts = snapshot.val();
            vm.posts=posts;
            res.render('home.jade', {vm:vm});
        });
    }
});
expRouter.use(express.static(__dirname + '/app'));
expRouter.get('/home', function (req, res, next) {
    res.sendFile('index.html', {root: __dirname + '/app'});
});

// catch 404 and forward to error handler
expRouter.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
expRouter.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(5000, function () {
    console.log('listen on port 5000');
});

module.exports = app;
//var ref = new Firebase('https://sv-app-test.firebaseio.com/agent');
//ref.set({
//    agent:userAgent
//});
//
//res.send(userAgent);
