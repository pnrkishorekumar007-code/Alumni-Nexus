import type { Response } from "express";
import { userService } from "../services";
import { sendSuccess } from "../utils/response";
import { MESSAGES, HTTP_STATUS } from "../constants";
import type { AuthenticatedRequest } from "../interfaces";

export class UserController {
  async getMe(req: AuthenticatedRequest, res: Response): Promise<void> {
    if (!req.user) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: MESSAGES.ERROR.UNAUTHORIZED,
      });
      return;
    }
    const user = await userService.getProfile(req.user.userId);
    sendSuccess(res, MESSAGES.SUCCESS.PROFILE_FETCHED, user);
  }

  async updateMe(req: AuthenticatedRequest, res: Response): Promise<void> {
    if (!req.user) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: MESSAGES.ERROR.UNAUTHORIZED,
      });
      return;
    }
    const user = await userService.updateProfile(req.user.userId, req.body);
    sendSuccess(res, MESSAGES.SUCCESS.PROFILE_UPDATED, user);
  }
}

export const userController = new UserController();
