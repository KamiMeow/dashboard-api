import https from 'https';
import http from 'http';
import app from './app';
import './config';

function createServer(protocol, credentials, port = 5000) {
  const server = protocol.createServer(credentials);
  server.listen(port, err => {
    if (err) throw err;
    console.log('Люди, люди, хуи на блюди');
  });
}

createServer(https, app, global.config.HTTPS_PORT);
createServer(http, app, global.config.HTTP_PORT);
