(function () {
    'use strict'

    angular.module('sections.about', [])
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider

                .state("app.about", {
                    abstract: true,
                    url: "/about",
                    controller: "AboutCtrl",
                    templateUrl: "scripts/sections/about/views/aboutCtrl.html"
                })
                .state("app.about.about-tab-content", {
                    url: "/info",
                    templateUrl: "scripts/sections/about/views/about-tab-contentCtrl.html"
                })
                .state("app.about.testimonials-tab-content", {
                    url: "/testimonials",
                    controller: "TestimonialsTabContentCtrl",
                    templateUrl: "scripts/sections/about/views/testimonials-tab-contentCtrl.html"
                })
                .state("app.about.google-analytics", {
                    url: "/google-analytics",
                    templateUrl: "scripts/sections/about/views/google-analyticsCtrl.html"
                })
        });
})();
