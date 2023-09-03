const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require('path');
const dotenv = require('dotenv');
const cors=require('cors');
dotenv.config({path:'../.env'});

//connect to mongoDB
mongoose.connect(process.env.MONGO_URI, {})
.then(()=>{
    console.log("mongoDB is connected");
})
.catch((err)=>{
    console.log(err);
});

//middleware


const setHeaders = function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    next();
}

app.use(setHeaders)
app.use(express.json());


app.use('/getuser',require('./routes/getuser'))
app.use('/getuser',require('./routes/getuser'))
app.use('/getclips',require('./routes/getclips'))
app.use('/register',require('./routes/register'))
app.use('/login',require('./routes/login'))
app.use('/clip',require('./routes/clip'))


app.listen(5000, ()=>{
    console.log("Server is running");
})