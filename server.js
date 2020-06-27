import http from 'http';

const httpServer = http.createServer();
// console.log(process.env.NODE_ENV);
// console.log(process.env.PORT);

httpServer.listen(5000, () => {
  console.log('Люди, люди, хуи на блюди');
});
