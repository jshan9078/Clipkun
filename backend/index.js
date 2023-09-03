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

app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
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