const router = require('express').Router();
const { User } = require('../models');
const { check, validationResult } = require('express-validator');

// SIGN UP
router.post('/signup',
    check('email').custom(value => {
        return User.findOne({
            where: {
                email: value
            }
        }).then(user => {
            if (user) {
                return Promise.reject('Email already in use')
            }
        });
    })
        .isEmail()
        .withMessage('Not a valid email address'),
    check('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
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
                req.session.loggedIn = true;
                req.session.user_id = newUser.id;
                req.session.email = newUser.email;
                res.status(200).json(newUser);
                return;
            });
            console.log(`Logged in: ${req.session.loggedIn}`);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
            return;
        }
    });

// LOG IN
router.post('/login',
    check('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters'),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
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
                res.status(400).json({ message: 'Incorrect email or password' });
                return;
            }
            req.session.save(() => {
                req.session.loggedIn = true;
                req.session.user_id = userData.id;
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
            res.status(204).end()
        });
    } else {
        res.status(404).end();
    }
});


module.exports = router