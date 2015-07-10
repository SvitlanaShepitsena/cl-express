(function () {
    'use strict';
    angular.module('sections.home')
        .directive('svHeaderPhone', function () {
            return {
                replace: true,
                templateUrl: 'scripts/sections/home/directives/sv-header-phone.html',
                scope: {},
                link: function ($scope, el, attrs) {
                }
            };
        });
})();
