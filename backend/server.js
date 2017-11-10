http = require('http');
var WebSocketServer = require('websocket').server;
var clients = [];

// Start a TCP Server
var server = http.createServer(function (request, response) {
}).listen("5000");
wsServer = new WebSocketServer({
    httpServer: server
});

wsServer.on('request', function (request) {
    var connection = r.accept('echo-protocol', r.origin);
    clients.push(connection);
    var id = clients.length - 1;
    console.log((new Date()) + ' Connection accepted [' + id + ']');

    connection.on('message', function (message) {
        handleIncomingMessage(connection, message);
    });

    connection.on('close', function (reasonCode, description) {
        delete clients[id];
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});

function handleIncomingMessage(connection, data) {
    Console.log(data);
}

function broadcast(message, sender) {
    clients.forEach(function (client) {
        if (client === sender) return;
        client.sendUTF(message);
    });
}

console.log("Game server running at port 5000\n");