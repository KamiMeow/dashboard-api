const mongoose = require('mongoose');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Accounts = require('../Accounts/Accounts');
const InfoType = require('../InfoType/InfoType');
const AccountUser = require('./AccountUser');
const InfoUser = require('./InfoUser');

const UserModel = new mongoose.Schema({
  nickname: { type: String, unique: true, minlength: 3, required: true },
  email: { type: String, unique: true, minlength: 3, required: true, match: [/\S+@\S+\.\S+/, 'is invalid'] },
  url: { type: String, unique: true },
  hash: String,
  salt: String,
});

UserModel.methods.generateLink = function() {
  const host = 'http://localhost:8080/fs/';
  const date = (new Date()).valueOf().toString();
  const random = Math.random().toString();
  const hash = crypto.createHash('sha1').update(date + random).digest('hex');
  this.origin = hash;
  this.url = host + hash + '/' + this.nickname;
};

UserModel.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserModel.methods.validatePassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UserModel.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    email: this.email,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, 'secret');
}

UserModel.methods.toAuthJSON = function() {
  const avatar = gravatar.url(this.email, { s: 200 });
  return {
    _id: this._id,
    nickname: this.nickname,
    email: this.email,
    url: this.url,
    avatar,
    token: this.generateJWT(),
  };
};
UserModel.methods.getProfile = async function(callback) {
  const accountUsers = await AccountUser.find({ user: this._id });
  const infoUsers = await InfoUser.find({ user: this._id });

  console.log(accountUsers);
  console.log(infoUsers);

  const accounts = await getAllById(Accounts, accountUsers, 'account');
  const info = await getAllById(InfoType, infoUsers, 'info');

  await Promise.all(info, accounts);

  const avatar = gravatar.url(this.email, { s: 200 });

  return callback(null, {
    _id: this._id,
    nickname: this.nickname,
    email: this.email,
    url: this.url,
    avatar,
    accounts: accounts.map(getCurrentArray(accountUsers, 'account')),
    info: info.map(getCurrentArray(infoUsers, 'info')),
  });
};

async function getAllById(className, array, value) {
  const ids = array.map(i => i[value]);
  return await className.find({ _id: { $in: ids } });
};
function getCurrentArray(array, value) {
  return item => {
    const current = array.find(c => c[value].toString() === item._id.toString());
    if (!current) return;
    return {
      ...item._doc,
      value: current.value,
    }
  };
};

mongoose.model('NewUser', UserModel);

module.exports = mongoose.model('NewUser');
