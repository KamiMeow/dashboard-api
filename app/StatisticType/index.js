const StatisticType = require('./StatisticType');
const router = require('express').Router();

router.get('/', (req, res) => {
  StatisticType.find({}, (err, types) => {
    if (err) throw err;
    res.send(types);
  });
});
router.get('/:id', (req, res) => {
  StatisticType.findById(req.params.id, (err, type) => {
    if (err) throw err;
    res.send(type);
  });
});

router.post('/', (req, res) => {
  const { type, title } = req.body
  StatisticType.create({ type, title }, (err, type) => {
    if (err) throw err;
    res.status(201).send(type);
  });
});

router.put('/:id', (req, res) => {
  StatisticType.findById(req.params.id, (err, statisticType) => {
    const title = req.body.title || statisticType.title;
    const type = req.body.type || statisticType.type;

    StatisticType.updateOne({ _id: statisticType._id },
      { type, title },
      { new: true },
      (err, type) => {
        if (err) throw err;
        res.send(type);
      });
  });
});

router.delete(':/id', (req, res) => {
  res.send('delete');
  StatisticType.findById(req.params.id, (err, type) => {
    if (err) throw err;
    res.send(type);
  });
});

module.exports = router;
