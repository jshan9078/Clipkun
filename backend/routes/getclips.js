const router = require('express').Router()
const Clip = require('../model/clip')

router.post('/',async (req, res) => {
    try {
        const {owner} = req.body;
        const clips = await Clip.find({owner:owner});
        res.json(clips);
    } catch (err){
        console.log(err);
    }
});


module.exports = router;