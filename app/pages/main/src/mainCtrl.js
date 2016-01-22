'use strict';

task3.controller('MainCtrl', [ '$rootScope', '$scope', '$timeout', '$state', 'user', '$translate', '$http',
    function($rootScope, $scope, $timeout, $state, user, $translate, $http) {
        var promise;

        $scope.switchLang = function(lang) {
            $translate.use(lang);
        };

        $scope.isHttpPending = function () {
            return $http.pendingRequests.length > 0;
        };

        $rootScope.$on('$stateChangeSuccess', function(e, state, params) {
            $scope.message = '';

            if (params.message) {
                var m = params.message;
                $translate('task3.common.messages.' + m.tpl, m.params).then(function (translation) {
                    $scope.message = translation;
                });
            }

            if (user.isSignedIn()) {
                if (promise) {
                    $timeout.cancel(promise);
                }

                promise = $timeout(function () {
                    user.signOut();
                    $state.go('main.sign-out', { message: {
                        tpl: 'sessionTimeout'
                    }});
                }, 5000);
            }
        });
    }]);

