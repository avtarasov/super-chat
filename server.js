var express = require('express');
var sockjs  = require('sockjs');
var http    = require('http');
var redis   = require('redis');

var echo = sockjs.createServer();
echo.on('connection', function(conn) {

    setInterval(function() {
        conn.write("test message");
    }, 2000);

    conn.on('data', function(message) {
        console.log(message);
    });

    conn.on('close', function() {});
});

var server = http.createServer();

echo.installHandlers(server, {prefix:'/echo'});
server.listen(9999, '0.0.0.0');