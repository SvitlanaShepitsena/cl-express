(function () {
    'use strict';

    angular.module('events')
        .controller('One-event-galleryCtrl', function ($scope, $stateParams) {
            $scope.activeImg = $stateParams.id;
            console.log($scope.activeImg);



        });
})();

