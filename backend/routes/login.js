const router = require('express').Router()
const User = require('../model/user')

router.post('/',async (req, res) => {
    const {email, password} = req.body;
    User.findOne({email:email})
    .then(user =>{
        if (user){
            if(user.password===password){
                res.json("Success");
            }
            else{
                res.json("The password is incorrect.");
            }
        }
        else{
            res.json("No user with that email exists.");
        }
    })
});






module.exports = router;