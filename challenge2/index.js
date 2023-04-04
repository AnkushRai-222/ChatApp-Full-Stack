const express = require('express')
const mongoose = require("mongoose")
const route = require("./src/routes/route")
const app  =  express()
app.use(express.json())
mongoose.connect("mongodb+srv://ankushrai222:Ankushrai222@newproject.tknxizt.mongodb.net/hail-cabs",{
    useNewUrlParser: true
})
.then(()=> console.log("DataBase Connected"))
.catch((err)=> console.log(err));

app.use('/',route)

app.listen(process.env.PORT,function(){
    console.log("Server is Running On   " + (process.env.PORT || 3000))
})