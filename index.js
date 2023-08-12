const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

//connect to mongoDB
mongoose.connect(process.env.MONGO_URI, {})
.then(()=>{
    console.log("mongoDB is connected");
})
.catch((err)=>{
    console.log(err);
});

//middleware
app.use(express.json())
app.use('/clip',require('./routes/clip'))

app.listen(5000, ()=>{
    console.log("Server is running");
})