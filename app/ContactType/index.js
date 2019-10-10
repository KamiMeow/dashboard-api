const ContactType = require('./ContactType');
const router = require('express').Router();

function searchByValueOrId(req, callback) {
  const isByValue = req.query.hasOwnProperty('by_value');
  const value = req.params.value;

  if (isByValue) {
    ContactType.findOne({ 'value': 'phone' }, callback);
  }
  else {
    ContactType.findById(value, callback);
  }
}

router.get('/', (req, res) => {
  ContactType.find({}, (err, types) => {
    if (err) return;
    res.send(types);
  });
});
router.get('/:value', (req, res) => {
  searchByValueOrId(req, (err, type) => {
    if (err) throw err;
    res.send(type);
  });
});

router.post('/', (req, res) => {
  const { name, value, regExp, mask } = req.body;

  ContactType.create({ name, value, regExp, mask }, (err, type) => {
    if (err) throw err;
    res.status(201).send(type)
  });
});

router.put('/:value', (req, res) => {
  searchByValueOrId(req, (err, type) => {
    if (err) throw err;

    const regExp = req.body.regExp || type.regExp;
    const name = req.body.name || type.name;
    const mask = req.body.mask || type.mask;

    ContactType.updateOne({ _id: type._id }, { name, regExp, mask }, { new: true }, (err, newType) => {
      if (err) throw err;
      res.send(newType);
    });
  });
});

router.delete('/:value', (req, res) => {
  searchByValueOrId(req, (err, type) => {
    if (err) throw err;

    ContactType.findByIdAndDelete(type._id, err => {
      if (err) throw err;
      res.send(type);
    });
  })
})

module.exports = router;
