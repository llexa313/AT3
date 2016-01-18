'use strict';

var express = require('express');
var path = require('path');
var app = express();


//TODO: add minification
// configuration =================
// set the static files location /
app.use('/app', express.static(__dirname + '/app'));
app.use('/api', express.static(__dirname + '/data'));
app.use('/components', express.static(__dirname + '/bower_components'));

// render index.html in root
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// listen (start app with node server.js) ======================================
app.listen(8080, function () {
    console.log('Server started. Open http://localhost:8080/!');
})