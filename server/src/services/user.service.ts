import { userRepository, roleRepository, departmentRepository } from "../repositories";
import { hashPassword, comparePassword } from "../utils/password";
import { AppError } from "../utils/errors";
import { MESSAGES } from "../constants";
import type { UserRole } from "@prisma/client";

export class UserService {
  async getProfile(userId: string): Promise<any> {
    const user = await userRepository.findById(userId, true);
    if (!user) {
      throw AppError.notFound(MESSAGES.ERROR.USER_NOT_FOUND);
    }

    const { password: _, ...userWithoutPassword } = user as any;
    return userWithoutPassword;
  }

  async updateProfile(
    userId: string,
    data: {
      name?: string;
      phone?: string;
      departmentId?: string;
      profilePhoto?: string;
      currentPassword?: string;
      newPassword?: string;
    }
  ): Promise<any> {
    const user = await userRepository.findById(userId, true);
    if (!user) {
      throw AppError.notFound(MESSAGES.ERROR.USER_NOT_FOUND);
    }

    if (data.departmentId) {
      const dept = await departmentRepository.findById(data.departmentId);
      if (!dept) {
        throw AppError.badRequest("Invalid department specified");
      }
    }

    if (data.newPassword) {
      if (!data.currentPassword) {
        throw AppError.badRequest(
          "Current password is required to set a new password"
        );
      }

      if (!user.password) {
        throw AppError.badRequest(
          "Cannot change password for OAuth accounts"
        );
      }

      const isCurrentPasswordValid = await comparePassword(
        data.currentPassword,
        user.password
      );
      if (!isCurrentPasswordValid) {
        throw AppError.badRequest(MESSAGES.ERROR.OLD_PASSWORD_INCORRECT);
      }

      const isSamePassword = await comparePassword(
        data.newPassword,
        user.password
      );
      if (isSamePassword) {
        throw AppError.badRequest(MESSAGES.ERROR.SAME_PASSWORD);
      }
    }

    const updateData: any = {};
    if (data.name) updateData.name = data.name;
    if (data.phone !== undefined) updateData.phone = data.phone;
    if (data.departmentId) updateData.department_id = data.departmentId;
    if (data.profilePhoto) updateData.profile_photo = data.profilePhoto;
    if (data.newPassword) {
      updateData.password = await hashPassword(data.newPassword);
    }

    const updatedUser = await userRepository.update(userId, updateData);
    const { password: _, ...userWithoutPassword } = updatedUser as any;
    return userWithoutPassword;
  }
}

export const userService = new UserService();
