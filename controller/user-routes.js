const router = require('express').Router();
const { User } = require('../models');

const bodyParser = require('body-parser');
const { route } = require('./htmlroutes');
const urlEncodedParser = bodyParser.urlencoded({ extended: false })

// SIGN UP
router.post('/signup', urlEncodedParser, async (req, res) => {
    console.log(req.body);
    try {
        // inserting user from request into the db
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        console.log(newUser)
        // logging user in
        req.session.save(() => {
            req.session.loggedIn = true
            req.session.email = newUser.email
            res.status(200).json(newUser);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router