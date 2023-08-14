const jwt = require('jsonwebtoken')
const student = require('../model/student.model')
const student_token = async(req,res,next)=>{
    var token = req.cookies.student_jwt
    if(token){
        var studentdata = await jwt.verify(token,process.env.KEY,(err,data)=>{
            if(err){
                console.log(err);
            } else {
                return data;
            }
        }) 
        if(studentdata == undefined){
            res.redirect('/')
        } else {
            var data = await student.findById(studentdata.userid)
            if(data == null){
                res.redirect('/')
            } else {
                next()
            }
        }
    } else {
        res.redirect('/')
    }
}
module.exports = student_token