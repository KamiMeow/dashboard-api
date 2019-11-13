const router = require('express').Router();

router.use('/info-types', require('../InfoType'));
router.use('/accounts', require('../Accounts'));
router.use('/github', require('../GitHub'));
router.use('/user', require('../User').userRouter);

module.exports = router;
