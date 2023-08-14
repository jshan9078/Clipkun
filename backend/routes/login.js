const router = require('express').Router()
const User = require('../model/user')

router.post('/',async (req, res) => {
    const {name, password} = req.body;
    User.findOne({name:name})
    .then(user =>{
        if (user){
            if(user.password===password){
                res.json(user);
            }
            else{
                res.json("The password is incorrect.");
            }
        }
        else{
            res.json("No user with that name exists.");
        }
    })
});






module.exports = router;