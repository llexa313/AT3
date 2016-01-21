'use strict';

task3.controller('MainCtrl', [ '$rootScope', '$scope', '$timeout', '$state', 'user', 'message', '$translate', '$http',
    function($rootScope, $scope, $timeout, $state, user, message, $translate, $http) {
        var promise;

        $scope.switchLang = function(lang) {
            $translate.use(lang);
        };

        $scope.isHttpPending = function () {
            return $http.pendingRequests.length > 0;
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
    }]);

