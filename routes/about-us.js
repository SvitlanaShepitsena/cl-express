var path = require('path');

module.exports = function aboutUs(express) {

    var aboutUsRouter = express.Router();

    aboutUsRouter.get('/', function (req, res, next) {

        var userAgent = req.get('user-agent');

        //if (userAgent.indexOf('facebookexternalhit') > -1) {
        if (userAgent.indexOf('facebookexternalhit') === -1 && userAgent.indexOf('Trident') === -1) {
            next();

        } else {

            var rootUrl = (req.protocol || 'http') + '://' + req.get('host');
            console.log(rootUrl);
            /*create a view-model for fb crawler*/
            var vm = {
                rootUrl:rootUrl,
                title: 'About us Page Title',
                og: {
                    title: 'About us',
                    description: 'Info about us'
                }
            };

            res.render('about-us', {vm: vm});
        }
    });

    /*Redirect user to AngularJs App*/
    var appFolder = path.join(__dirname, '../app');
    aboutUsRouter.use(express.static(appFolder));

    aboutUsRouter.get('/', function (req, res) {
        res.sendFile('index.html', {root: appFolder});
    });
    return aboutUsRouter;

};
