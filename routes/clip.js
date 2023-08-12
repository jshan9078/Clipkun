const router = require('express').Router()
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const Clip = require('../model/clip')

router.post('/',upload.single('video'),async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path, {resource_type: "video"});
        
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

        await clip.save();
        res.json(clip);
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