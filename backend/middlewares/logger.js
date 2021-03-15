const winston = require('winston');
const expressWinston = require('express-winston');
require('winston-daily-rotate-file');

const transport = (name) => new winston.transports.DailyRotateFile({
  filename: name,
  dirname: './/logs//',
  maxSize: '20m',
  maxFiles: '14d',
});

const logger = winston.createLogger({
  transports: [
    transport('console.log'),
  ],
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'MMM-DD-YYYY HH:mm:ss',
    }),
    winston.format.printf((info) => `${[info.timestamp]}: ${info.message}`),
  ),
});

const requestLogger = expressWinston.logger({
  transports: [
    transport('request.log'),
  ],
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'HH:mm:ss',
    }),
    winston.format.printf((info) => `${info.level}: ${[info.timestamp]}: ${info.meta.res.statusCode} ${info.message}, headers: ${JSON.stringify(info.meta.req.headers)}`),
  ),
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    transport('error.log'),
  ],
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'HH:mm:ss',
    }),
    winston.format.printf((info) => `${[info.timestamp]}, StatusCode: ${info.meta.error.statusCode}, ${info.meta.error}, file: ${info.meta.trace[0].file}`),
  ),
});

module.exports = {
  requestLogger,
  errorLogger,
  logger,
};
