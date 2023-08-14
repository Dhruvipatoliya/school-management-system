const express = require('express')
const router = express.Router()
const upload = require('../cloud/multer')
const manager_token = require('../midleware/manager.midleware')
const {
    mLogin,
    mLogindata,
    mDashboard,
    Resetpassword,
    SendOTP,
    ConfirmOTP,
    Newpassword,
    sTable,
    sDeletedata,
    sUpdate,
    sUpdatedata,
    sForm,
    sRegisterdata,
    sDetails,
    sFeesreceipt,
} = require('../controller/manager.controller')

router.get('/mLogin',mLogin)
router.post('/mLogindata',mLogindata)
router.get('/mDashboard',manager_token,mDashboard)
router.get('/Resetpassword',Resetpassword)
router.post('/SendOTP',SendOTP)
router.post('/ConfirmOTP',ConfirmOTP)
router.post('/Newpassword',Newpassword)
router.get('/sTable',manager_token,sTable)
router.get('/sForm',manager_token,sForm)
router.post('/sRegisterdata',manager_token,upload.single('img'),sRegisterdata)
router.get('/Sdeletedata/:id',manager_token,sDeletedata)
router.get('/sUpdate/:id',manager_token,sUpdate)
router.post('/sUpdatedata/:id',manager_token,upload.single('img'),sUpdatedata)
router.get('/sDetails/:id',manager_token,sDetails)
router.post('/sFeesreceipt/:id',manager_token,sFeesreceipt)
router.get('/logout',manager_token,async(req,res)=>{
    res.cookie('jwt','')
    res.clearCookie()
    res.redirect('/manager')
})

module.exports = router