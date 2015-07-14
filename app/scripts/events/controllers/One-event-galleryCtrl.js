(function () {
    'use strict';

    angular.module('events')
        .controller('One-event-galleryCtrl', function ($scope, $stateParams) {
            $scope.activeImg = _.isEmpty($stateParams.id) ? null : $stateParams.id;


        });
})();

