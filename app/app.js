'use strict'
angular.module('app', ['firebase','ngSanitize']).controller('MainCtrl', function ($scope, $firebaseObject) {
    var ref = new Firebase('https://sv-app-test.firebaseio.com/articles/-JrncbQ7s8q8Em6-myq-');

    var obj = $firebaseObject(ref);
    obj.$loaded().then(function (data) {
        $scope.article = data;
    });
})
