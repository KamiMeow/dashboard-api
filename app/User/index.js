const router = require('express').Router();
const passport = require('passport');
const auth = require('../router/auth');
const User = require('./User');

router.get('/profile', auth.required, (req, res, next) => {
  const { id } = req.payload;

  return User.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }

      return res.json({ user: user.getProfile() });
    });
});

module.exports = router;