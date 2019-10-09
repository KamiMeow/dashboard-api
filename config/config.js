const DB = {
  sertificate: 'mongodb',
  baseUrl: 'localhost',
  dbName: 'dashboard',
  port: '27012',
};

module.exports.DB = DB;

module.exports.PORT = 5000;

module.exports.CONNECTION_STRING = `${DB.sertificate}://${DB.baseUrl}:${DB.port}/${DB.dbName}`;
