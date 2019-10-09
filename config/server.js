const http = require('http');
const port = require('./config').PORT;

module.exports.start = function(response, callback) {
  http.createServer(response).listen(port, callback);
};
