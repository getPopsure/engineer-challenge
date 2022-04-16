import { NextFunction, Request, Response } from "express";
import { httpStatusCode } from "./httpStatusCode";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error occured:", err);
  const statusCode = httpStatusCode.INTERNAL_SERVER_ERROR;
  const response = {
    code: statusCode,
    message: err.message,
  };
  res.status(statusCode).send(response);
};
