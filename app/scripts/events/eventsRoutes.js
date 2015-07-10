(function () {
    'use strict'
    angular.module('events', ['ui.router', 'mwl.calendar'])
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                /*=events*/
                .state("app.manager.create-event", {
                    url: "/create-event",
                    controller: "CreateEventCtrl as createEvent",
                    templateUrl: "scripts/events/views/create-eventCtrl.html"
                })
                .state("app.events", {
                    url: "/events",
                    abstract: true,
                    controller: "EventsCtrl as events",
                    templateUrl: "scripts/events/views/eventsCtrl.html"
                })
                .state("app.events.calendar", {
                    url: "/event-calendar",
                    controller: "EventCalendarCtrl as eventCalendar",
                    templateUrl: "scripts/events/views/event-calendarCtrl.html"
                })
                .state("app.events.field", {
                    url: "/events/field-event/:year",
                    controller: "FieldEventCtrl as fieldEvent",
                    templateUrl: "scripts/events/views/field-eventCtrl.html"
                })
                .state("app.events.ravinia", {
                    url: "/ravinia-event",
                    controller: "RaviniaEventCtrl as raviniaEvent",
                    templateUrl: "scripts/events/views/ravinia-eventCtrl.html"
                })
                .state("app.events.photoAlbums", {
                    url: "/photoAlbums",
                    controller: "PhotoAlbumsCtrl",
                    templateUrl: "scripts/events/views/photoAlbumsCtrl.html"
                })
                .state("app.events.one-event", {
                    url: "/one-event/:eid",
                    controller: "OneEventCtrl",
                    templateUrl: "scripts/events/views/one-eventCtrl.html"
                })
                .state("app.events.event-article", {
                    url: "/event-article",
                    controller: "Event-articleCtrl",
                    templateUrl: "scripts/events/views/event-articleCtrl.html"
                })

                .state("app.events.one-event-gallery", {
                    url: "/one-event-gallery",
                    controller: "One-event-galleryCtrl",
                    templateUrl: "scripts/events/views/one-event-galleryCtrl.html"
                })
//#state'
        });
})();