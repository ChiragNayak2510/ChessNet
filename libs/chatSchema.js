const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    sender_id : {type:String},
    receiver_id : {type:String},
    timestamp : {type:Date,default: Date.now},
    message : {type:String}
})

module.exports = mongoose.models.Chat || mongoose.model('Chat', chatSchema);