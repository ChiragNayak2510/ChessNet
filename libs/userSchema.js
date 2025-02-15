const mongoose = require('mongoose')

    const userSchema = new mongoose.Schema({
        name : {type:String},
        username : {type:String,unique:true},
        email : {type:String,unique:true},
        hashedPassword : {type:String},
        bio : {type:String},
        image : {type:String},
        coverImage : {type:String},
        profileImage : {type:String},
    },{timestamps : true});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
