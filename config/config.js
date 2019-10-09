const config = {};

config.PORT = process.env.PORT || 5050;

config.DB = {
  sertificate: 'mongodb',
  baseUrl: 'localhost',
  dbName: 'dashboard',
  port: '27012',
};

config.CONNECTION_STRING = `${config.DB.sertificate}://${config.DB.baseUrl}:${config.DB.port}/${config.DB.dbName}`;

module.exports = config;
