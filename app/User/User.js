const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const UserModel = new mongoose.Schema({
  nickname: { type: String, unique: true, minlength: 3, required: true },
  email: { type: String, unique: true, minlength: 3, required: true, match: [/\S+@\S+\.\S+/, 'is invalid'] },
  contacts: [{ type: mongoose.Schema.ObjectId, ref: 'ContactType' }],
  info: [{ type: mongoose.Schema.ObjectId, ref: 'InfoTypes' }],
  hash: String,
  salt: String,
});

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
  return {
    _id: this._id,
    email: this.email,
    nickname: this.nickname,
    token: this.generateJWT(),
  };
};
UserModel.methods.getProfile = function() {
  return {
    _id: this._id,
    nickname: this.nickname,
    contacts: this.contacts,
    email: this.email,
    info: this.info,
  };
};

mongoose.model('User', UserModel);

module.exports = mongoose.model('User');
