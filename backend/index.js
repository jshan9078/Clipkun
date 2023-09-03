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

app.use(function(req, res, next) {
    var oneof = false;
    console.log(req.headers);
    if(req.headers.origin) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        oneof = true;
    }
    if(req.headers['access-control-request-method']) {
        res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
        oneof = true;
    }
    if(req.headers['access-control-request-headers']) {
        res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
        oneof = true;
    }
    if(oneof) {
        res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
    }

    // intercept OPTIONS method
    if (oneof && req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
});





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