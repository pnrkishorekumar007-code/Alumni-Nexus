"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) inputs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    if (otp.some((d) => !d)) {
      toast.error("Please enter the complete 6-digit OTP");
      return;
    }
    toast.success("Email verified! You can now reset your password.");
    window.location.href = "/login";
  };

  const handleResend = () => {
    setOtp(["", "", "", "", "", ""]);
    inputs.current[0]?.focus();
    toast.success("New OTP sent to your email");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <div className="absolute top-4 right-4"><ThemeToggle /></div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <Card className="glass-card shadow-xl border-0">
          <CardHeader className="text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary mx-auto mb-4">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <CardTitle className="text-2xl">Verify OTP</CardTitle>
            <CardDescription>
              Enter the 6-digit code sent to your email address
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center gap-2 sm:gap-3 mb-6">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { inputs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className="w-11 h-12 sm:w-12 sm:h-14 text-center text-lg font-bold rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              ))}
            </div>

            <Button className="w-full gap-2" onClick={handleVerify}>
              Verify & Continue <ArrowRight className="h-4 w-4" />
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-4">
              Didn&apos;t receive the code?{" "}
              <button onClick={handleResend} className="text-primary font-medium hover:underline">
                Resend OTP
              </button>
            </p>

            <Link href="/forgot-password">
              <Button variant="ghost" className="w-full mt-4 gap-2">
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
            </Link>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
