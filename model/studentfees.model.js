const mongoose = require('mongoose')
const studentfees = new mongoose.Schema({
    student_fee : {
        type:String
    },
    date:{
        type:String
    },
    payment_type:{ 
        type:String
    },
    student_id:{
        type:String
    },
})
module.exports = mongoose.model('studentfee',studentfees)