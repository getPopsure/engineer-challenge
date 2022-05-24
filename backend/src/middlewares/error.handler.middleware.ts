import {ErrorRequestHandler, NextFunction, Request, Response} from "express/ts4.0"
import {getMessage, getStatus} from "../exceptions"

export const errorHandler: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err)
  }

  const status: number = getStatus(err)
  res.status(status)
  res.json({error: getMessage(err)})
  next(err)
}
