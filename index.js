const express = require('express')
const path = require('path')
const port = process.env.PORT || 8000
const app = express()
const flash = require('express-flash')
const session = require('express-session')
const cookieparser = require('cookie-parser')

app.use(flash())
app.use(session({
    secret:'my secret',
    saveUninitialized:false,
    resave:false,
}))
app.use(cookieparser())
require('dotenv').config()

app.use(express.urlencoded({extended:true}))

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

app.use(express.static(path.join(__dirname,'assets')))
require('./config/database')

app.use('/admin',require('./router/admin.router'))
app.get('/admin',(req,res)=>{
    res.redirect('/admin/aLogin')
})

app.use('/manager',require('./router/manager.router'))
app.get('/manager',(req,res)=>{
    res.redirect('/manager/mLogin')
})

app.use('/student',require('./router/student.router'))
app.get('/',(req,res)=>{
    res.redirect('/student/sLogin')
})

app.listen(port,(err)=>{
    if(err){
        console.log(err);
    } else {
        console.log('server is running on',port);
    }
})