'use strict';

angular.module('task3.controllers', [])
    .controller('MainCtrl', [
            '$rootScope', '$scope', '$timeout', '$state', 'user', 'message', '$translate', '$http',
            function($rootScope, $scope, $timeout, $state, user, message, $translate, $http) {
        var promise;

        $scope.switchLang = function(lang) {
            $translate.use(lang);
        };

        $scope.isHttpPending = function () {
            return  $http.pendingRequests.length > 0;
        };

        $rootScope.$on('$viewContentLoaded', function() {
            $scope.message = '';

            $translate(message.get()).then(function(translation) {
                $scope.message = translation;
            });

            if (user.isSignedIn()) {
                if (promise) {
                    $timeout.cancel(promise);
                }

                promise = $timeout(function () {
                    message.set('SESSION_TIMEOUT');
                    user.signOut();
                    $state.go('sign-out');
                }, 100000);
            }
        });
    }])
    .controller('SignInCtrl', ['$scope', 'user', '$state', 'message', function($scope, user, $state, message) {
        $scope.user = {};

        $scope.login = function() {
            user.signIn($scope.user, function(response){
                $state.go('profile.show');
            }, function(e) {
                message.set(e);
                $state.reload();
            });
        };
    }])
    .controller('SignOutCtrl', ['$scope', 'user', function($scope, user) {
        user.signOut();
    }])
    .controller('ProfileEditCtrl', ['$scope', 'user', '$state', 'message', function($scope, user, $state, message) {
        var loadedUser;
        if (!user.isSignedIn()) {
            message.set('NOT_AUTHORIZED')
            $state.go('sign-in')
        } else {
            user.get(function(user) {
                $scope.user = user;
                loadedUser = user;
            }, function() {
                //TODO: add exception handling
            })
        }

        $scope.reset = function(form) {
            form && form.$setPristine();
            $scope.user = loadedUser;
        };
        $scope.submit = function() {
            user.update($scope.user, function() {
                message.set('PROFILE_UPDATED');
                $state.go('profile.show')
            }, function() {
                //TODO: add exception handling
            })
        };
    }])
    .controller('ProfileShowCtrl', ['$scope', 'user', '$state', 'message', function($scope, user, $state, message) {
        if (!user.isSignedIn()) {
            message.set('NOT_AUTHORIZED')
            $state.go('sign-in')
        }

        user.get(function(response) {
            $scope.user = response;
        }, function() {
            //TODO: add exception handling
        })
    }])
    .controller('ForgotPasswordCtrl', ['$scope', 'user', '$state', 'message', function($scope, user, $state, message) {
        $scope.submit = function() {
            user.forgotPassword($scope.name, function (response) {
                message.set('PASSWORD_SENT');
                $state.go('sign-in');
            }, function () {
                //TODO: add exception handling
            })
        }
    }]);

