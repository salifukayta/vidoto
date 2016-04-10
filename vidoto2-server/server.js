var express = require('express');
var express_peer_server = require('peer').ExpressPeerServer;

var peer_options = {
    debug: true
};

var app = express();
var server = app.listen(3000, '192.168.1.30');
// var server = app.listen(3000);

app.use('/call_peerjs', express_peer_server(server, peer_options));

console.log("peer ",  peer_options);

