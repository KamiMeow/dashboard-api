const app = require('./app');

app.listen(global.config.PORT, (err) => {
  if (err) throw err;

  app.connectToDB()

  console.log('Start server on port ' + global.config.PORT);
});
