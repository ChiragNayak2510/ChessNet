const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    roomId : {type:String},
    senderId: { type: String },
    receiverId: { type: String },
    timestamp: { type: Date, default: Date.now },
    message: { type: String },
  });

module.exports = mongoose.models.Chats || mongoose.model('Chats', chatSchema);

