import { ErrorRequestHandler } from "express";
import httpStatus from "http-status";
import AppError from "../errors/AppError";
import { ZodError } from "zod";
import { handleZodError } from "../errors/handleZodError";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode: number = httpStatus.INTERNAL_SERVER_ERROR;
  let success: boolean = false;
  let message: any = "Something went wrong";
  let type;

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  }
  
  else if (error instanceof ZodError) {
    const errResult = handleZodError(error);
    statusCode = errResult.statusCode;
    type = errResult.type;
    message = errResult?.message;
  }

  return res.status(statusCode).json({
    success,
    message,
    type: type && type,
  });
};

export default globalErrorHandler;
