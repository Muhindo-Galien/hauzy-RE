require('dotenv-defaults').config();
const dotenv = require('dotenv');
dotenv.config();
const logger = require('./logger');

const { MONGO_URI, NODE_ENV, JWT_SECRET_KEY } = process.env;

const requiredCredentials = ['MONGO_URI', 'JWT_SECRET_KEY'];

for (const credential of requiredCredentials) {
  if (!process.env[credential]) {
    logger.error(`Missing required credential(s) ${credential}`);
    process.exit(1);
  }
}

module.exports = {
  MONGO_URI,
  NODE_ENV,
  JWT_SECRET_KEY,
};
