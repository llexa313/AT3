'use strict';

angular.module('task3App')
    .controller('MainCtrl', ['$rootScope', '$scope', '$timeout', '$state', 'user', 'message', function($rootScope, $scope, $timeout, $state, user, message) {
        var promise;

        $rootScope.$on('$stateChangeSuccess', function() {
            $('.message').append($('.message .bg-info').remove());
            //$('.message').removeClass("animate").addClass("animate");
            $scope.message = message.get();

            if (user.isSignedIn()) {
                if (promise) {
                    $timeout.cancel(promise)
                }

                promise = $timeout(function () {
                    message.set('Session was ended by timeout.');
                    user.signOut();
                    $state.go('sign-out');
                }, 20000);
            }
        })
    }])
    .controller('SignInCtrl', ['$scope', 'user', '$state', function($scope, user, $state) {
        $scope.login = function() {
            user.signIn($scope.user, function(response){
                $state.go('profile.show');
            }, function() {
                //TODO: add exception handling
            });
        };
    }])
    .controller('SignOutCtrl', ['$scope', 'user', function($scope, user) {
        user.signOut();
    }])
    .controller('ProfileEditCtrl', ['$scope', 'user', '$state', 'message', function($scope, user, $state, message) {
        if (!user.isSignedIn()) {
            message.set('Not authorized, please sign in.')
            $state.go('sign-in')
        }

        $scope.reset = function(form) {
            form && form.$setPristine();
            $scope.user = {}
        };
        $scope.submit = function() {
            user.update($scope.user, function() {
                message.set('Profile was successfully updated');
                $state.go('profile.show')
            }, function() {
                //TODO: add exception handling
            })
        };
    }])
    .controller('ProfileShowCtrl', ['$scope', 'user', '$state', 'message', function($scope, user, $state, message) {
        if (!user.isSignedIn()) {
            message.set('Not authorized! Please sign in.')
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
                message.set('New password was send to your email.');
                $state.go('sign-in');
            }, function () {
                //TODO: add exception handling
            })
        }
    }]);

