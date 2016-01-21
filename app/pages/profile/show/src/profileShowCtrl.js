'use strict';

task3.controller('ProfileShowCtrl', ['$scope', 'user', '$state', 'message', function($scope, user, $state, message) {
        if (!user.isSignedIn()) {
            message.set('NOT_AUTHORIZED')
            $state.go('main.sign-in')
        }

        user.get(function(response) {
            $scope.user = response;
        }, function() {
            //TODO: add exception handling
        })
    }]);