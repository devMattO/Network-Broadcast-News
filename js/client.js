const net = require('net');
const client = new net.Socket();

client.connect({port: 6969}, (() => {
  console.log('connected to server');
  console.log('Choose a dope ass username!');
  process.stdin.on('data', ( data ) => {
    client.write(data);
  });
}));

client.on('data', (data)=>{
  process.stdout.write(data);
});


