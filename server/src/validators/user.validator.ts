import { z } from "zod";

export const updateProfileSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(255, "Name must be at most 255 characters")
      .trim()
      .optional(),
    phone: z
      .string()
      .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format")
      .optional()
      .or(z.literal("")),
    departmentId: z.string().uuid("Invalid department ID").optional().or(z.literal("")),
    profilePhoto: z
      .string()
      .url("Invalid profile photo URL")
      .optional()
      .or(z.literal("")),
    currentPassword: z
      .string()
      .min(1, "Current password is required when setting new password")
      .optional(),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must be at most 128 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Password must contain at least one uppercase, one lowercase, one number, and one special character"
      )
      .optional(),
  }).refine(
    (data) => {
      if (data.newPassword && !data.currentPassword) {
        return false;
      }
      return true;
    },
    {
      message: "Current password is required when setting a new password",
      path: ["currentPassword"],
    }
  ),
});
