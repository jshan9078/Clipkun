const router = require('express').Router()
const User = require('../model/user')

router.post('/',async (req, res) => {
    User.create(req.body)
    .then(user => res.json(user))
    .catch(err=>res.json(err));
});



module.exports = router;