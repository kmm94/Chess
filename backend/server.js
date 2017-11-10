http = require('http');

var WebSocketServer = require('websocket').server;
var clients = [];
var board = undefined;


var server = http.createServer(function (request, response) {
});

server.listen(5000, function () {
    console.log("I am running!");
});

wsServer = new WebSocketServer({
    httpServer: server
});

wsServer.on('request', function (request) {
    var connection = request.accept('echo-protocol', request.origin);
    clients.push(connection);
    var id = clients.length - 1;
    console.log((new Date()) + ' Connection accepted [' + id + ']');
    connection.sendUTF(JSON.stringify("Welcome to the gameserver"));

    connection.on('message', function (message) {
        handleIncomingMessage(connection, message);
    });

    connection.on('close', function (reasonCode, description) {
        delete clients[id];
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});

function sendBoard(client) {
    client.sendUTF(JSON.stringify({action: "newBoard", board: board.position()}))
}

function handleIncomingMessage(connection, data) {
    if(!isValidMessage(data.utf8Data)) {
        console.log("INVALID: " + JSON.stringify(data.utf8Data));
        return;
    }
    var message = JSON.parse(data.utf8Data);
    console.log("VALID: " + JSON.stringify(message));
    console.log(message.action);

    if(message.action === "move") {
        voteMove(connection, message.oldLocation, message.newLocation)
    } else if(message.action === "newBoard") {
        sendBoard(connection);
    } else if(message.action === "timeLeft") {

    }
}

function voteMove(client, oldLoc, newLoc) {
    broadcastMove(oldLoc, newLoc);
}

function isValidMessage(data) {
    try {
        JSON.parse(data);
    } catch (e) {
        return false;
    }
    return true;
}

function broadcastMove(oldLocation, newLocation) {
    clients.forEach(function (client) {
       client.sendUTF(JSON.stringify({action: "move", oldLocation: oldLocation, newLocation: newLocation}));
    });
}

console.log("Game server running at port 5000\n");