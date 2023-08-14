const router = require('express').Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');

router.post('/',async (req, res) => {
    const {name, password} = req.body;
    User.findOne({name:name})
    .then(user =>{
        if (user){
            bcrypt.compare(password,user.password,(err, data) => {
                if (err){
                    throw err;
                }
                if (data) {
                    return res.json(user);
                } 
                else {
                    return res.json("The password is incorrect.");
                }

            });
        }
        else{
            res.json("No user with that name exists.");
        }
    })
});






module.exports = router;