import { Resend } from "resend";
import { config } from "./index";

let resendClient: Resend | null = null;

export function initResend() {
  if (!config.resend.apiKey) {
    console.warn("Resend API key not configured. Emails will be disabled.");
    return null;
  }
  resendClient = new Resend(config.resend.apiKey);
  return resendClient;
}

export function getResendClient(): Resend | null {
  return resendClient;
}
