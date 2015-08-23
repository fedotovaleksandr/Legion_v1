/**
 * Created by aleksandr on 09.08.2015.
 */


var express = require('express'),
    path    = require('path');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var port = process.env.PORT || 63350;
server.listen(port, function() {
    console.log("Running on port ", port);
});

var staticPath = path.join(__dirname, '../build');


/*
app.use(express.static(staticPath, { maxAge: 86400000 }));

app.get('/', function(req, res) {
    res.sendfile(path.join(staticPath, 'index.html'));
});*/

require('./routes/io.js')(app, io);