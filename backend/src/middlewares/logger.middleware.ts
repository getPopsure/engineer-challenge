import winston, {Logger, LoggerOptions} from "winston"
import expressWinston from "express-winston"
import {ErrorRequestHandler, Handler} from "express/ts4.0"

const baseLoggerOptions = {
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.json()
  ),
  meta: true,
  silent: process.argv.indexOf("--silent") >= 0,
  colorize: false
}

export const applicationLogger: Logger = winston.createLogger({
  ...baseLoggerOptions as LoggerOptions
})

export const requestLogger: Handler = expressWinston.logger({
    ...baseLoggerOptions
  }
)

export const errorLogger: ErrorRequestHandler = expressWinston.errorLogger({
  ...baseLoggerOptions
})
