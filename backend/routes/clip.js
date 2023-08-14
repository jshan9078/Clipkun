const router = require('express').Router()
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const Clip = require('../model/clip')
const User = require('../model/user');

router.post('/',upload.single('video'),async (req, res) => {
    try {
        const file = req.file;
        const user = await User.findOne({name:req.body.owner});
        if (user.clipCount+1>10){
            res.json("Clip limit exceeded.");
        }
        else if (user.storage+file.size>100000000){
            res.json("Account storage limit exceeded.");
        }
        else{
            const result = await cloudinary.uploader.upload(file.path, {resource_type: "video"});
            let clip = new Clip({
                name: req.body.name,
                cloudinary_id: result.public_id,
                anime: req.body.anime,
                episode: req.body.episode,
                owner: req.body.owner,
                url: result.secure_url,
                duration: result.duration,
                size: result.bytes,
            });
            const filter = {name:req.body.owner};
            const update = { clipCount: user.clipCount+1, storage: user.storage+result.bytes}; 
            const doc = await User.findOneAndUpdate(filter, update, {
                new: true
              });
            await clip.save();
            res.json("Clip uploaded");
        }
        
    } catch (err){
        console.log(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        let clip = await Clip.findById(req.params.id);
        await cloudinary.uploader.destroy(clip.cloudinary_id,{resource_type: "video"}); //remove from storage
        await clip.deleteOne(); //remove from db
        res.json(clip);
    } catch (err){
        console.log(err);
    }
});




module.exports = router;