const InfoType = require('./InfoType');
const router = require('express').Router();

router.get('/', (req, res) => {
  InfoType.find({}, (err, types) => {
    if (err) throw err;
    res.send(types);
  });
});
router.get('/:id', (req, res) => {
  console.log(req.params.id);
  InfoType.findById(req.params.id, (err, type) => {
    if (err) throw err;
    res.send(type);
  });
});

router.post('/', (req, res) => {
  const { name, type, validation } = req.body
  InfoType.create({ name, type, validation }, (err, type) => {
    if (err) throw err;
    res.status(201).send(type);
  });
});

router.put('/:id', (req, res) => {
  InfoType.findById(req.params.id, (err, infoType) => {
    const name = req.body.name || infoType.name;
    const type = req.body.type || infoType.type;
    const validation = req.body.validation || infoType.validation;

    InfoType.updateOne({ _id: infoType._id },
      { name, type, validation },
      { new: true },
      (err, type) => {
        if (err) throw err;
        res.send(type);
      });
  });
});

router.delete(':/id', (req, res) => {
  res.send('delete');
  InfoType.findById(req.params.id, (err, type) => {
    if (err) throw err;
    res.send(type);
  });
});

module.exports = router;
