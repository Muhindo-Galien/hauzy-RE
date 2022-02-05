const createError = require('http-errors');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const connectDB = require('./config/db');

const routes = require('./routes');
const app = express();
connectDB();
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs.log'), {
  flags: 'a',
});
app.use(morgan('combined', { stream: accessLogStream }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use('/api/v1', routes);



// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// 404 error handler
app.use((error, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = error.message;
  res.locals.error = req.app.get('env') === 'development' ? error : {};

  // render 404 page
  res.status(error.status || 500);
  res.send({
    error: error.message,
  });
  next();
});

module.exports = app;
