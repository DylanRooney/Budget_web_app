const router = require('express').Router();

const htmlroutes = require('./htmlroutes')

const userroutes = require('./user-routes')

router.use('/', htmlroutes)

router.use('/user', userroutes);



module.exports = router