const router = require('express').Router();

const htmlroutes = require('./htmlroutes')


router.use('/', htmlroutes)



module.exports = router