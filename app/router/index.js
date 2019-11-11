const router = require('express').Router();

router.use('/contact-types', require('../Accounts'));
router.use('/info-types', require('../InfoType'));
router.use('/user', require('../User').userRouter);

module.exports = router;
