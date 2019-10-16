const router = require('express').Router();

router.use('/contact-types', require('../ContactType'));
router.use('/info-types', require('../InfoType'));
router.use('/user', require('../User'));

module.exports = router;
