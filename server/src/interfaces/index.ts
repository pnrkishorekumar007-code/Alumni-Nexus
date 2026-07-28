import type { Request, Response, NextFunction } from "express";
import type { UserRole, UserStatus } from "@prisma/client";

export interface AuthenticatedUser {
  userId: string;
  email: string;
  role: UserRole;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}

export interface IBaseRepository<T, CreateInput, UpdateInput> {
  findById(id: string): Promise<T | null>;
  findAll(options?: {
    skip?: number;
    take?: number;
    where?: Record<string, any>;
    orderBy?: Record<string, "asc" | "desc">;
  }): Promise<T[]>;
  count(where?: Record<string, any>): Promise<number>;
  create(data: CreateInput): Promise<T>;
  update(id: string, data: UpdateInput): Promise<T>;
  delete(id: string): Promise<T>;
}

export interface IAuthService {
  register(data: any): Promise<any>;
  login(email: string, password: string): Promise<any>;
  logout(userId: string): Promise<void>;
  refreshTokens(refreshToken: string): Promise<any>;
  forgotPassword(email: string): Promise<void>;
  resetPassword(token: string, newPassword: string): Promise<void>;
}

export interface IUserService {
  getProfile(userId: string): Promise<any>;
  updateProfile(userId: string, data: any): Promise<any>;
}

export type { Request, Response, NextFunction };
