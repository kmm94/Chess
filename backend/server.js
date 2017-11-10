net = require('net');
var clients = [];

// Start a TCP Server
net.createServer(function (socket) {

    socket.name = socket.remoteAddress + ":" + socket.remotePort
    clients.push(socket);

    socket.on('data', function (data) {
        handleIncomingMessage(socket, data);
    });

    socket.on('end', function () {
        clients.splice(clients.indexOf(socket), 1);
        broadcast(socket.name + " left the chat.\n");
    });


}).listen(5000);

function handleIncomingMessage(socket, data) {

}


function broadcast(message, sender) {
    clients.forEach(function (client) {
        if (client === sender) return;
        client.write(message);
    });
}

console.log("Game server running at port 5000\n");