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
            .state('sign-in', {
                url: "/sign-in",
                templateUrl: "app/pages/signin/tpl/signin.tpl.html",
                controller: 'SignInCtrl'
            })
            .state('sign-out', {
                url: "/sign-out",
                templateUrl: "app/pages/signout/tpl/signout.tpl.html"
            })
            .state('forgot-password', {
                url: "/forgot-password",
                templateUrl: "app/pages/forgot/tpl/forgot.tpl.html",
                controller: 'ForgotCtrl'
            })
            .state('profile', {
                url: "/profile",
                templateUrl: "app/pages/profile/tpl/profile.tpl.html"
            })
            .state('profile.show', {
                url: "/",
                templateUrl: "app/pages/profile/show/tpl/show.tpl.html",
                controller: 'ProfileShowCtrl'
            })
            .state('profile.edit', {
                url: "/edit",
                templateUrl: "app/pages/profile/edit/tpl/edit.tpl.html",
                controller: 'ProfileEditCtrl'
            });
    }]);