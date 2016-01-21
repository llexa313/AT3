'use strict';

task3.controller('ProfileEditCtrl', ['$scope', 'user', '$state', 'message', function($scope, user, $state, message) {
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
    }]);