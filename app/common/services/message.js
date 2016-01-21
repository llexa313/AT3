'use strict';

task3.factory('message', function() {
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
