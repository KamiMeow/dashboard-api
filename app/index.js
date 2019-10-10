const config = require('../config/config');
const bodyParser = require('body-parser');
const express = require('express');
const db = require('../config/db');
const logging = require('./logs');

const app = express();
const router = express.Router();

app.init = () => global.config = config;
app.connectToDB = () => db.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(logging);
app.use(router.use('/api', require('./router')));


module.exports = app;
