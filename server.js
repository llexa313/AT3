'use strict';

var express = require('express');
var bodyParser = require("body-parser");
var path = require('path');
var cookieParser = require('cookie-parser');
var NodeCache = require( "node-cache" );
var md5 = require('md5');

var app = express();

// configuration =================
app.use(bodyParser.json());
app.use(cookieParser());

// set the static files location /
app.use('/app', express.static(__dirname + '/app'));
app.use('/api', express.static(__dirname + '/data'));
app.use('/components', express.static(__dirname + '/bower_components'));
app.use('/views', express.static(__dirname + '/views'));
app.use('/lang', express.static(__dirname + '/lang'));

// add some cache data
var cache = new NodeCache();
cache.set('users', [
    {
        login: 'test',
        password: '202cb962ac59075b964b07152d234b70',
        name: 'Alex Pupkin',
        age: '22',
        birthdate: '22 Apr 2001'
    },
    {
        login: 'test2',
        password: '250cf8b51c773f3f8dc8b4be867a9a02',
        name: 'Dmitry Ivanov',
        age: '35',
        birthdate: '11 Jan 1973'
    }
]);

// render index.html in root
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/api/sign-in', function (req, res) {
    setTimeout(function() {
        var login = req.body.login,
            password = req.body.password,
            users = cache.get('users'),
            sessionId;

        for(var i = 0; i < users.length; i++) {
            if (users[i].login === login) {
                if (users[i].password === md5(password)) {
                    sessionId = Math.random() * Number.MAX_SAFE_INTEGER;
                    users[i].sessionId = sessionId;
                    cache.set('users', users);
                    res.cookie('session-id', sessionId);
                }
                break;
            }
        }

        res.end(JSON.stringify({
            success: !!sessionId
        }));

    }, 2000);
});


app.post('/api/forgot-password', function(req, res) {
    setTimeout(function() {
        res.end(JSON.stringify({
            success: true
        }));
    }, 2000);
});

app.get('/api/profile', function(req, res) {
    setTimeout(function() {
        var users = cache.get('users');

        for(var i = 0; i < users.length; i++) {
            if (users[i].sessionId == req.cookies['session-id']) {
                res.end(JSON.stringify({
                    name: users[i].name,
                    age: users[i].age,
                    birthdate: users[i].birthdate
                }));
            }
        }
        res.end(JSON.stringify({
            success: false
        }));
    }, 2000);
});

app.post('/api/update', function(req, res) {
    setTimeout(function() {
        res.end(JSON.stringify({
            success: true
        }));
    }, 2000);
});

// listen (start app with node server.js) ======================================
app.listen(8080, function () {
    console.log('Server started. Open http://localhost:8080/!');
})
