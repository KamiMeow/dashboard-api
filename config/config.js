const config = {};

config.PORT = process.env.PORT || 5000;

config.DB = {
  sertificate: 'mongodb',
  baseUrl: 'localhost',
  dbName: 'dashboard',
  port: '27017',
};

config.CONNECTION_STRING = `${config.DB.sertificate}://${config.DB.baseUrl}:${config.DB.port}/${config.DB.dbName}`;

module.exports = config;
