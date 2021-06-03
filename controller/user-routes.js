const router = require('express').Router();
const { User } = require('../models');

const bodyParser = require('body-parser');
const { route } = require('./htmlroutes');
const { features } = require('process');
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
        // logging user in and saving session
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

// LOG IN
router.post('/login', urlEncodedParser, async (req, res) => {
    console.log(req.body);
    try {
        const userData = await User.findOne({
            where: {
                username: req.body.username,
            },
        });
        console.log(userData);
        if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password' });
            return;
        }

        const validatePassword = await userData.checkPassword(req.body.password);
        if (!validatePassword) {
            res.stauts(400).json({ message: 'Incorrect email or password' });
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.email = userData.email;
            res.status(200).json({ user: userData, message: "Logged in!" });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// LOGOUT
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end().json({ message: "Logged out!" })
        });
    } else {
        res.status(404).end();
    }
});


module.exports = router