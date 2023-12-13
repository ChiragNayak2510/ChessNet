const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : {type:String},
    username : {type:String,unique:true},
    email : {type:String,unique:true},
    hashedPassword : {type:String}
})

module.exports = mongoose.models.User || mongoose.model('User', userSchema);