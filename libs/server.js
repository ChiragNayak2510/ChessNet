const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const PORT = 8080;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  socket.on('joinRoom', ({ roomId, userId }) => {
    socket.join(roomId);
    console.log('joined room', roomId, userId);
  });

  socket.on('message', (roomId, message) => {
    socket.broadcast.to(roomId).emit('message', message);
    console.log("here", message, roomId);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on *:${PORT}`);
});
