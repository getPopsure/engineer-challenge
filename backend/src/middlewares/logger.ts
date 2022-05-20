import winston, {Logger} from "winston"
import expressWinston from "express-winston"
import {ErrorRequestHandler, Handler} from "express/ts4.0"

const baseLoggerOptions = {
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  meta: true
}

export const applicationLogger: Logger = winston.createLogger(baseLoggerOptions)

export const logger: Handler = expressWinston.logger({
    colorize: false,
    ...baseLoggerOptions
  }
)

export const errorLogger: ErrorRequestHandler = expressWinston.errorLogger({
  ...baseLoggerOptions
})
