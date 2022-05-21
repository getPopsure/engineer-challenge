import {ErrorRequestHandler, NextFunction, Request, Response} from "express/ts4.0"
import {getMessage, getStatus} from "../exceptions"

export const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err)
  }
  res.status(getStatus(err))
  res.render("error", {error: getMessage(err)})
  next()
}
