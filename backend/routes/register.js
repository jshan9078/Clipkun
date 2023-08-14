const router = require('express').Router()
const User = require('../model/user')

router.post('/',async (req, res) => {
    const {name, email, password} = req.body;
    const arr = await User.find({});
    const userCount=arr.length+1;

    User.findOne({email:email})
    .then(user =>{
        if (user){
            res.json("A user with that email already exists.")
        }
        else{
            User.create({name,email,password,userCount})
            .then(res.json("Success"))
            .catch(err=>res.json(err));
        }
    })
});



module.exports = router;