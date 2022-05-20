import {ErrorRequestHandler, NextFunction, Request, Response} from "express/ts4.0"

export const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.render("error", {error: err})
}
