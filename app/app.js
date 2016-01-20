'use strict';

angular.module('task3App', [
        'ui.router',
        'task3.directives',
        'task3.services'
    ])
    .config(function($stateProvider, $urlRouterProvider) {
    //
        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/sign-in");
        //
        // Now set up the states
        $stateProvider
            .state('sign-in', {
                url: "/sign-in",
                templateUrl: "app/tpl/signin/signin.html",
                controller: 'SignInCtrl'
            })
            .state('sign-out', {
                url: "/sign-out",
                templateUrl: "app/tpl/signout/signout.html",
                controller: 'SignOutCtrl'
            })
            .state('forgot-password', {
                url: "/forgot-password",
                templateUrl: "app/tpl/forgotpassword/forgotpassword.html",
                controller: 'ForgotPasswordCtrl'
            })
            .state('profile', {
                url: "/profile",
                templateUrl: "app/tpl/profile/profile.html"
            })
            .state('profile.show', {
                url: "/",
                templateUrl: "app/tpl/profile/show.html",
                controller: 'ProfileShowCtrl'
            })
            .state('profile.edit', {
                url: "/edit",
                templateUrl: "app/tpl/profile/edit.html",
                controller: 'ProfileEditCtrl'
            })
    ;
});