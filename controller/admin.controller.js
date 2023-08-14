const express = require('express')
const admin = require('../model/admin.model')
const manager = require('../model/manager.model')
const courseschema = require('../model/course.model')
const cloudinary = require('../cloud/cloudinary')
const admin_jwt = require('jsonwebtoken')

//admin login get method
exports.aLogin = async(req,res)=>{
    try {
        res.render('aLogin')
    } catch (error) {
        console.log(error,'catch error');
    }
}
 
//admin login data post method
exports.aLogindata = async(req,res)=>{
    try {
        const {email,password} = req.body
        const checkdata = await admin.findOne({email})
        if(checkdata == null){
            console.log('Please register or enter valid email address');
            req.flash('success','Please register or enter valid email address')
            res.redirect('back')
        } else {
            if(checkdata.password == password){
                console.log('Login successfully');
                req.flash('success','Login successfully')

                var token = await admin_jwt.sign({userid:checkdata._id},process.env.KEY)
                res.cookie('admin_jwt',token,{expires:new Date(Date.now()+24*60*60*1000)})

                res.redirect('/admin/aDashboard')
            } else {
                console.log('Please enter valid password');
                req.flash('success','Please enter valid password')
                res.redirect('back')
            }
        }
    } catch (error) {
        console.log(error,'catch error');
    }
}

//admin dashboard get method
exports.aDashboard = async(req,res)=>{
    try {
        var data = await manager.find({})
        var course = await courseschema.find({})
        res.render('aDashboard',{data,course})
    } catch (error) {
        console.log(error,'catch error');
    }
}

//manager register get method
exports.mRegister = async(req,res)=>{
    try {
        res.render('mRegister')
    } catch (error) {
        console.log(error,'catch error');
    }
}

//manager register data post method
exports.mRegisterdata = async(req,res)=>{
    try {
        const {name,email,password} = req.body
        var checkdata = await manager.findOne({email})
        if(checkdata == null){
            const data = await manager.create({
                name,
                email,
                password,
            })
            console.log('register successfully');
            req.flash('success','Register successfully')
            res.redirect('/admin/aDashboard')
        } else {
            console.log('email already exits');
            req.flash('success','email already exits')
            res.redirect('back')
        }
    } catch (error) {
        console.log(error,'catch error');
    }
}

//manager table get method
exports.mTable = async(req,res)=>{
    try {
        var data = await manager.find({})
        res.render('mTable',{data})
    } catch (error) {
        console.log(error,'catch error');
    }
}

//manager delete data get method
exports.mDeletedata = async(req,res)=>{
    try {
        var data = await manager.findByIdAndDelete(req.params.id)
        if(data){
            console.log('manager data deleted successfully');
            req.flash('success','manager data deleted successfully')
            res.redirect('back')
        } else {
            console.log('manager data not deleted successfully');
            req.flash('success','manager data not deleted successfully')
            res.redirect('back')
        }
    } catch (error) {
        console.log(error,'catch error');
    }
}

//manager update get method
exports.mUpdate = async(req,res)=>{
    try {
        var data = await manager.findById(req.params.id)
        res.render('mUpdate',{data})
    } catch (error) {
        console.log(error,'catch error');
    }
}

//manager update data post method
exports.mUpdatedata = async(req,res)=>{
    try {
        var email = req.body.email
        var checkdata = await manager.findOne({email})
        if(checkdata == null){
            var updatedata = await manager.findByIdAndUpdate(req.params.id,req.body)
        if(updatedata){
            console.log('manager data updated successfully');
            req.flash('success','Manager data updated successfully')
            res.redirect('/admin/mTable')
        } else {
            console.log('manager data not updated successfully');
            req.flash('success','Manager data not updated successfully')
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

//manager course api post method
exports.mCourse = async(req,res)=>{
    try {
        console.log(req.body);
        var course = await courseschema.create({course:req.body.course})
        res.redirect('/admin/aDashboard')
    } catch (error) {
        console.log(error,'catch error');
    }
}

//course delete data get method
exports.mCoursedelete = async(req,res)=>{
    try {
        var data = await courseschema.findByIdAndDelete(req.params.id)
        if(data){
            console.log('course data deleted successfully');
            req.flash('success','Course data deleted successfully')
            res.redirect('back')
        } else {
            console.log('course data not deleted successfully');
            req.flash('success','Course data not deleted successfully')
            res.redirect('back')
        }
    } catch (error) {
        console.log(error,'catch error');
    }
}