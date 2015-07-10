var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var parseString = require('xml2js').parseString;
var http = require('http');

var Firebase = require("firebase");

var app = express();

app.locals.pretty = true;
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

expRouter.use(express.static(__dirname + '/'));
expRouter.get('/', function (req, res, next) {

    var userAgent = req.get('user-agent');
    console.log(userAgent);

    //if (userAgent.indexOf('facebookexternalhit') !== -1) {
    if (userAgent.indexOf('facebookexternalhit') === -1) {
        res.redirect('/home');

    } else {
        console.log('node');
        var vm = {
            title: 'Home page title'
        }

        var ref = new Firebase('https://sv-app-test.firebaseio.com')
        ref.child("posts").on("value", function (snapshot) {
            var posts = snapshot.val();
            vm.posts = posts;
            res.render('home.jade', {vm: vm});
        });
    }
});
expRouter.get('/events/one-event-gallery', function (req, res, next) {

    var userAgent = req.get('user-agent');
    console.log(userAgent);

    //if (userAgent.indexOf('facebookexternalhit') !== -1) {
    if (userAgent.indexOf('facebookexternalhit') === -1) {
        //res.redirect('/events/one-event-gallery');
        next();
    } else {
        console.log('node');
        var vm = {
            title: 'Event Gallery'
        }

        var bucketUrl = "http://s3-us-west-2.amazonaws.com/chicagoview/";

        xmlToJson(bucketUrl, function (err, data) {
            if (err) {
                // Handle this however you like
                return console.err(err);
            }
            var myRegexp = /<key>([^<])+/gi;
            var match;
            var files = [];

            var myString = data;
            match = myRegexp.exec(myString);
            while (match !== null) {
                if (match) {

                    var fileName = match[0].replace('<Key>', '');
                    files.push(fileName);
                }
                match = myRegexp.exec(myString);
            }
            vm.files = files;
            res.render('gallery', {vm: vm})
        });

        //http.get(bucketUrl, function (res) {
        //    console.log("Got response: " + res.statusCode);
        //
        //    var myRegexp = /<key>([^<])+/gi;
        //    var match;
        //    var files = [];
        //
        //    var myString = res;
        //    match = myRegexp.exec(myString);
        //    while (match !== null) {
        //        if (match) {
        //
        //            var fileName = match[0].replace('<Key>', '');
        //            files.push(fileName);
        //        }
        //        match = myRegexp.exec(myString);
        //    }
        //    var b = 1;
        //    var breakPoint = 1;
        //
        //}).on('error', function (e) {
        //    console.log("Got error: " + e.message);
        //});
    }
});

expRouter.use(express.static(__dirname + '/app'));
expRouter.get('/home', function (req, res, next) {
    res.sendFile('index.html', {root: __dirname + '/app'});
});

expRouter.get('/events/one-event-gallery', function (req, res, next) {
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
function xmlToJson(url, callback) {
    var req = http.get(url, function (res) {
        var xml = '';

        res.on('data', function (chunk) {
            xml += chunk;
        });

        res.on('error', function (e) {
            callback(e, null);
        });

        res.on('timeout', function (e) {
            callback(e, null);
        });

        res.on('end', function () {
            //console.log(xml);
            callback(null, xml);
        });
    });
}