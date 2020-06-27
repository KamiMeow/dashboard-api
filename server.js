import http from 'http';
import './config';

const httpServer = http.createServer();

httpServer.listen(global.config.HTTP_PORT, () => {
  console.log('Люди, люди, хуи на блюди');
});
