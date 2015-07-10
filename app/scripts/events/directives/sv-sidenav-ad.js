(function () {
    'use strict';
    angular.module('events')
        .directive('svSidenavAd', function ($mdSidenav) {
            return {
                replace: true,
                templateUrl: 'scripts/events/directives/sv-sidenav-ad.html',
                scope: {
                    albumUrl: '@',
                    albumImg: '@',
                    albumTitle: '@',
                    albumSubhead: '@',
                    albumBody: '@'
                },
                link: function ($scope, el, attrs) {
                    $scope.closeSideBar = function () {
                        $mdSidenav('left').close();
                        $mdSidenav('right').close();
                    };
                }
            };
        });
})();
