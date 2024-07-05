import { ErrorRequestHandler } from "express";
import httpStatus from "http-status";
import AppError from "../errors/AppError";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode: number = httpStatus.INTERNAL_SERVER_ERROR;
  let success: boolean = false;
  let message: string = "Something went wrong";

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  }

  return res.status(statusCode).json({
    success,
    message: message,
  });
};

export default globalErrorHandler;
