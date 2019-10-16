const router = require('express').Router();
const passport = require('passport');
const auth = require('../router/auth');
const User = require('../User');

function validData(data, res) {
  Object.values(data).forEach(value => {
    if (!data[value]) {
      return res.status(400).json({
        errors: {
          [value]: 'is required',
        },
      });
    }
  });
};

router.post('/register', auth.optional, (req, res, next) => {
  const dataUser = { nickname, email, password } = req.body;
  validData(dataUser, res);

  const user = new User({ email, nickname });
  user.setPassword(password);

  return user.save()
    .then(() => res.json({ user: user.toAuthJSON() }));
});

router.post('/login', auth.optional, (req, res, next) => {
  const userData = { email, password } = req.body;
  validData(userData, res);

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    console.log(err);
    if(err) {
      return next(err);
    }

    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      return res.json({ user: user.toAuthJSON() });
    }

    return next(res.status(401));
  })(req, res, next);
});

module.exports = router;