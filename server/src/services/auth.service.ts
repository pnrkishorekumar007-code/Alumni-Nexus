import bcrypt from "bcryptjs";
import { config } from "../config";
import { userRepository } from "../repositories";
import { refreshTokenRepository } from "../repositories";
import { roleRepository } from "../repositories";
import { hashPassword, comparePassword } from "../utils/password";
import {
  generateTokenPair,
  verifyRefreshToken,
  getRefreshTokenExpiry,
} from "../utils/jwt";
import { generateToken } from "../utils/password";
import { AppError } from "../utils/errors";
import { MESSAGES, HTTP_STATUS } from "../constants";
import {
  sendEmail,
  generateVerificationEmailTemplate,
  generatePasswordResetEmailTemplate,
} from "../helpers/email.helper";
import type { AuthTokens, JwtPayload } from "../types";
import type { UserRole } from "@prisma/client";

export class AuthService {
  async register(data: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    departmentId?: string;
    role?: string;
  }): Promise<{ user: any; message: string }> {
    const existingUser = await userRepository.findByEmail(data.email);
    if (existingUser) {
      throw AppError.conflict(MESSAGES.ERROR.USER_ALREADY_EXISTS);
    }

    let roleName: string = data.role || "STUDENT";
    const role = await roleRepository.findByName(roleName);
    if (!role) {
      throw AppError.badRequest("Invalid role specified");
    }

    if (data.departmentId) {
      const { departmentRepository } = await import("../repositories");
      const dept = await departmentRepository.findById(data.departmentId);
      if (!dept) {
        throw AppError.badRequest("Invalid department specified");
      }
    }

    const hashedPassword = await hashPassword(data.password);

    const user = await userRepository.create({
      name: data.name,
      email: data.email.toLowerCase(),
      password: hashedPassword,
      phone: data.phone || null,
      role: { connect: { role_id: role.role_id } },
      department: data.departmentId
        ? { connect: { department_id: data.departmentId } }
        : undefined,
      is_verified: false,
    });

    const verificationToken = generateToken(32);
    const verificationLink = `${config.frontend.url}/verify-email?token=${verificationToken}`;

    try {
      await sendEmail({
        to: user.email,
        subject: "Verify Your Email - SRM Alumni Nexus",
        html: generateVerificationEmailTemplate(
          user.name,
          verificationLink
        ),
      });
    } catch (error) {
      console.error("Failed to send verification email:", error);
    }

    const { password: _, ...userWithoutPassword } = user as any;

    return {
      user: userWithoutPassword,
      message: MESSAGES.SUCCESS.REGISTERED,
    };
  }

  async login(
    email: string,
    password: string
  ): Promise<{ user: any; tokens: AuthTokens }> {
    const user = await userRepository.findByEmail(email, true);
    if (!user || !user.password) {
      throw AppError.unauthorized(MESSAGES.ERROR.INVALID_CREDENTIALS);
    }

    if (user.status === "SUSPENDED") {
      throw AppError.forbidden(MESSAGES.ERROR.ACCOUNT_SUSPENDED);
    }

    if (user.status === "INACTIVE") {
      throw AppError.forbidden(MESSAGES.ERROR.ACCOUNT_INACTIVE);
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw AppError.unauthorized(MESSAGES.ERROR.INVALID_CREDENTIALS);
    }

    const tokens = await this.generateAndStoreTokens(user);

    const { password: _, ...userWithoutPassword } = user as any;

    return {
      user: userWithoutPassword,
      tokens,
    };
  }

  async logout(userId: string): Promise<void> {
    await refreshTokenRepository.deleteByUserId(userId);
  }

  async refreshTokens(refreshToken: string): Promise<AuthTokens> {
    let decoded: JwtPayload;
    try {
      decoded = verifyRefreshToken(refreshToken);
    } catch {
      throw AppError.unauthorized(MESSAGES.ERROR.INVALID_TOKEN);
    }

    const storedToken = await refreshTokenRepository.findByToken(refreshToken);
    if (!storedToken) {
      throw AppError.unauthorized(MESSAGES.ERROR.REFRESH_TOKEN_NOT_FOUND);
    }

    if (new Date(storedToken.expires_at) < new Date()) {
      await refreshTokenRepository.deleteByToken(refreshToken);
      throw AppError.unauthorized(MESSAGES.ERROR.TOKEN_EXPIRED);
    }

    const user = await userRepository.findById(decoded.userId);
    if (!user) {
      throw AppError.unauthorized(MESSAGES.ERROR.USER_NOT_FOUND);
    }

    if (user.status === "SUSPENDED" || user.status === "BANNED") {
      await refreshTokenRepository.deleteByUserId(user.user_id);
      throw AppError.forbidden(MESSAGES.ERROR.ACCOUNT_SUSPENDED);
    }

    await refreshTokenRepository.deleteByToken(refreshToken);

    const tokens = await this.generateAndStoreTokens(user);
    return tokens;
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      return;
    }

    const resetToken = generateToken(32);
    const resetLink = `${config.frontend.url}/reset-password?token=${resetToken}`;

    try {
      await sendEmail({
        to: user.email,
        subject: "Reset Your Password - SRM Alumni Nexus",
        html: generatePasswordResetEmailTemplate(
          user.name,
          resetLink
        ),
      });
    } catch (error) {
      console.error("Failed to send password reset email:", error);
    }
  }

  async resetPassword(
    token: string,
    newPassword: string
  ): Promise<void> {
    const storedToken = await refreshTokenRepository.findByToken(token);
    if (!storedToken) {
      throw AppError.badRequest(MESSAGES.ERROR.INVALID_TOKEN);
    }

    if (new Date(storedToken.expires_at) < new Date()) {
      await refreshTokenRepository.deleteByToken(token);
      throw AppError.badRequest(MESSAGES.ERROR.TOKEN_EXPIRED);
    }

    const hashedPassword = await hashPassword(newPassword);

    await userRepository.update(storedToken.user_id, {
      password: hashedPassword,
    });

    await refreshTokenRepository.deleteByUserId(storedToken.user_id);
  }

  async verifyEmail(token: string): Promise<void> {
    const storedToken = await refreshTokenRepository.findByToken(token);
    if (!storedToken) {
      throw AppError.badRequest(MESSAGES.ERROR.INVALID_TOKEN);
    }

    await userRepository.update(storedToken.user_id, {
      is_verified: true,
    });

    await refreshTokenRepository.deleteByToken(token);
  }

  async getMe(userId: string): Promise<any> {
    const user = await userRepository.findById(userId, true);
    if (!user) {
      throw AppError.notFound(MESSAGES.ERROR.USER_NOT_FOUND);
    }

    const { password: _, ...userWithoutPassword } = user as any;
    return userWithoutPassword;
  }

  private async generateAndStoreTokens(
    user: any
  ): Promise<AuthTokens> {
    const tokenPayload = {
      userId: user.user_id,
      email: user.email,
      role: user.role?.role_name || user.role_id,
    };

    const tokens = generateTokenPair(tokenPayload);

    await refreshTokenRepository.create({
      token: tokens.refreshToken,
      user: { connect: { user_id: user.user_id } },
      expires_at: getRefreshTokenExpiry(),
    });

    return tokens;
  }
}

export const authService = new AuthService();
