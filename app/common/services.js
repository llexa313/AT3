'use strict';

angular.module('task3.services', [])
    .factory('user', ['$http', function ($http) {
        var signedIn = false;

        return {
            signIn: function(user, success, error) {
                $http.get('/api/sign-in.json', user).success(function() {
                    signedIn = true;
                    success(user);
                }).error(error);
            },
            signOut: function() {
                signedIn = false;
            },
            isSignedIn: function() {
                return signedIn;
            },
            get: function(success, error) {
                $http.get('/api/get.json').success(success).error(error);
            },
            update: function(user, success, error) {
                $http.get('/api/update.json', user).success(success).error(error);
            },
            forgotPassword: function (name, success, error) {
                $http.get('/api/forgot-password.json', { name: name }).success(success).error(error);
            }
        };
    }])
    .factory('message', function() {
        return {
            _message: '',
            set: function (value) {
                this._message = value;
            },
            get: function () {
                var value = this._message;
                this._message = '';
                return value;
            }
        }
    })
