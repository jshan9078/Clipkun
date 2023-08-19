const mongoose = require("mongoose");
const clipSchema = new mongoose.Schema({
    name: {
        type:String,
    },
    cloudinary_id:{
        type:String,
    },
    anime:{
        type:String,
    },
    episode:{
        type:String,
    },
    owner:{
        type:String,
    },
    url:{
        type:String,
    },
    duration:{
        type:String,
    },
    size:{
        type:String,
    },
    playback:{
        type:String,
    }
});

module.exports = mongoose.model("Clip",clipSchema);