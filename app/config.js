'use strict';

task3.config(
    ['$stateProvider', '$urlRouterProvider', '$translateProvider',
    function($stateProvider, $urlRouterProvider, $translateProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: 'lang/',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('ru');
        $translateProvider.useSanitizeValueStrategy('escape');

        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/sign-in");
        //
        // Now set up the states
        $stateProvider
            .state('main', {
                templateUrl: "app/pages/main/tpl/main.tpl.html",
                controller: 'MainCtrl'
            })
            .state('main.sign-in', {
                url: "/sign-in",
                templateUrl: "app/pages/signin/tpl/signin.tpl.html",
                controller: 'SignInCtrl'
            })
            .state('main.sign-out', {
                url: "/sign-out",
                templateUrl: "app/pages/signout/tpl/signout.tpl.html"
            })
            .state('main.forgot-password', {
                url: "/forgot-password",
                templateUrl: "app/pages/forgot/tpl/forgot.tpl.html",
                controller: 'ForgotCtrl'
            })
            .state('main.profile', {
                url: "/profile",
                templateUrl: "app/pages/profile/tpl/profile.tpl.html"
            })
            .state('main.profile.show', {
                url: "/",
                templateUrl: "app/pages/profile/show/tpl/show.tpl.html",
                controller: 'ProfileShowCtrl'
            })
            .state('main.profile.edit', {
                url: "/edit",
                templateUrl: "app/pages/profile/edit/tpl/edit.tpl.html",
                controller: 'ProfileEditCtrl'
            });
    }]);