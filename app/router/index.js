const router = require('express').Router();

router.use('/statistic-types', require('../StatisticType'));
router.use('/statistic', require('../Statistic').router)
router.use('/user', require('../User').userRouter);
router.use('/info-types', require('../InfoType'));
router.use('/accounts', require('../Accounts'));

module.exports = router;
