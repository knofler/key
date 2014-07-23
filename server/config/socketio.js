/**
 * Socket.io configuration
 */

'use strict';

var config = require('./environment');

// When the user disconnects.. perform this
function onDisconnect(socket) {
}

// When the user connects.. perform this
function onConnect(socket) {
  // When the client emits 'info', this listens and executes
  socket.on('info', function (data) {
    console.info('[%s] %s', socket.address, JSON.stringify(data, null, 2));
  });
  // Insert sockets below
  require('../api/device/device.socket').register(socket);
  require('../api/thing/thing.socket').register(socket);
  require('../api/client/client.socket').register(socket);
  require('../api/status/status.socket').register(socket);
}

module.exports = function (socketio) {
  // The amount of detail that the server should output to the logger.
  // 0 - error
  // 1 - warn
  // 2 - info
  // 3 - debug
  socketio.set('log level', 2);

  // We can authenticate socket.io users and access their token through socket.handshake.decoded_token
  //
  // 1. You will need to send the token in `client/components/socket/socket.service.js`
  //
  // 2. Require authentication here:
  // socketio.set('authorization', require('socketio-jwt').authorize({
  //   secret: config.secrets.session,
  //   handshake: true
  // }));


    socketio.sockets.on('connection', function (socket) {
      socket.address = socket.handshake.address.address ;
      socket.connectedAt = new Date();

      
      // Call onDisconnect.
      socket.on('disconnect', function () {
        onDisconnect(socket);
        console.info('[%s] DISCONNECTED', socket.address);
      });

      socket.on('toServer',function(){
          socket.broadcast.emit('display_data');
      });

      socket.on('userToserver',function(data){
          socket.broadcast.emit('display_usr',{usrData:data.deviceData});
      });


  socket.on('connect_info',function(){
    socket.broadcast.emit('client_connected',{
      message :{
          info: 'Client '+ socket.id + ' from computer ' + require('os').hostname() + ' platform ' + process.platform,
          ipaddress : socket.address
      }
    
  });
  }); 

      // Call onConnect.
      onConnect(socket);
      console.info('[%s] CONNECTED', socket.address);  
      // console.info(require(fs).readdirSync('/usr/rumman/Code/key/client/app'));
    });

};