const { createLogger, format, transports } = require('winston');
const { timestamp, colorize, combine, printf } = format;

const logFormat = printf(({ level, timestamp, message }) => {
  return `${timestamp} [${level}] ${message}`;
});

const logger = createLogger({
  format: combine(
    colorize(),
    timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
    logFormat,
  ),
  transports: [
    new transports.Console()
  ]
});

module.exports = logger;