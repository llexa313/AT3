'use strict';

angular.module('task3.services', [])
    .factory('user', ['$http', '$cacheFactory', function ($http, $cacheFactory) {
        var signedIn = false,
            cache = $cacheFactory('dataCache');

        return {
            signIn: function(user, success, error) {
                var cacheKey = user.login + ':' + user.password,
                    response = cache.get(cacheKey),
                    onSuccess = function(response) {
                        if (response.success) {
                            signedIn = true;
                            success(user, response);
                        } else {
                            error('INVALID_PASSWORD');
                        }
                    };

                if (response) {
                    onSuccess(response)
                } else {
                    $http.post('/api/sign-in', user, { cache: true })
                        .success(function(response) {
                            cache.put(cacheKey, response);
                            onSuccess(response)
                        }).error(error);
                }
            },
            signOut: function() {
                signedIn = false;
            },
            isSignedIn: function() {
                return signedIn;
            },
            get: function(success, error) {
                $http.get('/api/profile').success(success).error(error);
            },
            update: function(user, success, error) {
                $http.post('/api/update', user).success(success).error(error);
            },
            forgotPassword: function (name, success, error) {
                $http.post('/api/forgot-password', { name: name }).success(success).error(error);
            }
        };
    }])
    .factory('message', function() {
        // TODO add method to show message that will control animation
        var message = '';
        return {
            set: function (value) {
                message = value;
            },
            get: function () {
                var value = message;
                message = '';
                return value;
            }
        }
    });
