const router = require('express').Router();
const Repos = require('./Repos');
const StatisticType = require('../StatisticType/StatisticType');
const Statistic = require('./Statistic');
const User = require('../User/User');
const auth = require('../router/auth');

async function currentDataFromAPI(account, userId) {
  const types = await StatisticType.find({});
  const data = await Repos[account.name](account.value);

  Statistic.deleteMany({ user: userId });
  Object.values(types).forEach(type => {
    const charts = data[type.type];
    if (!charts) return;
    charts.forEach(data => {
      Statistic.create({
        user: userId,
        type: type._id,
        ...data, 
      });
    })
  })
  data.origin = account.name;
  return data;
};

async function getStatistic(userId) {
  const currentStatistics = await Statistic.find({
    user: userId,
  });

  const types = await StatisticType.find();
  currentStatistics.forEach(stat => {
    const type = types.find(t => t._id.toString() === stat.type.toString());
    stat.type = type;
  });
  return currentStatistics;
};

router.get('/refresh', auth.required, async (req, res) => {
  const { id } = req.payload;

  user.getProfile(async (err, { accounts }) => {
    data = accounts.map(account => currentDataFromAPI(account, id));
    await Promise.all(data)
      .then(async data => {
        res.status(200).send(await getStatistic(id));
      })
  })
});

router.get('/', auth.required, async (req, res) => {
  const { id } = req.payload;
  const user = await User.findById(id);

  res.status(200).send({
    data: await getStatistic(id),
    url: user.url,
  });
});

module.exports = router;
