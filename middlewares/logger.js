const winston = require('winston');

const myFormat = winston.format.printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.label({ label: 'Task-Manager' }),
    winston.format.json(),
    winston.format.prettyPrint(),
    myFormat
  ),
  transports: [
    new winston.transports.File({ filename: 'errorLogs.log', level: "error" }),
    new winston.transports.File({filename: 'combind.log', handleExceptions: true}),
    new winston.transports.Console()
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: 'exceptions.log'})
  ],
});

logger.exitOnError = false;

module.exports = logger;