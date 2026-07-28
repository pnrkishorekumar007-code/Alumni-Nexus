import swaggerJsdoc from "swagger-jsdoc";
import type { Options } from "swagger-jsdoc";

const options: Options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "SRM Alumni Nexus API",
      version: "1.0.0",
      description:
        "Backend API for SRM Alumni Nexus - Connecting students, alumni, and faculty of SRM University",
      contact: {
        name: "SRM Alumni Nexus Team",
        email: "support@srmalumninexus.com",
      },
      license: {
        name: "ISC",
        url: "https://opensource.org/licenses/ISC",
      },
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
      {
        url: "https://api.srmalumninexus.com",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter your JWT access token",
        },
      },
      schemas: {
        SuccessResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string" },
            data: { type: "object" },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string" },
            errors: {
              type: "object",
              additionalProperties: {
                type: "array",
                items: { type: "string" },
              },
            },
          },
        },
        User: {
          type: "object",
          properties: {
            user_id: { type: "string", format: "uuid" },
            name: { type: "string" },
            email: { type: "string", format: "email" },
            phone: { type: "string", nullable: true },
            profile_photo: { type: "string", nullable: true },
            is_verified: { type: "boolean" },
            status: { type: "string", enum: ["ACTIVE", "INACTIVE", "SUSPENDED", "BANNED"] },
            role: { $ref: "#/components/schemas/Role" },
            department: { $ref: "#/components/schemas/Department" },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time" },
          },
        },
        Role: {
          type: "object",
          properties: {
            role_id: { type: "string", format: "uuid" },
            role_name: { type: "string", enum: ["SUPER_ADMIN", "ADMIN", "ALUMNI", "STUDENT", "FACULTY"] },
          },
        },
        Department: {
          type: "object",
          properties: {
            department_id: { type: "string", format: "uuid" },
            department_name: { type: "string" },
          },
        },
        AuthTokens: {
          type: "object",
          properties: {
            accessToken: { type: "string" },
            refreshToken: { type: "string" },
          },
        },
        RegisterRequest: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: { type: "string", minLength: 2, maxLength: 255 },
            email: { type: "string", format: "email" },
            password: {
              type: "string",
              minLength: 8,
              description: "Must contain uppercase, lowercase, number, and special character",
            },
            phone: { type: "string" },
            departmentId: { type: "string", format: "uuid" },
            role: { type: "string", enum: ["STUDENT", "ALUMNI", "FACULTY"], default: "STUDENT" },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", format: "email" },
            password: { type: "string" },
          },
        },
        LoginResponse: {
          type: "object",
          properties: {
            success: { type: "boolean" },
            message: { type: "string" },
            data: {
              type: "object",
              properties: {
                user: { $ref: "#/components/schemas/User" },
                tokens: { $ref: "#/components/schemas/AuthTokens" },
              },
            },
          },
        },
        RefreshTokenRequest: {
          type: "object",
          required: ["refreshToken"],
          properties: {
            refreshToken: { type: "string" },
          },
        },
        ForgotPasswordRequest: {
          type: "object",
          required: ["email"],
          properties: {
            email: { type: "string", format: "email" },
          },
        },
        ResetPasswordRequest: {
          type: "object",
          required: ["token", "newPassword"],
          properties: {
            token: { type: "string" },
            newPassword: {
              type: "string",
              minLength: 8,
              description: "Must contain uppercase, lowercase, number, and special character",
            },
          },
        },
        UpdateProfileRequest: {
          type: "object",
          properties: {
            name: { type: "string", minLength: 2, maxLength: 255 },
            phone: { type: "string" },
            departmentId: { type: "string", format: "uuid" },
            profilePhoto: { type: "string", format: "url" },
            currentPassword: { type: "string" },
            newPassword: { type: "string", minLength: 8 },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
