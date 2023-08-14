const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        type:String,
    },
    email: {
        type:String,
    },
    password: {
        type:String,
    },
    userCount:{
        type:Number,
    }
});

module.exports = mongoose.model("User",userSchema);