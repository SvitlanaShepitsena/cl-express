var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');


var app = express();
// Jade to Html formatting
app.locals.pretty = true;
// view engine setup
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// --- requires.routes ---
var homeRouter = require('./routes/home')(express);
var galleryRouter = require('./routes/gallery')(express);



// --- requires.routes ---

// --- Routes ---
app.use('/',homeRouter);
app.get('/events/one-event-gallery/',galleryRouter);




// --- Routes ---


if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}


app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    console.log(err.message);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(5000, function () {
    console.log('listen on port 5000');
});


module.exports = app;
