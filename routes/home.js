var path = require('path');
var firebaseServ = require('../services/FirebaseServ');

module.exports = function homeRouter(express) {

    var homeRouter = express.Router();

    homeRouter.get('/', function (req, res, next) {

        var userAgent = req.get('user-agent');
        console.log(userAgent);

        //if (userAgent.indexOf('facebookexternalhit') > -1) {
        if (userAgent.indexOf('facebookexternalhit') === -1 && userAgent.indexOf('Trident') === -1 ) {
            next();

        } else {
            /*create a view-model for fb crawler*/

            var rootUrl = (req.protocol || 'http') + '://' + req.get('host');
            console.log(rootUrl);
            var vm = {
                rootUrl:rootUrl,
                title: 'Home page title',
                og: {
                    description: 'Our Company provides great services for your business'
                }
            };


            var postsUrl = 'https://sv-app-test.firebaseio.com/posts';
            firebaseServ.getAll(postsUrl).then(function (data) {
                vm.posts = data;
                res.render('home', {vm: vm});
            }, function (Error) {
                console.log(Error.message);
            });
        }
    });

    /*Redirect user to AngularJs App*/
    var appFolder = path.join(__dirname, '../app');
    homeRouter.use(express.static(appFolder));

    homeRouter.get('/', function (req, res) {
        res.sendFile('index.html', {root: appFolder});
    });
    return homeRouter;

};
