const router = require('express').Router()
const cloudinary = require("../utils/cloudinary.js");
const upload = require("../utils/multer");
const Clip = require('../model/clip')
const User = require('../model/user');

router.post('/',upload.single('video'),async (req, res) => {
    try {
        const user = await User.findOne({name:req.body.owner});
        if (user.clipCount+1>15){
            res.json("Clip limit exceeded.");
        }
        else{
            const file = req.body.url;
            const result = await cloudinary.uploader.upload(file, {resource_type: "video"});
            const url = result.secure_url;
            const urlarr = url.split('upload');
            const endTime="389";
            const startTime="383";
            const newurl = urlarr[0]+'upload/eo_'+ endTime + ',so_' + startTime + urlarr[1];
            const result2 = await cloudinary.uploader.upload(newurl, {resource_type: "video"});
            console.log(result2);
            let clip = new Clip({
                name: req.body.name,
                cloudinary_id: result2.public_id,
                anime: req.body.anime,
                episode: req.body.episode,
                owner: req.body.owner,
                url: result2.secure_url,
                duration: result2.duration,
                size: result2.bytes,
                playback: result2.playback_url,
            });
            const filter = {name:req.body.owner};
            const update = { clipCount: user.clipCount+1, storage: user.storage+result2.bytes}; 
            const doc = await User.findOneAndUpdate(filter, update, {
                new: true
              });
            await clip.save();
            await cloudinary.uploader.destroy(result.public_id,{resource_type: "video"});
            res.json(result2);
        }
        
    } catch (err){
        console.log(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        let clip = await Clip.findById(req.params.id);
        const user = await User.findOne({name:clip.owner});
        const filter = {name:clip.owner};
        const update = { clipCount: user.clipCount-1, storage: user.storage-clip.size}; 
        const doc = await User.findOneAndUpdate(filter, update, {
            new:true
        });
        await cloudinary.uploader.destroy(clip.cloudinary_id,{resource_type: "video"}); //remove from storage
        await clip.deleteOne(); //remove from db
        res.json(user);
    } catch (err){
        console.log(err);
    }
});




module.exports = router;