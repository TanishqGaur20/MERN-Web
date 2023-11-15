const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Authenticate = require('../middleware/authenticate');
const cookieparser = require('cookie-parser');
router.use(cookieparser());

require('../DB/conn');
const User = require('../model/userSchema');

router.get('/', (req, res) => {
    res.send('hello world from routerjs');
})


router.post('/register', async (req, res) => {

    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "Fill all fields" })
    }
    try {
        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(422).json({ error: "email already exist" });
        }
        if (password != cpassword) {
            return res.status(422).json({ error: "Password not matching" });
        }
        else {
            const user = new User({ name, email, phone, work, password, cpassword });
            await user.save();
            res.status(201).json({ message: "registered successfully" });
        }

    } catch (err) {
        console.log(err);
    }
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {

        if (!email || !password) {
            return res.status(400).json({ error: "fill the data" });
        }

        const validate = await User.findOne({ email: email });

        if (validate) {

            const ismatch = await bcrypt.compare(password, validate.password);
            token = await validate.generateAuthToken();
            res.cookie('jwtoken', token, {
                expires: new Date(Date.now() + 258920000000),
                httponly: true
            })
            if (!ismatch) {
                res.status(400).json('password not match ');
                window.alert('password not match');
                console.log("pass not exist");
            }
            else {
                res.json('User signin successfully');
            }
        }
        else {
            res.status(400).json(' Email doesnt exist');
            window.alert('email not match');
            console.log("email not exist");
        }

    } catch (err) {
        console.log(err);
    }
})




router.get('/about', Authenticate, (req, res) => {
    res.send(req.rootUser);
})


router.get('/getdata', Authenticate, (req, res) => {
    res.send(req.rootUser);
})
router.get('/logout', Authenticate, (req, res) => {
    res.clearCookie('jwtoken', { path: '/' })
    res.status(200).send('userlogout')
})

module.exports = router;