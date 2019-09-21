module.exports = function(app, db) {
  app.post('/notes', (req, res) => {
    const body = req.body;
    res.send({
      response: 'Hello',
      foo: 'bar',
      body,
    });
  })
};
