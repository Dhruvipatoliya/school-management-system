const express = require('express')
const router = express.Router()
const upload = require('../cloud/multer')
const admin_token = require('../midleware/admin.midleware')
const {
    aLogin,
    aLogindata,
    aDashboard,
    mRegister,
    mRegisterdata,
    mTable,
    mDeletedata,
    mUpdate,
    mUpdatedata,
    aProfile,
    mCourse,
    mCoursedelete
} = require('../controller/admin.controller')

router.get('/aLogin',aLogin)
router.post('/aLogindata',aLogindata)
router.get('/aDashboard',admin_token,aDashboard)
router.get('/mRegister',admin_token,mRegister)
router.post('/mRegisterdata',admin_token,mRegisterdata)
router.get('/mTable',admin_token,mTable)
router.get('/mDeletedata/:id',admin_token,mDeletedata)
router.get('/mUpdate/:id',admin_token,mUpdate)
router.post('/mUpdatedata/:id',admin_token,mUpdatedata)
router.post('/mCourse',admin_token,mCourse)
router.get('/mCoursedelete/:id',admin_token,mCoursedelete)
router.get('/logout',admin_token,async(req,res)=>{
    res.cookie('jwt','')
    res.clearCookie()
    res.redirect('/admin')
})

module.exports = router