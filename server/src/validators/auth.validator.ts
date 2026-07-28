import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(255, "Name must be at most 255 characters")
      .trim(),
    email: z
      .string()
      .email("Invalid email address")
      .max(255, "Email must be at most 255 characters")
      .toLowerCase()
      .trim(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must be at most 128 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Password must contain at least one uppercase, one lowercase, one number, and one special character"
      ),
    phone: z
      .string()
      .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format")
      .optional()
      .or(z.literal("")),
    departmentId: z.string().uuid("Invalid department ID").optional().or(z.literal("")),
    role: z
      .enum(["STUDENT", "ALUMNI", "FACULTY"], {
        errorMap: () => ({ message: "Invalid role. Must be STUDENT, ALUMNI, or FACULTY" }),
      })
      .optional(),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z
      .string()
      .email("Invalid email address")
      .toLowerCase()
      .trim(),
    password: z
      .string()
      .min(1, "Password is required"),
  }),
});

export const logoutSchema = z.object({
  body: z.object({}).optional(),
});

export const refreshTokensSchema = z.object({
  body: z.object({
    refreshToken: z
      .string()
      .min(1, "Refresh token is required"),
  }),
});

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z
      .string()
      .email("Invalid email address")
      .toLowerCase()
      .trim(),
  }),
});

export const resetPasswordSchema = z.object({
  body: z.object({
    token: z
      .string()
      .min(1, "Reset token is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must be at most 128 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Password must contain at least one uppercase, one lowercase, one number, and one special character"
      ),
  }),
});

export const verifyEmailSchema = z.object({
  body: z.object({
    token: z
      .string()
      .min(1, "Verification token is required"),
  }),
});
