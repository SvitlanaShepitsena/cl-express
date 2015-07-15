(function () {
    'use strict';

    angular.module('sections.about')
        .directive('svAboutYourBusiness', function () {
            return {
                replace: true,
                templateUrl: 'scripts/sections/about/directives/sv-about-your-business.html',
                scope: {
                    companyName:'@'
                },
                link: function ($scope, el, attrs) {

                }
            };
        });
})();
