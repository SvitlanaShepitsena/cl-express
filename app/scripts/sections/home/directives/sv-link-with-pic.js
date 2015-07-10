(function () {
    'use strict';
    angular.module('sections.home')
        .directive('svLinkWithPic', function ($mdBottomSheet) {
            return {
                replace: true,
                templateUrl: 'scripts/sections/home/directives/sv-link-with-pic.html',
                link: function ($scope, element, attr) {
                }
            };
        });
})();
