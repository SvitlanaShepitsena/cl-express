var express = require('express');
var path = require('path');
/* Core node.js module to query list of images from AWS3. */
var _ =require('lodash');
var http = require('http');

var galleryRouter = express.Router();

galleryRouter.get('/:id?', function (req, res, next) {

    var userAgent = req.get('user-agent');
    if (userAgent.indexOf('facebookexternalhit') > -1) {
        //if (userAgent.indexOf('facebookexternalhit') === -1) {
        next();
    } else {
        console.log('node');
        var vm = {
            title: 'Event Gallery'
        }

        var bucketUrl = "http://s3-us-west-2.amazonaws.com/chicagoview/";

        xmlToJson(bucketUrl, function (err, data) {
            var filename='';
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

            var paramId = req.params.id;
            if (paramId) {
                vm.activeImg = paramId;
                filename = files[paramId];
                if (filename) {
                    var start = filename.indexOf('.');
                    filename = _.startCase(filename.substr(0, start));
                }
            }

            vm.og = {
                title: filename,
                img: bucketUrl + files[paramId || 0]
            }
            res.render('gallery', {vm: vm});
        });

    }
});

var appFolder = path.join(__dirname, '../app');
galleryRouter.use(express.static(appFolder));
galleryRouter.get('/:id?', function (req, res) {
    res.sendFile('index.html', {root: appFolder});
});

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

module.exports = galleryRouter;

