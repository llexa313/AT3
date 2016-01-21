'use strict';

// cached templates ???
// body tag have to have only one <ui-view> tag

angular.module('task3', [
        'ui.router',
        'pascalprecht.translate',
        'task3.controllers',
        'task3.directives',
        'task3.services',
        'ngSanitize'
    ])
    .config(['$stateProvider', '$urlRouterProvider', '$translateProvider', function($stateProvider, $urlRouterProvider, $translateProvider) {
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
                templateUrl: "views/signin.html",
                controller: 'SignInCtrl'
            })
            .state('sign-out', {
                url: "/sign-out",
                templateUrl: "views/signout.html",
                controller: 'SignOutCtrl'
            })
            .state('forgot-password', {
                url: "/forgot-password",
                templateUrl: "views/forgotpassword.html",
                controller: 'ForgotPasswordCtrl'
            })
            .state('profile', {
                url: "/profile",
                templateUrl: "views/profile.html"
            })
            .state('profile.show', {
                url: "/",
                templateUrl: "views/profile/show.html",
                controller: 'ProfileShowCtrl'
            })
            .state('profile.edit', {
                url: "/edit",
                templateUrl: "views/profile/edit.html",
                controller: 'ProfileEditCtrl'
            });
    }])
    .run(['$templateCache', function($templateCache) {
        $templateCache.put('views/signin.html');
        $templateCache.put('views/profile.html');
    }]);