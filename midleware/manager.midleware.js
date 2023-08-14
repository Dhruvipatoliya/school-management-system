const jwt = require('jsonwebtoken')
const manager = require('../model/manager.model')
const manager_token = async(req,res,next)=>{
    var token = req.cookies.manager_jwt
    if(token){
        var managerdata = await jwt.verify(token,process.env.KEY,(err,data)=>{
            if(err){
                console.log(err);
            } else {
                return data;
            }
        }) 
        if(managerdata == undefined){
            res.redirect('/manager')
        } else {
            var data = await manager.findById(managerdata.userid)
            if(data == null){
                res.redirect('/manager')
            } else {
                next()
            }
        }
    } else {
        res.redirect('/manager')
    }
}
module.exports = manager_token