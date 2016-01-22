'use strict';

task3.controller('SignInCtrl', ['$scope', 'user', '$state', function($scope, user, $state) {
        $scope.user = {};

        $scope.login = function() {
            user.signIn($scope.user, function(){
                $state.go('main.profile.show');
            }, function(e) {
                $state.transitionTo($state.current, { message: {
                    tpl: e
                }});
            });
        };
    }]);