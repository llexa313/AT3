'use strict';

task3.controller('ForgotCtrl', ['$scope', 'user', '$state', function($scope, user, $state) {
    $scope.user = { login: '' };

    $scope.submit = function() {
        user.forgot($scope.user, function (response) {
            $state.go('main.sign-in', {
                message: {
                    tpl: 'passwordSent',
                    params: { newPassword: response.newPassword }
                }});
        }, function () {
            //TODO: add exception handling
        })
    }
}]);