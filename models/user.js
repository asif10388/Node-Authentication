const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        max:15
    },
    email:{
        type:String,
        required:true,
        max:255
    },
    password:{
        type:String,
        required:true,
        max:1024,
        min:8
    },
    discordID:{
        type:String,
        min:4
    },
    roles:[],
})

module.exports = mongoose.model('User', userSchema);