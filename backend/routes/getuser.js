const router = require('express').Router()
const User = require('../model/user')

router.post('/',async (req, res) => {

    const {name} = req.body;
    User.findOne({name:name})
    .then(user =>{
        return res.json(user);
    })

});


module.exports = router;