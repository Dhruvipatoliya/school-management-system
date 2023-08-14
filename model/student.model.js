const mongoose = require('mongoose')
const student = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:String
    },
    fathername:{
        type:String
    },
    fatherphone:{
        type:String
    },
    course:{
        type:String
    },
    batchtime:{
        type:String
    },
    admissiondate:{
        type:String
    },
    feeamount:{
        type:Number
    },
    address:{
        type:String
    },
    img:{
        type:String
    },
    img_id:{
        type:String
    },
    password:{
        type:String
    },
    newpassword:{
        type:String
    },
    pending_fee:{
        type:Number,
        default : 0
    },
    paid_fee:{
        type:Number,
        default : 0
    }
})
module.exports = mongoose.model('student',student)