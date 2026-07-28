"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { GraduationCap, Mail, Lock, User, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { BRAND, DEPARTMENTS } from "@/constants";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["student", "alumni", "faculty"]),
  department: z.string().min(1, "Select a department"),
  batch: z.string().min(4, "Enter a valid batch year"),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const { register, handleSubmit, setValue, control, formState: { errors, isSubmitting } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: "student" },
  });

  const watchedRole = useWatch({ control, name: "role" });

  const onSubmit = () => {
    toast.success("Account created! Please verify your email.");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-2/5 gradient-hero items-center justify-center p-12 relative overflow-hidden">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white max-w-sm">
          <div className="flex items-center gap-3 mb-6">
            <GraduationCap className="h-10 w-10" />
            <div>
              <h1 className="text-xl font-bold">{BRAND.name}</h1>
              <p className="text-blue-200 text-sm">{BRAND.shortName}</p>
            </div>
          </div>
          <h2 className="text-2xl font-bold">Join 50,000+ SRM Alumni</h2>
          <p className="mt-3 text-blue-100 text-sm leading-relaxed">
            Create your account to access mentorship, career opportunities, events, and the global SRM community.
          </p>
        </motion.div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 relative overflow-y-auto">
        <div className="absolute top-4 right-4"><ThemeToggle /></div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg py-6">
          <Card className="glass-card shadow-xl border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Create Account</CardTitle>
              <CardDescription>Join the SRM Alumni Nexus community</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Adithya Raman" className="pl-10" {...register("name")} />
                  </div>
                  {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input type="email" placeholder="you@srmuniv.ac.in" className="pl-10" {...register("email")} />
                  </div>
                  {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input type="password" placeholder="Min. 8 characters" className="pl-10" {...register("password")} />
                  </div>
                  {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Select value={watchedRole} onValueChange={(v) => setValue("role", v as RegisterForm["role"])}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="alumni">Alumni</SelectItem>
                        <SelectItem value="faculty">Faculty</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Batch Year</Label>
                    <Input placeholder="2026" {...register("batch")} />
                    {errors.batch && <p className="text-xs text-destructive">{errors.batch.message}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Department</Label>
                  <Select onValueChange={(v) => setValue("department", v)}>
                    <SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
                    <SelectContent>
                      {DEPARTMENTS.map((d) => (
                        <SelectItem key={d} value={d}>{d}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.department && <p className="text-xs text-destructive">{errors.department.message}</p>}
                </div>
                <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
                  Create Account <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
              <p className="mt-6 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary font-medium hover:underline">Sign in</Link>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
