import jwt from "jsonwebtoken";
import { config } from "../config";
import type { TokenPayload, AuthTokens, JwtPayload } from "../types";

export function generateAccessToken(payload: TokenPayload): string {
  return jwt.sign(
    { userId: payload.userId, email: payload.email, role: payload.role },
    config.jwt.accessSecret,
    { expiresIn: config.jwt.accessExpiry } as jwt.SignOptions
  );
}

export function generateRefreshToken(payload: TokenPayload): string {
  return jwt.sign(
    { userId: payload.userId, email: payload.email, role: payload.role },
    config.jwt.refreshSecret,
    { expiresIn: config.jwt.refreshExpiry } as jwt.SignOptions
  );
}

export function generateTokenPair(payload: TokenPayload): AuthTokens {
  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
}

export function verifyAccessToken(token: string): JwtPayload {
  const decoded = jwt.verify(token, config.jwt.accessSecret) as JwtPayload;
  return decoded;
}

export function verifyRefreshToken(token: string): JwtPayload {
  const decoded = jwt.verify(token, config.jwt.refreshSecret) as JwtPayload;
  return decoded;
}

export function decodeToken(token: string): JwtPayload | null {
  try {
    return jwt.decode(token) as JwtPayload;
  } catch {
    return null;
  }
}

export function getRefreshTokenExpiry(): Date {
  const expiry = config.jwt.refreshExpiry;
  const match = expiry.match(/^(\d+)([dms])$/);
  if (!match) {
    return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  }
  const value = parseInt(match[1], 10);
  const unit = match[2];
  const now = Date.now();
  switch (unit) {
    case "d":
      return new Date(now + value * 24 * 60 * 60 * 1000);
    case "m":
      return new Date(now + value * 60 * 60 * 1000);
    case "s":
      return new Date(now + value * 60 * 1000);
    default:
      return new Date(now + 7 * 24 * 60 * 60 * 1000);
  }
}
