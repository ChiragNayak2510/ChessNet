const express = require('express');
const mongoose = require('mongoose');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const { connectToDatabase } = require('./mongo');
const PORT = 8080;

const ChatSchema = new mongoose.Schema({
  roomId : {type:String},
  senderId: { type: String },
  receiverId: { type: String },
  timestamp: { type: Date, default: Date.now },
  message: { type: String },
});

const Chat = mongoose.model('Chat', ChatSchema);

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

  socket.on('message', (senderId, receiverId, roomId, message) => {
    socket.broadcast.to(roomId).emit('message', message);
    console.log("here", message, roomId);

    try {
      const createChat = async () => {
        await connectToDatabase()
        const chat = await Chat.create({
          roomId,
          senderId,
          receiverId,
          message
        });
        if (!chat) {
          console.log('Error inserting chat to DB');
        } else {
          console.log('Chat added successfully');
        }
      };
      createChat();
    } catch (err) {
      console.log(err);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on *:${PORT}`);
});
