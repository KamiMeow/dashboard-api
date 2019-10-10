const router = require('express').Router();

router.use('/contact-types', require('./ContactType'));

module.exports = router;
