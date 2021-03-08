var WebSocketServer = require('websocket').server;
var http = require('http');
var uuid = require('node-uuid');

var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
server.listen(8881, function() {
    console.log((new Date()) + ' Server is listening on port 8881');
});

wsServer = new WebSocketServer({
    httpServer: server,
    // You should not use autoAcceptConnections for production
    // applications, as it defeats all standard cross-origin protection
    // facilities built into the protocol and the browser.  You should
    // *always* verify the connection's origin and decide whether or not
    // to accept it.
    autoAcceptConnections: false
});

function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}

var numClients = 0,webSockets = {};
wsServer.on('request', function(request) {
    if (!originIsAllowed(request.origin)) {
      // Make sure we only accept requests from an allowed origin
      request.reject();
      console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
      return;
    }
    var uuid1 = uuid.v1();
    numClients++;
    var connection = request.accept('echo-protocol', request.origin);
    connection.sendUTF(`初始化用户，分配id：${uuid1}；当前用户数量：${numClients}`);
    webSockets[uuid1] = connection;
    console.log((new Date()) + ' Connection accepted.');
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
            let _data = JSON.parse(message.utf8Data);
            webSockets[_data.to].sendUTF(_data.message);
            // connection.sendUTF(message.utf8Data);
        }
        else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection.sendBytes(message.binaryData);
        }
    });
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
        numClients--;
        console.log(`Id为${uuid1}用户下线；当前用户数量：${numClients}`);
    });
});