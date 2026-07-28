export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly errors?: Record<string, string[]>;

  constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true,
    errors?: Record<string, string[]>
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errors = errors;
    Object.setPrototypeOf(this, AppError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message: string, errors?: Record<string, string[]>): AppError {
    return new AppError(message, 400, true, errors);
  }

  static unauthorized(message: string = "Unauthorized"): AppError {
    return new AppError(message, 401);
  }

  static forbidden(message: string = "Forbidden"): AppError {
    return new AppError(message, 403);
  }

  static notFound(message: string = "Resource not found"): AppError {
    return new AppError(message, 404);
  }

  static conflict(message: string): AppError {
    return new AppError(message, 409);
  }

  static validation(message: string, errors: Record<string, string[]>): AppError {
    return new AppError(message, 422, true, errors);
  }

  static tooManyRequests(message: string = "Too many requests"): AppError {
    return new AppError(message, 429);
  }

  static internal(message: string = "Internal server error"): AppError {
    return new AppError(message, 500, false);
  }
}
