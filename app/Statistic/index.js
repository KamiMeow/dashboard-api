const router = require('express').Router();
const Repos = require('./Repos');
const StatisticType = require('../StatisticType/StatisticType');
const Dashboard = require('../Dashboard/Dashboard');
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
  const user = await User.findById(id);

  user.getProfile(async (err, { accounts }) => {
    data = accounts.map(account => currentDataFromAPI(account, id));
    await Promise.all(data)
      .then(async data => {
        res.status(200).send(await getStatistic(id));
      })
  })
});

router.post('/save', auth.required, (req, res) => {
  const { id: userId } = req.payload;
  const { id } = req.body;

  Dashboard.create({
    statistic: id,
    user: userId,
  }, (err, dashboard) => {
    if (err) throw err;
    res.status(201).send(dashboard);
  });
});

router.post('/delete', auth.required, (req, res) => {
  const { id: userId } = req.payload;
  const { id } = req.body;

  Dashboard.deleteMany({
    user: userId,
    statistic: id
  }, (err, dashboard) => {
    if (err) throw err;
    res.status(201).send(dashboard);
  });
});

router.get('/dashboard', auth.required, (req, res) => {
  const { id } = req.payload;

  Dashboard.find({ user: id }, async (err, dashboard) => {
    if (err) return;

    let ids = dashboard.map(s => s.statistic);
    const statistics = await Statistic.find({ _id: { $in: ids } });
    await Promise.all(statistics);

    const types = await StatisticType.find();
    statistics.forEach(stat => {
      const type = types.find(t => t._id.toString() === stat.type.toString());
      stat.type = type;
    });
    
    res.status(200).send(statistics);
  });
});

router.get('/user-dashboard', auth.optional, async (req, res) => {
  const { token } = req.params;
  const user = await User.findOne({ origin: token });

  Dashboard.find({ user: user._id }, async (err, dashboard) => {
    if (err) return;

    let ids = dashboard.map(s => s.statistic);
    const statistics = await Statistic.find({ _id: { $in: ids } });
    await Promise.all(statistics);

    const types = await StatisticType.find();
    statistics.forEach(stat => {
      const type = types.find(t => t._id.toString() === stat.type.toString());
      stat.type = type;
    });
    
    res.status(200).send(statistics);
  });
});

router.get('/', auth.required, async (req, res) => {
  const { id } = req.payload;
  const user = await User.findById(id);
  console.log(user);

  res.status(200).send({
    data: await getStatistic(id),
    url: user.url,
  });
});

module.exports = router;
