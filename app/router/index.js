const router = require('express').Router();

router.use('/statistic-types', require('../StatisticType'));
router.use('/info-types', require('../InfoType'));
router.use('/statistic', require('../Statistic'))
router.use('/accounts', require('../Accounts'));
router.use('/user', require('../User').userRouter);

module.exports = router;
