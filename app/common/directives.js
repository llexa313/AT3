'use strict';

angular.module('task3.directives', [])
    .directive('fullName', function() {
        var NAME_REGEXP = /[A-Z][a-z]{2,30}\s[A-Z][a-z]{2,30}/;
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$validators.fullName = function(modelValue, viewValue) {
                    var value = NAME_REGEXP.exec(viewValue);
                    return !!value && value[0] === viewValue;
                };
            }
        };
    })
    .directive('age', function() {
        var INTEGER_REGEXP = /^\-?\d+$/;
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$validators.age = function(modelValue, viewValue) {
                    var value = INTEGER_REGEXP.exec(viewValue);
                    return !!(value && value[0] && _.inRange(value, 18, 60));
                };
            }
        };
    })
    .directive('birthdate', function() {
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$validators.birthdate = function(modelValue, viewValue) {
                    if (viewValue !== undefined) {
                        var parts = viewValue.split(' '),
                            day = parts[0] * 1,
                            month = months.indexOf(parts[1]),
                            year = parts[2] * 1,
                            date = new Date(year, month, day);

                        // incorrect day
                        if (!_.isInteger(day)) {
                            return false;
                        }

                        // no such month
                        if (month == -1) {
                            return false;
                        }

                        // incorrect year
                        if (!_.isInteger(year) || !_.inRange(year, 1900, 2016)) {
                            return false;
                        }

                        // for example if day will be negative or wrong month will be changed
                        // and it means that day was wrong
                        // so if month not changed date is correct and return true
                        return date.getMonth() === month
                    }
                };
            }
        };
    });