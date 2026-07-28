import type { Request, Response, NextFunction } from "express";
import { MESSAGES, HTTP_STATUS } from "../constants";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error("Unhandled error:", err);

  const statusCode = (err as any).statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message =
    process.env.NODE_ENV === "production" && statusCode === 500
      ? MESSAGES.ERROR.INTERNAL_ERROR
      : err.message || MESSAGES.ERROR.INTERNAL_ERROR;

  const errors = (err as any).errors || undefined;

  res.status(statusCode).json({
    success: false,
    message,
    errors,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
}

export function notFoundHandler(
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  res.status(HTTP_STATUS.NOT_FOUND).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
}
