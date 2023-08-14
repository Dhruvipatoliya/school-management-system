const express = require('express')
const student = require('../model/student.model')
const studentfees = require('../model/studentfees.model')
const cloudinary = require('../cloud/cloudinary')
const student_jwt = require('jsonwebtoken')
const { Long } = require('mongodb')

//student login get method
exports.sLogin = async(req,res)=>{
    try {
        res.render('sLogin')
    } catch (error) {
        console.log(error,'catch error');
    }
}

//student login data post method
exports.sLogindata = async(req,res)=>{
    try {
        console.log(req.body);
        const {email,password} = req.body
        const checkdata = await student.findOne({email})
        if(checkdata == null){
            console.log('please register or enter valid email address');
            req.flash('success','please register or enter valid email address')
            res.redirect('back')
        } else {
            if(checkdata.password == password){
                console.log('login successfully');
                req.flash('success','Login successfully')

                var token = await student_jwt.sign({userid:checkdata._id},process.env.key)
                res.cookie('student_jwt',token,{expires:new Date(Date.now()+24*60*60*1000)})

                res.redirect('/student/sDashboard')
            } else {
                console.log('please enter valid password');
                req.flash('success','Please enter valid password')
                res.redirect('back')
            }
        }
    } catch (error) { 
        console.log(error,'catch error');
    }
}

//student dashboard get method
exports.sDashboard = async(req,res)=>{
    try { 
        var token = req.cookies.student_jwt
        var userdata = await student_jwt.verify(token, process.env.key)
        var data = await student.findById(userdata.userid)
        res.render('sDashboard',{data})
    } catch (error) {
        console.log(error,'catch error');
    }
} 

//student profile get method
exports.sProfile = async(req,res)=>{
    try {
        var token = req.cookies.student_jwt
        var userdata = await student_jwt.verify(token, process.env.key)
        var data = await student.findById(userdata.userid)
        var fees = await studentfees.find({student_id : req.params.id})
        var last_fees = fees.slice(-1)
        res.render('sProfile',{data,last_fees}) 
    } catch (error) {
        console.log(error,'catch error');
    }
}

//change password get method
exports.sChangepassword = async(req,res)=>{
    try {
        res.render('sChangepassword')
    } catch (error) {
        console.log(error,'catch error');
    }
}

//change password post method
exports.spassworddata = async(req,res)=>{
    try {
        var token = req.cookies.student_jwt
        var userdata = await student_jwt.verify(token, process.env.key)
        var data = await student.findById(userdata.userid)

        if(data.password == req.body.password){
            console.log('password updated successfully');
            req.flash('success','password updated successfully')
            res.redirect('/student/sDashboard')
        } else {
            console.log('password not updated successfully');
            req.flash('success','password not updated successfully')
            res.redirect('back')
        }
    } catch (error) {
        console.log(error,'catch error');
    }
}