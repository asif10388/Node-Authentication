const router = require('express').Router();
const verify = require('./verifytoken');


router.get('/', verify, (req, res) => {
    res.json({username:"asif", status:"logged in"})
})
















module.exports = router;