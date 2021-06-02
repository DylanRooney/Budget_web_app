const router = require('express').Router();

router.get('/', async (req, res,) => {
    try {
        // if the user is unauthenticated
        res.render('login')
        // otherwise
        // res.render("some dashboard page thingy")

    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/signup', async (req, res,) => {
    try {
        // if the user is unauthenticated
        res.render('signup')
        // otherwise
        // res.render("some dashboard page thingy")

    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router