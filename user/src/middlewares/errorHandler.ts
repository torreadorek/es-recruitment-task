import { NextFunction, Request, Response } from "express";
import HttpException from "../utils/HttpException";

export const customErrorHandler = (
  err: HttpException | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof HttpException) {
    const status = err.status;
    const message = err.message;
    return res.status(status).json(message);
  }
  if (err && err.name === "UnauthorizedError") {
    return res.status(401).send("Invalid token");
  }
  return res.status(500).send("Something went wrong");
};
