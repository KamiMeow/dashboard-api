const router = require('express').Router();
const https = require('https');

router.get('/login', (req, res) => {
  const request = https.get('https://github.com/login/oauth/authorize', response => {
    let body = '';
    response.on('data', data => {
      body += data;
    });
    response.on('end', () => {
      res.send(body);
    })
  });
  request.on('error', (e) => {
    console.log('Problem with request: ' + e.message);
  });
  request.end();
});

module.exports = router;
