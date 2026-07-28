import { type ZodSchema } from "zod";

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const;

export const MESSAGES = {
  SUCCESS: {
    REGISTERED: "User registered successfully. Please verify your email.",
    LOGIN: "Login successful.",
    LOGOUT: "Logged out successfully.",
    TOKEN_REFRESHED: "Token refreshed successfully.",
    PASSWORD_RESET_EMAIL: "Password reset email sent successfully.",
    PASSWORD_RESET: "Password reset successfully.",
    EMAIL_VERIFIED: "Email verified successfully.",
    PROFILE_FETCHED: "Profile fetched successfully.",
    PROFILE_UPDATED: "Profile updated successfully.",
  },
  ERROR: {
    INVALID_CREDENTIALS: "Invalid email or password.",
    USER_NOT_FOUND: "User not found.",
    USER_ALREADY_EXISTS: "User with this email already exists.",
    INVALID_TOKEN: "Invalid or expired token.",
    REFRESH_TOKEN_NOT_FOUND: "Refresh token not found or expired.",
    ACCESS_DENIED: "Access denied. You do not have permission.",
    VALIDATION_ERROR: "Validation error.",
    INTERNAL_ERROR: "Internal server error.",
    UNAUTHORIZED: "Unauthorized. Please login again.",
    ACCOUNT_SUSPENDED: "Your account has been suspended.",
    ACCOUNT_INACTIVE: "Your account is inactive.",
    EMAIL_NOT_VERIFIED: "Please verify your email address.",
    TOKEN_EXPIRED: "Token has expired.",
    RATE_LIMIT_EXCEEDED: "Too many requests. Please try again later.",
    OLD_PASSWORD_INCORRECT: "Old password is incorrect.",
    SAME_PASSWORD: "New password cannot be the same as the old password.",
  },
} as const;

export const ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  ALUMNI: "ALUMNI",
  STUDENT: "STUDENT",
  FACULTY: "FACULTY",
} as const;

export const STATUS = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  SUSPENDED: "SUSPENDED",
  BANNED: "BANNED",
} as const;

export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  LIMIT: 20,
  MAX_LIMIT: 100,
} as const;

export const TOKEN_LENGTHS = {
  ACCESS_TOKEN_BYTES: 32,
  REFRESH_TOKEN_BYTES: 64,
  PASSWORD_RESET_BYTES: 32,
} as const;
