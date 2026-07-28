import type { Request, Response } from "express";
import { authService } from "../services";
import { sendSuccess } from "../utils/response";
import { MESSAGES, HTTP_STATUS } from "../constants";
import type { AuthenticatedRequest } from "../interfaces";

export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    const result = await authService.register(req.body);
    sendSuccess(res, result.message, result.user, HTTP_STATUS.CREATED);
  }

  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    sendSuccess(res, MESSAGES.SUCCESS.LOGIN, {
      user: result.user,
      tokens: result.tokens,
    });
  }

  async logout(req: AuthenticatedRequest, res: Response): Promise<void> {
    if (!req.user) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: MESSAGES.ERROR.UNAUTHORIZED,
      });
      return;
    }
    await authService.logout(req.user.userId);
    sendSuccess(res, MESSAGES.SUCCESS.LOGOUT);
  }

  async refreshTokens(req: Request, res: Response): Promise<void> {
    const { refreshToken } = req.body;
    const tokens = await authService.refreshTokens(refreshToken);
    sendSuccess(res, MESSAGES.SUCCESS.TOKEN_REFRESHED, tokens);
  }

  async forgotPassword(req: Request, res: Response): Promise<void> {
    const { email } = req.body;
    await authService.forgotPassword(email);
    sendSuccess(res, MESSAGES.SUCCESS.PASSWORD_RESET_EMAIL);
  }

  async resetPassword(req: Request, res: Response): Promise<void> {
    const { token, newPassword } = req.body;
    await authService.resetPassword(token, newPassword);
    sendSuccess(res, MESSAGES.SUCCESS.PASSWORD_RESET);
  }

  async verifyEmail(req: Request, res: Response): Promise<void> {
    const { token } = req.body;
    await authService.verifyEmail(token);
    sendSuccess(res, MESSAGES.SUCCESS.EMAIL_VERIFIED);
  }

  async getMe(req: AuthenticatedRequest, res: Response): Promise<void> {
    if (!req.user) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: MESSAGES.ERROR.UNAUTHORIZED,
      });
      return;
    }
    const user = await authService.getMe(req.user.userId);
    sendSuccess(res, MESSAGES.SUCCESS.PROFILE_FETCHED, user);
  }
}

export const authController = new AuthController();
