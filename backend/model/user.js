const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
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