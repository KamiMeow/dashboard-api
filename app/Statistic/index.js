const router = require('express').Router();
const Repos = require('./Repos');
const Statistic = require('./Statistic');
const User = require('../User/User');
const auth = require('../router/auth');

async function currentDataFromAPI(account) {
  const data = await Repos[account.name](account.value);
  data.origin = account.name;
  return data;
};

router.get('/refresh', auth.required, async (req, res) => {
  const { id } = req.payload;
  const user = await User.findById(id);

  user.getProfile(async (err, { accounts }) => {
    data = accounts.map(account => currentDataFromAPI(account));
    await Promise.all(data)
      .then(data => {
        console.log('data', data);
        res.status(200).send(data);
      })
  })
});

router.get('/', auth.required, async (req, res) => {
  const { id } = req.payload;
  const user = await User.findById(id);

  const currentStatistics = await Statistic.find({
    user: id,
  });

  res.status(200).send({
    data: currentStatistics,
    url: user.url,
  });
});

module.exports = router;
