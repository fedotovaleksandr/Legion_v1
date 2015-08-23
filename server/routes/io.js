module.exports = 
(function(app, io) {
  var util = require('util');
;

  net_game = {
    io: undefined,
    socket:undefined
  };

  function init() {
      net_game.io=io;
    bindSocketEvents();


  }


  function bindSocketEvents() {
      net_game.io.sockets.on('connection', function onConnection(socket)
        {
            net_game.io=io;
            net_game.socket= socket;
          socket.emit('connected',  { message: "You are connected!" });
            console.log("Run  sockets.on");



        });
  };



  init();

});