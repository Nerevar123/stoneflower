const winston = require('winston');
const expressWinston = require('express-winston');
require('winston-daily-rotate-file');

const transport = (name) => new winston.transports.DailyRotateFile({
  filename: name,
  dirname: './/logs//',
  maxSize: '20m',
  maxFiles: '14d',
});

const requestLogger = expressWinston.logger({
  transports: [
    transport('request.log'),
  ],
  format: winston.format.json(),
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    transport('error.log'),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
