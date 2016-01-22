'use strict';

var express = require('express');
var bodyParser = require("body-parser");
var path = require('path');
var cookieParser = require('cookie-parser');
var NodeCache = require( "node-cache" );
var md5 = require('md5');
var pause = require('connect-pause')

var app = express();

// configuration =================
app.use(bodyParser.json());
app.use(cookieParser());

// set the static files location /
app.use('/', express.static(__dirname + '/public'));
app.use('/app', express.static(__dirname + '/app'));
app.use('/components', express.static(__dirname + '/bower_components'));
app.use('/lang', express.static(__dirname + '/lang'));

// add some cache data
var cache = new NodeCache();

var PAUSE_DELAY = 1000;
var sessions = {};
var getUser = function(login) {
    if (!login) return false;

    var user = cache.get(login);

    if (!user) {
        try {
            var userJson = require('./data/' + login + '.json');
            if (userJson) {
                cache.set(userJson.login, userJson);
                user = userJson;
            }
        } catch (e) {
            return false;
        }
    }
    return user;
};

app.post('/api/sign-in', pause(PAUSE_DELAY), function (req, res) {
    var login = req.body.login,
        password = req.body.password,
        user = getUser(login),
        sessionId;

    if (user && user.password === md5(password)) {
        sessionId = Math.random() * Number.MAX_SAFE_INTEGER;
        sessions[sessionId] = login;
        user.sessionId = sessionId;
        cache.set(login, user);
        res.cookie('session-id', sessionId);
    }

    res.send({ success: !!sessionId });
});


app.post('/api/forgot', pause(PAUSE_DELAY), function(req, res) {
    var newPassword = Math.round(Math.random() * 100000000).toString(),
        login = req.body.login,
        user = getUser(login);

    if (user) {
        user.password = md5(newPassword);
        cache.set(login, user);

        res.send({
            success: true,
            newPassword: newPassword
        });
    } else {
        res.send({
            success: false
        })
    }
});

app.get('/api/profile', pause(PAUSE_DELAY), function(req, res) {
    var login = sessions[req.cookies['session-id']],
        user = getUser(login);

    if (user) {
        res.send({
            name: user.name,
            age: user.age,
            birthdate: user.birthdate
        });
    } else {
        res.send({ success: false });
    }
});

app.post('/api/update', pause(PAUSE_DELAY), function(req, res) {
    var login = sessions[req.cookies['session-id']],
        user = getUser(login),
        params = req.body;

    if (user) {
        user.name = params.name;
        user.age = params.age;
        user.birthdate = params.birthdate;
        cache.set(login, user);
        res.send({ success: true });
    } else {
        res.send({ success: false });
    }
});

// listen (start app with node server.js) ======================================
app.listen(8080, function () {
    console.log('Server started. Open http://localhost:8080/!');
})
