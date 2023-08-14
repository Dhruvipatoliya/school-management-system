const jwt = require('jsonwebtoken')
const admin = require('../model/admin.model')
const { nextTick } = require('process')
const admin_token = async(req,res,next)=>{
    var token = req.cookies.admin_jwt
    if(token){
        var admindata = await jwt.verify(token,process.env.KEY,(err,data)=>{
            if(err){
                console.log(err);
            } else {
                return data;
            }
        })
        if(admindata == undefined){
            res.redirect('/admin')
        } else {
            var data = await admin.findById(admindata.userid)
            if(data == null){
                res.redirect('/admin')
            } else {
                next()
            }
        }
    } else {
        res.redirect('/admin')
    }
}
module.exports = admin_token