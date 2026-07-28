import { getResendClient } from "../config/email";
import { config } from "../config";
import type { EmailOptions } from "../types";

export async function sendEmail(options: EmailOptions): Promise<void> {
  const resend = getResendClient();
  if (!resend) {
    console.warn(`Email not sent (Resend not configured): ${options.subject}`);
    return;
  }

  try {
    await resend.emails.send({
      from: config.resend.fromEmail,
      to: Array.isArray(options.to) ? options.to : [options.to],
      subject: options.subject,
      html: options.html,
      text: options.text,
    });
    console.log(`Email sent: ${options.subject}`);
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
}

export function generateVerificationEmailTemplate(
  name: string,
  verificationLink: string
): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Email - SRM Alumni Nexus</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .container { background: #f9f9f9; border-radius: 10px; padding: 30px; }
        .header { text-align: center; margin-bottom: 30px; }
        .header h1 { color: #1a73e8; font-size: 24px; }
        .content { background: white; padding: 20px; border-radius: 5px; }
        .btn { display: inline-block; background: #1a73e8; color: white !important; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to SRM Alumni Nexus!</h1>
        </div>
        <div class="content">
          <p>Hello ${name},</p>
          <p>Thank you for registering with SRM Alumni Nexus. Please verify your email address to get started.</p>
          <p style="text-align: center;">
            <a href="${verificationLink}" class="btn">Verify Email</a>
          </p>
          <p>If you did not create an account, please ignore this email.</p>
          <p>This verification link will expire in 24 hours.</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} SRM Alumni Nexus. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function generatePasswordResetEmailTemplate(
  name: string,
  resetLink: string
): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Your Password - SRM Alumni Nexus</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .container { background: #f9f9f9; border-radius: 10px; padding: 30px; }
        .header { text-align: center; margin-bottom: 30px; }
        .header h1 { color: #1a73e8; font-size: 24px; }
        .content { background: white; padding: 20px; border-radius: 5px; }
        .btn { display: inline-block; background: #e74c3c; color: white !important; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Password Reset Request</h1>
        </div>
        <div class="content">
          <p>Hello ${name},</p>
          <p>We received a request to reset your password. Click the button below to set a new password:</p>
          <p style="text-align: center;">
            <a href="${resetLink}" class="btn">Reset Password</a>
          </p>
          <p>If you did not request a password reset, please ignore this email. Your password will remain unchanged.</p>
          <p>This reset link will expire in 1 hour.</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} SRM Alumni Nexus. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
