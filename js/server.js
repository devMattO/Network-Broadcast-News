const net = require('net');
const fs = require('fs');
const logFile = fs.createWriteStream('./server.log');
let users = [];

const server = net.createServer((socket)=>{
    users.push(socket);
    console.log('client connected');
    socket.on('data', ( data ) => {
      process.stdout.write(data.toString());
      for (var i = 0; i < users.length; i++) {
        users[i].write(data);
      }
    });
});

server.listen('6969', () =>{
  console.log('server listening on port 6969');
});