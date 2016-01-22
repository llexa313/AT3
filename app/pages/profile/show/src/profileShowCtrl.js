'use strict';

task3.controller('ProfileShowCtrl', ['$scope', 'user', '$state', function($scope, user, $state) {
        if (!user.isSignedIn()) {
            $state.go('main.sign-in', { message: {
                tpl: 'notAuthorized'
            }});
        }

        user.get(function(response) {
            $scope.user = response;
        }, function() {
            //TODO: add exception handling
        })
    }]);