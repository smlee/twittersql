var fs = require("fs");
var express = require("express");
var app = express();
var logger = require("morgan");
var path = require("path");
var swig = require('swig');
var routes = require('./routes/');
var server = app.listen(3000);
var io = require('socket.io').listen(server);

io.on('connection', function(socket){
    console.log("Hello, socket connected")
});

app.use('/', routes(io));
app.use(logger('dev'));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views',path.join(__dirname,'/views'));
app.use(express.static(__dirname + '/public'));



swig.setDefaults({ cache: false });




