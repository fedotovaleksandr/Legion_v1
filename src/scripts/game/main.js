module.exports =
(function(ele, scope, socket, maps, mapId, injector) {
    socket.on('SocketTestClient', function (data) {
        alert("SocketTestClient", data);
    });
    socket.emit('SocketTestServer', "testserver");
}
)