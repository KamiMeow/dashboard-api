const userRouter = require('express').Router();
const authRouter = require('express').Router();
const passport = require('passport');
const auth = require('../router/auth');
const User = require('./User');

userRouter.get('/profile', auth.required, async (req, res) => {
  const { id } = req.payload;

  const user = await User.findById(id);
  if(!user) {
    return res.sendStatus(400);
  }

  user.getProfile((err, user) => {
    if (err) return res.sendStatus(400);
    return res.json({ user });
  });
});
userRouter.put('/profile', auth.required, async (req, res) => {
  const { id } = req.payload;
  const user = await User.findById(id);
  if (!user) {
    return res.sendStatus(400);
  }

  let info = req.body.info;
  if (typeof info === 'string') {
    info = JSON.parse(info).map(i => ({
      type: i.type,
      value: i.value,
    }));
  }

  console.log(info);

  let accounts = req.body.accounts;
  if (typeof accounts === 'string') {
    accounts = JSON.parse(accounts);
  }

  const newUser = new User({
    _id: user._id,
    nickname: req.body.nickname || user.nickname,
    email: req.body.email || user.email,
    accounts: accounts || user.accounts,
    info: info || user.info,
  });

  console.log(newUser);

  const password = req.body.password;
  if (password) {
    newUser.setPassword(password);
  }

  User.updateOne({ _id: user._id }, newUser, (err) => {
    if (err) throw err;
    newUser.getProfile((err, user) => {
      if (err) return res.sendStatus(400);
      return res.json({ user });
    });
  });
});

userRouter.post('/accounts/add', auth.required, async (req, res) => {
  const { account, token } = req.body;
  const { id } = req.payload;

  const user = await User.findById(id);
  console.log(user);
  if (!user) {
    return res.sendStatus(400);
  }

  // const accounts = user.accounts.filter(a => a.type !== account).slice(0);
  const accounts = [];
  console.log({
    type: account,
    value: token,
  });
  accounts.push({
    type: account,
    value: token,
  });


  console.log(accounts);

  User.updateOne({ _id: user._id }, { accounts }, err => {
    if (err) throw err;

    user.getProfile((err, user) => {
      if (err) return res.sendStatus(400);
      return res.json({ user });
    });
  })
});

authRouter.post('/register', auth.optional, (req, res) => {
  const { email, password } = req.body;

  if(!email) {
    return res.status(400).send({
      error: 'Логин является обязательным полем',
    });
  }

  if(!password) {
    return res.status(400).sned({
      error: 'Пароль является обязательным полем',
    });
  }

  try {
    const finalUser = new User({ email, password });
    finalUser.setPassword(password);

    return finalUser.save()
      .then(() => res.json({ user: finalUser.toAuthJSON() }));
  }
  catch(e) {
    res.status(422).send(e);
  }
});

authRouter.post('/login', auth.optional, (req, res, next) => {
  const { email, password } = req.body;

  if(!email) {
    return res.status(400).send({
      error: 'Логин является обязательным полем',
    });
  }

  if(!password) {
    return res.status(400).send({
      error: 'Пароль является обязательным полем',
    });
  }

  return passport.authenticate('local', { session: false }, (err, passportUser) => {
    if(err) {
      console.log(err.error);
      return res.status(401).send(err);
    }

    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      return res.json({ user: user.toAuthJSON() });
    }

    return next(res.status(401));
  })(req, res, next);
});

module.exports = {
  authRouter,
  userRouter,
};