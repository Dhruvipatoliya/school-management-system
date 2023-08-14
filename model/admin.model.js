const mongoose = require('mongoose')
const admin = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
})
module.exports = mongoose.model('admin',admin)