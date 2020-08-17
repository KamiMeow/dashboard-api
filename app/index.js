import bodyParser from 'body-parser';
import express from 'express';
import logger from 'morgan';
import path from 'path';

const appDir = path.dirname(require.main.filename);
const app = express();

app.use('/static', express.static(`${appDir}/public`));

const allowCrossDomain = (req, res, next) => {
  const currentUrl = 'http://localhost:8080';

  res.header('Access-Control-Allow-Origin', currentUrl);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Authorization, Content-Type, Accept, Organization, token');

  next();
};
app.use(allowCrossDomain);

if (process.env.NODE_ENV !== 'production') {
  app.use(logger('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

export default app;
