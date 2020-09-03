const router = require('express').Router();
const dbUser = require('../models/user');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/register', async (req, res) => {
    //VALDIATE
     const {error} = registerValidation(req.body);
     if(error) return res.status(400).send(error.details[0].message);

     //Check already EXISTING
     const emailExists = await dbUser.findOne({email: req.body.email});
     if(emailExists) return res.status(400).send("Email already exists");

     //Hash passwords

     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new dbUser({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        discordId: req.body.discordId,
        roles: req.body.roles
    })

    try {
        const saveUser = await user.save();
        res.send({user:user._id});
    } catch (err) {
        res.status(400).send(err)
    }
});

//LOGIN
router.post('/login', async (req, res) => {

    //VALDIATE
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);


 //Check if email doesn't EXIST
 const user = await dbUser.findOne({email: req.body.email});
 if(!user) return res.status(400).send("Email or password is wrong");

 //Check pass
 const isPassValid = await bcrypt.compare(req.body.password, user.password);
 if(!isPassValid) return res.status(400).send("Invalid Passowrd");

 //CREATE TOKEN

 const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
 res.header('auth-token', token).send(token);
})

module.exports = router;