const router = require('express').Router()
const User = require('../model/user')
const bcrypt = require('bcrypt');
const cors=require('cors');



router.post('/',async (req, res,next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
    )
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    next();
    let {name, password} = req.body;
    const arr = await User.find({});
    const userCount=arr.length+1;
    const hash = await bcrypt.hash(password,13);
    password=hash;
    const clipCount=0;
    const storage=0;
    User.findOne({name:name})
    .then(user =>{
        if (user){
            res.json("A user with that name already exists.")
        }
        else{
            User.create({name,password,userCount,clipCount,storage})
            .then(res.json("Success"))
            .catch(err=>res.json(err));
        }
    })
});



module.exports = router;