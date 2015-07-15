(function () {
    'use strict';

    angular.module('common')
        .directive('svFbLike', function ($location, ezfb, $timeout) {
            return {
                templateUrl: 'scripts/common/directives/sv-fb-like.html',
                scope: {},
                link: function ($scope, el, attrs) {
                    // page url is a current page that this directory is rendered on. Thus we can just put
                    // sv-fb-like on any page and it will share/like the url where it is shown.
                    // In contrast to using .fb-like directive and providing manually page that needs to be shared.
                    $scope.pageUrl = $location.absUrl();


                }
            };
        });
})();
