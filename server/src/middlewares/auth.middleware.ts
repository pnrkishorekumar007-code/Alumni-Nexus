import type { Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";
import { AppError } from "../utils/errors";
import { MESSAGES, HTTP_STATUS } from "../constants";
import type { AuthenticatedRequest } from "../interfaces";
import { userRepository } from "../repositories";

export async function authenticate(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw AppError.unauthorized(MESSAGES.ERROR.UNAUTHORIZED);
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw AppError.unauthorized(MESSAGES.ERROR.UNAUTHORIZED);
    }

    const decoded = verifyAccessToken(token);

    const user = await userRepository.findById(decoded.userId);
    if (!user) {
      throw AppError.unauthorized(MESSAGES.ERROR.USER_NOT_FOUND);
    }

    if (user.status === "SUSPENDED" || user.status === "BANNED") {
      throw AppError.forbidden(MESSAGES.ERROR.ACCOUNT_SUSPENDED);
    }

    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
      return;
    }
    res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: MESSAGES.ERROR.UNAUTHORIZED,
    });
  }
}

export function authorize(...allowedRoles: string[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: MESSAGES.ERROR.UNAUTHORIZED,
      });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(HTTP_STATUS.FORBIDDEN).json({
        success: false,
        message: MESSAGES.ERROR.ACCESS_DENIED,
      });
      return;
    }

    next();
  };
}
