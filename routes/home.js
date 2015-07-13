var path = require('path');
var Firebase = require('firebase');

module.exports = function homeRouter(express) {

    var homeRouter = express.Router();

    homeRouter.get('/', function (req, res, next) {

        var userAgent = req.get('user-agent');
        console.log(userAgent);

        //if (userAgent.indexOf('facebookexternalhit') > -1) {
        if (userAgent.indexOf('facebookexternalhit') === -1) {
            next();

        } else {
            var vm = {
                title: 'Home page title',
                //og:{
                //    title: 'OG'
                //}
            };

            var ref = new Firebase('https://sv-app-test.firebaseio.com')
            ref.child("posts").on("value", function (snapshot) {
                var posts = snapshot.val();
                vm.posts = posts;

                res.render('home', {vm: vm});
            });
        }
    });

    var appFolder = path.join(__dirname, '../app');

    homeRouter.use(express.static(appFolder));

    homeRouter.get('/', function (req, res) {
        res.sendFile('index.html', {root: appFolder});
    });
    return homeRouter;

};
