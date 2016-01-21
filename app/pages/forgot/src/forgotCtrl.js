'use strict';

task3.controller('ForgotCtrl', ['$scope', 'user', '$state', 'message', function($scope, user, $state, message) {
        $scope.submit = function() {
            user.forgotPassword($scope.name, function () {
                message.set('PASSWORD_SENT');
                $state.go('sign-in');
            }, function () {
                //TODO: add exception handling
            })
        }
    }]);