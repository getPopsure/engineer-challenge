import { NextFunction, Request, Response } from "express";

const httpStatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

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
