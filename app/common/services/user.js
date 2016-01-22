'use strict';

task3.service('user', ['$http', '$cacheFactory', function ($http, $cacheFactory) {
    var signedIn = false,
        cache = $cacheFactory('dataCache');

    this.signIn = function (user, success, error) {
        var cacheKey = user.login + ':' + user.password,
            response = cache.get(cacheKey),
            onSuccess = function(response) {
                if (response.success) {
                    signedIn = true;
                    success(user, response);
                } else {
                    error('invalidPassword');
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
    };

    this.signOut = function () {
        signedIn = false;
    };

    this.isSignedIn = function () {
        return signedIn;
    };

    this.get = function (success, error) {
        $http.get('/api/profile').success(success).error(error);
    };

    this.forgot = function (user, success, error) {
        $http.post('/api/forgot', user).success(success).error(error);
    };

    this.update = function (user, success, error) {
        $http.post('/api/update', user).success(success).error(error);
    };
}]);