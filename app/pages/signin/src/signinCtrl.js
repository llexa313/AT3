'use strict';

task3.controller('SignInCtrl', ['$scope', 'user', '$state', 'message', function($scope, user, $state, message) {
        $scope.user = {};

        $scope.login = function() {
            user.signIn($scope.user, function(response){
                $state.go('main.profile.show');
            }, function(e) {
                message.set(e);
                $state.reload();
            });
        };
    }]);