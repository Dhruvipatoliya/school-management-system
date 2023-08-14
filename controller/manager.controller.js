const express = require('express')
const manager = require('../model/manager.model')
const student = require('../model/student.model')
const studentfees = require('../model/studentfees.model')
const courseschema = require('../model/course.model')
const nodemailer = require('nodemailer')
const cloudinary = require('../cloud/cloudinary')
const manager_jwt = require('jsonwebtoken')
const { findOne } = require('../model/admin.model')

//manager login get method
exports.mLogin = async(req,res)=>{
    try {
        res.render('mLogin')
    } catch (error) {
        console.log(error,'catch error');
    }
}

//manager Login data post method
exports.mLogindata = async(req,res)=>{
    try {
        console.log(req.body);
        const {email, password} = req.body
        var checkdata = await manager.findOne({email})
        if(checkdata == null){
            console.log('please register or enter valid email address');
            req.flash('success','please register or enter valid email address')
            res.redirect('back')
        } else {
            if(checkdata.password == password){
                console.log('login successfully');
                req.flash('success','login successfully')

                var token = await manager_jwt.sign({userid:checkdata._id},process.env.KEY)
                res.cookie('manager_jwt',token,{expires:new Date(Date.now()+24*60*60*1000)})

                res.redirect('/manager/mDashboard')
            } else {
                console.log('please enter valid password');
                req.flash('success','please enter valid password')
                res.redirect('back')
            }
        }
    } catch (error) {
        console.log(error,'catch error');
    }
}

//manager dashboard get method
exports.mDashboard = async(req,res)=>{
    try {
        var data = await student.find({})
        res.render('mDashboard',{data})
    } catch (error) {
        console.log(error,'catch error');
    }
}

//manager reset password get method
exports.Resetpassword = async(req,res)=>{
    try {
        res.render('Resetpassword')
    } catch (error) {
        console.log(error,'catch error');
    }
}

//manager send OTP via email post method
exports.SendOTP = async(req,res)=>{
    try {
        console.log(req.body);
        var data = await manager.findOne({email : req.body.email})
        if(data == null){
            console.log('email not found');
            req.flash('success','Email not found')
            res.redirect('back')
        } else {
            console.log('email found');
            var transport = nodemailer.createTransport({
                service : 'gmail',
                auth : {
                    user : 'dhruvipatoliya61@gmail.com',
                    pass : 'ttausmxtayqxpzpf'
                }
            })
            var otp = Math.ceil(Math.random() * 1000000)
            var info = transport.sendMail({
                from : 'dhruvipatoliya61@gmail.com',
                to : data.email,
                html : `OTP : ${otp}`
            })
            if(info){
                console.log(otp);
                res.cookie('otp',[otp,data.email])
                console.log('otp send successfully');
                req.flash('success','OTP send successfully')
                res.render('ConfirmOTP')
            } else {
                console.log('otp not send successfully');
                req.flash('success','OTP not send successfully')
                res.redirect('back')
            }
        }
    } catch (error) {
        console.log(error,'catch error');
    }
}

//manager sed confirm OTP via email post method
exports.ConfirmOTP = async(req,res)=>{
    try {
        console.log(req.body, req.cookie);
        if(req.body.otp == req.cookies.otp[0]){
            res.render('Newpassword')
        } else {
            res.redirect('back')
        }
    } catch (error) {
        console.log(error,'catch error');
    }
}

//manager new password post method
exports.Newpassword = async(req,res)=>{
    try {
        var data = await manager.findOne({email : req.cookies.otp[1]},{password : req.body.password})
        if(data){
            console.log('password changed successfully');
            req.flash('success','Password changed successfully')
            res.redirect('/manager')
        } else {
            console.log('password not changed successfully');
            req.flash('success', 'Password not changed successfully')
            res.redirect('back')
        }
    } catch (error) {
        console.log(error,'catch error');
    }
}

//manager show student data table get method
exports.sTable = async(req,res)=>{
    try {
        var data = await student.find({})
        res.render('sTable',{data})
    } catch (error) {
        console.log(error,'catch error');
    }
}

//manager add student details form get method
exports.sForm = async(req,res)=>{
    try {
        var course = await courseschema.find({})
        res.render('sForm',{course})
    } catch (error) {
        console.log(error,'catch error');
    }
}

//manager add student details register data post method
exports.sRegisterdata = async(req,res)=>{
    try {
        console.log(req.body);
        console.log(req.file);
        if(req.file){
            var imgdata = await cloudinary.uploader.upload(req.file.path)
            var img = imgdata.secure_url
            var img_id = imgdata.public_id
        }

        const {name,email,phone,fathername,fatherphone,course,batchtime,admissiondate,feeamount,address} = req.body
        var password = req.body.phone
        var checkdata = await student.findOne({email})
        if(checkdata == null){
            const data = await student.create({
                name,
                email,
                phone,
                fathername,
                fatherphone,
                course,
                batchtime,
                admissiondate,
                feeamount,
                address,
                img,
                img_id,
                password
            })
            if(data){
                console.log('student data registered successfully');
                req.flash('success','Student data registered successfully')
                res.redirect('back')
            } else {
                console.log('student data registered successfully');
                req.flash('success','student data registered successfully')
                res.redirect('back')
            }
        } else {
            console.log('email already exits');
            req.flash('success','Email already exits')
            res.redirect('back')
        }
        
    } catch (error) {
        console.log(error,'catch error');
    }
}

//manager delete student data get method
exports.sDeletedata = async(req,res)=>{
    try {
        var data = await student.findById(req.params.id)
        console.log(req.file);
        if(req.file){
            cloudinary.uploader.destroy(data.img_id,(err,result)=>{
                if(err){
                    console.log(err);
                } else {
                    console.log(result);
                }
            })
        }
        var deletedata = await student.findByIdAndDelete(req.params.id)
        if(deletedata){
            console.log('student data deleted successfully');
            req.flash('success','Student data deleted successfully')
            res.redirect('back')
        } else {
            console.log('student data not deleted successfully');
            req.flash('success','Student data not deleted successfully')
            res.redirect('back')
        }
    } catch (error) {
        console.log(error,'catch error');
    }
}

//manager update get method
exports.sUpdate = async(req,res)=>{
    try {
        var data = await student.findById(req.params.id)
        res.render('sUpdatedata',{data})
    } catch (error) {
        console.log(error,'catch error');
    }
}

//manager update student login data post method 
exports.sUpdatedata = async(req,res)=>{
    try {
        var data = await student.findById(req.params.id)
        if(req.file){
            cloudinary.uploader.destroy(data.img_id,(err,result)=>{
                if(err){
                    console.log(err);
                } else {
                    console.log(result);
                }
            })
        }

        if(req.file){
            var imgdata = await cloudinary.uploader.upload(req.file.path)
            var img = imgdata.secure_url
            var img_id = imgdata.public_id
        }
        var email = req.body.email
        req.body.img = img
        req.body.img_id = img_id

        var checkdata = await student.find({email})
        if(checkdata.length == 0){
            var updatedata = await student.findByIdAndUpdate(req.params.id,req.body)
            if(updatedata){
                console.log('student data updated successfully');
                req.flash('success','Student login data updated successfully')
                res.redirect('/manager/mDashboard')
            } else {
                console.log('student data not updated successfully');
                req.flash('success','Student login data not updated successfully')
                res.redirect('back')
            }
        } else {
            console.log('updated email already exits');
            req.flash('success','Updated email already exits')
            res.redirect('back')
        }
    } catch (error) {
        console.log(error,'catch error');
    }
}

//manager show all data with details get method
exports.sDetails = async(req,res)=>{
    try {
        var data = await student.findById(req.params.id)
        var fees = await studentfees.find({student_id : req.params.id})
        var last_fees = fees.slice(-1)
        res.render('sDetails',{data, last_fees})
    } catch (error) {
        console.log(error,'catch error');
    }
}

//manager student fee receipt post method
exports.sFeesreceipt = async(req,res)=>{
    try {
        console.log(req.body);
        var student_id = req.params.id
        const {student_fee,date,payment_type} = req.body
        var data = await student.findById(req.params.id)

        var fees = await studentfees.find({student_id:req.params.id})
        var last_fees = await fees.slice(-1)

        var paid_fees = parseInt(data.paid_fee) + parseInt(req.body.student_fees)
        var pending_fees = data.feeamount - paid_fees

        console.log(paid_fees,pending_fees,"jnsugsj"); 

        var update = await student.findByIdAndUpdate(req.params.id, { pending_fees, paid_fees })

        var fee_receipt = await studentfees.create({
            student_fee,
            date,
            payment_type,
            student_id
        })
        res.redirect('back')
    } catch (error) {
        console.log(error,'catch error');
    }
}