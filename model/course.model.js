const mongoose = require('mongoose')
const courseschema = new mongoose.Schema({
    course:{
        type:String
    },
})
module.exports = mongoose.model('course',courseschema)