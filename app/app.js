'use strict';

// TODO use app.get with pause
// TODO forgot-password should return new password
// TODO add JSON files with data
// TODO index.html do smth with it
// TODO instead of res.end use res.send
// TODO do update feature in backend
// TODO in lang files use "project.page.key" structure
// TODO in page refresh profile loaded in XHR
// TODO sign out don't use properly
// TODO use services in user service
// TODO user factory must be a service
// TODO don't use angular.module anywhere
// TODO don't use ctrl in index.html
// TODO body tag have to have only one <ui-view> tag

var task3 = angular.module('task3', [
        'ui.router',
        'pascalprecht.translate',
        'ngSanitize',
    ]);