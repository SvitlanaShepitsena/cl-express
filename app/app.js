'use strict'
angular.module('app', ['firebase']).controller('MainCtrl', function ($scope, $firebaseObject) {
    var ref = new Firebase('https://sv-app-test.firebaseio.com/articles/-JtoFm3jopeKjIt-CrFE');

    var obj = $firebaseObject(ref);
    obj.$loaded().then(function (data) {
        console.log(data);
        $scope.article = data;
    });
})
