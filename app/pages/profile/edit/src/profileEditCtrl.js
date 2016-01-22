'use strict';

task3.controller('ProfileEditCtrl', ['$scope', 'user', '$state', function($scope, user, $state) {
        var loadedUser;
        if (!user.isSignedIn()) {
            $state.go('main.sign-in', { message: {
                tpl: 'notAuthorized'
            }});
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
                $state.go('main.profile.show', { message: {
                    tpl: 'profileUpdated'
                }});
            }, function() {
                //TODO: add exception handling
            })
        };
    }]);