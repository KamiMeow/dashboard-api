const userRouter = require('express').Router();
const authRouter = require('express').Router();
const passport = require('passport');
const multer = require('multer');
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

  let accounts = req.body.accounts;
  if (typeof accounts === 'string') {
    accounts = JSON.parse(accounts);
  }

  const newUser = new User({
    _id: user._id,
    nickname: req.body.nickname || user.nickname,
    email: req.body.email || user.email,
    url: req.body.url || user.url,
    accounts: accounts || user.accounts,
    info: info || user.info,
  });

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
userRouter.get('/link/regenerate', auth.required, async (req, res) => {
  const { id } = req.payload;

  const user = await User.findById(id);
  if(!user) {
    return res.sendStatus(400);
  }

  user.generateLink();
  User.updateOne({ _id: id }, user, err => {
    if (err) throw err;

    user.getProfile((err, user) => {
      if (err) return res.sendStatus(400);
      return res.json({ user });
    });
  });
});

userRouter.post('/accounts/add', auth.required, async (req, res) => {
  const { account, token } = req.body;
  const { id } = req.payload;

  const user = await User.findById(id);
  if (!user) {
    return res.sendStatus(400);
  }

  const accounts = [];
  accounts.push({
    type: account,
    value: token,
  });

  User.updateOne({ _id: user._id }, { accounts }, err => {
    if (err) throw err;

    user.getProfile((err, user) => {
      if (err) return res.sendStatus(400);
      return res.json({ user });
    });
  })
});


// const storageConfig = multer.diskStorage({
//   destination: (req, file, cb) =>{
//       cb(null, "uploads");
//   },
//   filename: (req, file, cb) =>{
//       cb(null, file.originalname);
//   }
// });

const upload = multer({
  // storage: storageConfig,
  dest: "public"
});

userRouter.post('/upload-avatar', upload.single("filedata"), (req, res) => {
  let filedata = req.file;
  console.log(filedata);
  if(!filedata)
      res.status(400).send("Ошибка при загрузке файла");
  else
      res.status(200).send("Файл загружен");

  // const form = new multiparty.Form();
  // const uploadFile = {
  //   uploadFile: '',
  //   type: '',
  //   size: 0,
  // };
  // const maxSize = 2 * 1024 * 1024;
  // const supportMimeTypes = ['image/jpg', 'image/jpeg', 'image/png'];
  // let errors = [];

  // form.on('error', err => {
  //   if (fs.existsSync(uploadFile.path)) {
  //     fs.unlinkSync(uploadFile.path);
  //     console.log('error');
  //   }
  // });

  // form.on('close', () => {
  //     if (!errors.length) {
  //     res.sendStatus(200).send('Файл загружен');
  //   }

  //   if (fs.existsSync(uploadFile.path)) {
  //     fs.unlinkSync(uploadFile.path)
  //   }
  //   res.sendStatus(400).send('Неверное изображение');
  // });
  
  // form.on('part', part => {
  //   uploadFile.size = part.byteCount;
  //   uploadFile.type = part.headers['content-type'];
  //   uploadFile.path = '../../uploads/' + part.filename;
  //   console.log(uploadFile);

  //   if (uploadFile.size > maxSize) {
  //     errors.push(`Размер файла ${uploadFile.size}. Размер должен быть не больше ${maxSize / 1024 /1024} МБ`);
  //   }
  //   if (supportMimeTypes.includes(uploadFile.type)) {
  //     errors.push('Не поддерживаемый тип файла');
  //   }

  //   if (!errors.length) {
  //     const out = fs.createWriteStream(uploadFile.path);
  //     return part.pipe(out);
  //   }
  //   part.resume();
  // });

  // form.parse(req);
});

authRouter.post('/register', auth.optional, (req, res, next) => {
  const { email, password, nickname } = req.body;

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

  if(!nickname) {
    return res.status(400).sned({
      error: 'Имя является обязательным полем',
    });
  }

  try {
    const finalUser = new User({ email, password, nickname, accounts: [], info: [], });
    // finalUser.setPassword(password);
    // finalUser.generateLink();

    // return finalUser.save()
    //   .then(() => res.json({ user: finalUser.toAuthJSON() }));
  }
  catch(e) {
    next(e);
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