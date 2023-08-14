const mongoose = require('mongoose')
const manager = new mongoose.Schema({
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
module.exports = mongoose.model('manager',manager)