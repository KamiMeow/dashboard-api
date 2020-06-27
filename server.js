import http from 'http';

const httpServer = http.createServer();

httpServer.listen(5000, () => {
  console.log('Люди, люди, хуи на блюди');
});
