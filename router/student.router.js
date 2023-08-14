const express = require('express')
const router = express.Router()
const upload = require('../cloud/multer')
const student_token = require('../midleware/student.midleware')
const {
    sLogin, 
    sLogindata,
    sDashboard,
    sProfile,
    sChangepassword,
    spassworddata,
} = require('../controller/student.controller')

router.get('/sLogin',sLogin)
router.post('/sLogindata',sLogindata)
router.get('/sDashboard',student_token,sDashboard)
router.get('/sProfile',student_token,sProfile)
router.get('/sChangepassword',student_token,sChangepassword)
router.post('/spassworddata',student_token,spassworddata)
router.get('/logout',student_token,async(req,res)=>{
    res.cookie('jwt','')
    res.clearCookie()
    res.redirect('/')
})

module.exports = router