http = require('http');

var WebSocketServer = require('websocket').server;
var clients = [];
var board = undefined;
var DEBUG = true;
var TIME_PER_TURNS = 60;
var timeLeft = 0;
var currentSide = "white";
var clientAlignment = {};
var blackCount = 0;
var whiteCount = 0;

var server = http.createServer(function (request, response) {
});

server.listen(5000, function () {
    console.log("I am running!");
});

wsServer = new WebSocketServer({
    httpServer: server
});

wsServer.on('request', function (request) {
    if (timerRunning === false) {
        startTimer();
    }

    var connection = request.accept('echo-protocol', request.origin);
    clients.push(connection);
    var id = clients.length - 1;
    console.log((new Date()) + ' Connection accepted [' + id + ']');
    connection.sendUTF(JSON.stringify("Welcome to the gameserver"));

    if (whiteCount > blackCount) {
        clientAlignment[connection] = "black";
        blackCount++;
    } else {
        clientAlignment[connection] = "white";
        whiteCount++;
    }

    connection.on('message', function (message) {
        handleIncomingMessage(connection, message);
    });

    connection.on('close', function (reasonCode, description) {
        delete clients[id];
        if (clientAlignment[connection] === "black") {
            blackCount--;
        } else {
            whiteCount--;
        }
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});

var interval;
var timerRunning = false;

function startTimer() {
    stopTimer();
    timerRunning = true;
    interval = setInterval(countdownTimer, 1000);
}

function stopTimer() {
    if (interval !== null) {
        clearInterval(interval);
        timerRunning = false;
    }
}

function broadcastCurrentSide() {
    clients.forEach(function (client) {
        sendCurrentSide(client);
    });
}

function swapSide() {
    if (currentSide === "white") {
        currentSide = "black";
    } else {
        currentSide = "white";
    }
    broadcastCurrentSide();
}

function countdownTimer() {
    if (timeLeft === 0) {
        //TODO IMPLEMENT SERVERSIDE MOVING
        timeLeft = TIME_PER_TURNS;
        swapSide();
        broadcastTimeLeft();
        return;
    }
    timeLeft -= 1;
    broadcastTimeLeft();
}


function sendBoard(client) {
    client.sendUTF(JSON.stringify({action: "newBoard", board: board.position()}));
}

function broadcastTimeLeft() {
    clients.forEach(function (client) {
        sendTimeLeft(client);
    })
}

function sendTimeLeft(client) {
    client.sendUTF(JSON.stringify({action: "timeLeft", time: timeLeft}));
}

function sendCurrentSide(client) {
    client.sendUTF(JSON.stringify({action: "currentSide", currentSide: currentSide}));
}

function handleIncomingMessage(connection, data) {
    if (!isValidMessage(data.utf8Data)) {
        if (DEBUG) console.log("INVALID: " + JSON.stringify(data.utf8Data));
        return;
    }
    var message = JSON.parse(data.utf8Data);
    if (DEBUG) {
        console.log("VALID: " + JSON.stringify(message));
        console.log(message.action);
    }

    if (message.action === "move") {
        voteMove(connection, message.oldLocation, message.newLocation)
    } else if (message.action === "newBoard") {
        sendBoard(connection);
    } else if (message.action === "timeLeft") {
        sendTimeLeft(connection);
    } else if (message.action === "currentSide") {
        sendCurrentSide(connection);
    }
}

function sendErrorMessage(client, message) {
    client.sendUTF(JSON.stringify({action: "error", message: message}))
}

function voteMove(client, oldLoc, newLoc) {
    if (clientAlignment[client] === currentSide) {
        broadcastMove(oldLoc, newLoc);
    } else {
        sendErrorMessage(client, "Not your turn yet");
    }
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