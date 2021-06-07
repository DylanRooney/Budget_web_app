const router = require('express').Router();
const { User } = require('../models');

// SIGN UP
router.post('/signup', async (req, res) => {
    // console.log(req.body);
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
            return;
        });
        window.location.replace('/profile');
        console.log(`Logged in: ${req.session.loggedIn}`);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
        return;
    }
});

// LOG IN
router.post('/login', async (req, res) => {
    console.log(req.body);
    try {
        const userData = await User.findOne({
            where: {
                username: req.body.username,
                // validate username
            },
        });
        console.log(userData);
        if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password' });
            return;
        }
        const validatePassword = await userData.checkPassword(req.body.password);
        if (!validatePassword) {
            res.status(400).json({ message: 'Incorrect email or password' });
            return;
        }
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.email = userData.email;
            res.status(200).json({ user: userData, message: "Logged in!" });
            return;
        });
        console.log(`${req.session.email} is logged in: ${req.session.loggedIn}`);
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