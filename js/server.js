const net = require('net');
const fs = require('fs');
const logFile = fs.createWriteStream('./server.log');
let users = [];

const server = net.createServer((socket)=>{
    users.push(socket);
    console.log('client connected');
    socket.on('data', ( data ) => {
      for (var i = 0; i < users.length; i++) {

        if(socket.name === undefined){
          socket.name = data.toString().replace(/(\r\n|\n|\r)/gm,"");
          return;
        }

        else if(users[i] !== socket){ //if sender is same as receiver dont send!
          users[i].write(socket.name + ': ' + data);
        }
      }
      process.stdout.write(socket.name + ': ' + data.toString());
    });
});

process.stdin.on('data', (data) => {
  for (var i = 0; i < users.length; i++) {
    users[i].write('[ADMIN]: ' + data);
  }
});

server.listen('6969', () =>{
  console.log('server listening on port 6969');
});