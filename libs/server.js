
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const PORT = 8080;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const io = new Server({
  cors: {
    origin: ['https://localhost:3000'],
  },
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
});

server.listen(PORT, () => {
  console.log(`Server listening on *${PORT}`);
});
