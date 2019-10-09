const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const server = require('./config/server');
const db = require('./config/db');

db.connect(() => {
  server.start((res, req) => {
    req.end('baka')
  },
  () => console.log('buuu'));
});

app.use(bodyParser.urlencoded({
  extended: true,
}));
