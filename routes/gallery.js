var express = require('express');
var router = express.Router();
var parseString = require('xml2js').parseString;
var Firebase = require("firebase");


router.get('/events/one-event-gallery', function (req, res, next) {
    res.sendFile('index.html', {root: __dirname + '/app'});
});

// catch 404 and forward to error handler
router.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

router.get('/events/one-event-gallery', function (req, res, next) {

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
            vm.og = {
                title: 'Album Name',
                img: bucketUrl + files[0]
            }
            res.render('gallery', {vm: vm})
        });

    }
})

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

module.exports = router;
