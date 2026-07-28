import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is required`);
  }
  return value;
}

function optionalEnv(key: string, defaultValue: string): string {
  return process.env[key] || defaultValue;
}

export const config = {
  env: optionalEnv("NODE_ENV", "development"),
  port: parseInt(optionalEnv("PORT", "5000"), 10),
  apiPrefix: optionalEnv("API_PREFIX", "/api"),

  database: {
    url: requireEnv("DATABASE_URL"),
  },

  jwt: {
    accessSecret: requireEnv("JWT_ACCESS_SECRET"),
    refreshSecret: requireEnv("JWT_REFRESH_SECRET"),
    accessExpiry: optionalEnv("JWT_ACCESS_EXPIRY", "15m"),
    refreshExpiry: optionalEnv("JWT_REFRESH_EXPIRY", "7d"),
  },

  frontend: {
    url: optionalEnv("FRONTEND_URL", "http://localhost:3000"),
  },

  google: {
    clientId: optionalEnv("GOOGLE_CLIENT_ID", ""),
    clientSecret: optionalEnv("GOOGLE_CLIENT_SECRET", ""),
    callbackUrl: optionalEnv("GOOGLE_CALLBACK_URL", "/api/auth/google/callback"),
  },

  cloudinary: {
    cloudName: optionalEnv("CLOUDINARY_CLOUD_NAME", ""),
    apiKey: optionalEnv("CLOUDINARY_API_KEY", ""),
    apiSecret: optionalEnv("CLOUDINARY_API_SECRET", ""),
  },

  resend: {
    apiKey: optionalEnv("RESEND_API_KEY", ""),
    fromEmail: optionalEnv("RESEND_FROM_EMAIL", "noreply@srmalumninexus.com"),
  },

  rateLimit: {
    windowMs: parseInt(optionalEnv("RATE_LIMIT_WINDOW_MS", "900000"), 10),
    maxRequests: parseInt(optionalEnv("RATE_LIMIT_MAX_REQUESTS", "100"), 10),
  },

  bcrypt: {
    saltRounds: parseInt(optionalEnv("BCRYPT_SALT_ROUNDS", "12"), 10),
  },

  uploads: {
    dir: path.resolve(__dirname, "../uploads"),
  },
} as const;
