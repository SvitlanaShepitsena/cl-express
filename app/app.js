'use strict'
angular.module('app', ['firebase','ngSanitize']).controller('MainCtrl', function ($scope, $firebaseObject) {
    var ref = new Firebase('https://sv-app-test.firebaseio.com/articles/-JsRqcUVbvFCNBI7Dr3Q');

    var obj = $firebaseObject(ref);
    obj.$loaded().then(function (data) {
        $scope.article = data;
    });
})
