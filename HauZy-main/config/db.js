const logger = require('../util/logger');
const mongoose = require('mongoose');
const { MONGO_URI } = require('../util/secrets');

const connectDB = async () => {
  await mongoose.connect(
    MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    },
    (err) => {
      if (err) {
        logger.error('Error connecting to MongoDB', {
          err,
        });
        process.exit(1);
      } else {
        logger.info('Connection to database success');
      }
    }
  );
};

module.exports = connectDB;
