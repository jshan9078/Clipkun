const router = require('express').Router()
const User = require('../model/user')

router.post('/',async (req, res) => {
    const {name, password} = req.body;
    const arr = await User.find({});
    const userCount=arr.length+1;

    User.findOne({name:name})
    .then(user =>{
        if (user){
            res.json("A user with that name already exists.")
        }
        else{
            User.create({name,password,userCount})
            .then(res.json("Success"))
            .catch(err=>res.json(err));
        }
    })
});



module.exports = router;