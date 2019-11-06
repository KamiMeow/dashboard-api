const session = require('express-session');
const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const config = require('../config');
const db = require('../config/db');
const logging = require('../logs');

const app = express();
const router = express.Router();

app.init = () => global.config = config;
app.connectToDB = () => db.connect();

const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
};
app.use(allowCrossDomain);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

require('../config/passport');
app.use(logging);
app.use(router.use('/api', require('./router')));
app.use(router.use('/', require('./User')));

app.use((req, res, next) => {
  res.status(500);

  res.json({
    error: 'not found current method',
  });
});

module.exports = app;
