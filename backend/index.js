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

app.use(cors(
    {
        origin: [""],
    }
));

//middleware
app.use(express.json());
app.use(cors());

app.use('/getuser',require('./routes/getuser'))
app.use('/getuser',require('./routes/getuser'))
app.use('/getclips',require('./routes/getclips'))
app.use('/register',require('./routes/register'))
app.use('/login',require('./routes/login'))
app.use('/clip',require('./routes/clip'))


app.listen(5000, ()=>{
    console.log("Server is running");
})