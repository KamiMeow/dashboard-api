const LocalStrategy = require('passport-local');
const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../app/User/User');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, (email, password, done) => {
  User.findOne({ email })
    .then((user) => {
      if(!user || !user.validatePassword(password)) {
        console.log('email or password is invalid');
        return done({ error: 'email or password is invalid' }, false);
      }

      return done(null, user);
    }).catch(done);
}));