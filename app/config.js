'use strict';

task3.config(
    ['$stateProvider', '$urlRouterProvider', '$translateProvider',
    function($stateProvider, $urlRouterProvider, $translateProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: 'lang/',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('en');
        $translateProvider.useSanitizeValueStrategy('escape');

        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/sign-in");

        var defaultParams = { message: null };
        //
        // Now set up the states
        $stateProvider
            .state('main', {
                abstract: true,
                templateUrl: "app/pages/main/tpl/main.tpl.html",
                controller: 'MainCtrl'
            })
            .state('main.sign-in', {
                url: "/sign-in",
                templateUrl: "app/pages/signin/tpl/signin.tpl.html",
                params: defaultParams,
                controller: 'SignInCtrl'
            })
            .state('main.sign-out', {
                url: "/sign-out",
                params: defaultParams,
                templateUrl: "app/pages/signout/tpl/signout.tpl.html"
            })
            .state('main.forgot-password', {
                url: "/forgot-password",
                templateUrl: "app/pages/forgot/tpl/forgot.tpl.html",
                params: defaultParams,
                controller: 'ForgotCtrl'
            })
            .state('main.profile', {
                url: '/profile',
                templateUrl: "app/pages/profile/tpl/profile.tpl.html"
            })
            .state('main.profile.show', {
                url: "/",
                templateUrl: "app/pages/profile/show/tpl/show.tpl.html",
                params: defaultParams,
                controller: 'ProfileShowCtrl'
            })
            .state('main.profile.edit', {
                url: "/edit",
                templateUrl: "app/pages/profile/edit/tpl/edit.tpl.html",
                params: defaultParams,
                controller: 'ProfileEditCtrl'
            });
    }]);