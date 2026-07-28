import Link from "next/link";
import { GraduationCap, Mail, MapPin, Phone } from "lucide-react";
import { BRAND } from "@/constants";

export function Footer() {
  return (
    <footer className="border-t bg-primary text-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold text-white">{BRAND.name}</p>
                <p className="text-xs text-blue-200">{BRAND.shortName}</p>
              </div>
            </div>
            <p className="text-sm text-blue-100 leading-relaxed">
              Connecting {BRAND.university} alumni, students, and faculty worldwide.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-accent">Platform</h4>
            <ul className="space-y-2 text-sm text-blue-100">
              <li><Link href="/alumni" className="hover:text-accent transition-colors">Alumni Directory</Link></li>
              <li><Link href="/jobs" className="hover:text-accent transition-colors">Career Hub</Link></li>
              <li><Link href="/mentorship" className="hover:text-accent transition-colors">Mentorship</Link></li>
              <li><Link href="/events" className="hover:text-accent transition-colors">Events</Link></li>
              <li><Link href="/community" className="hover:text-accent transition-colors">Community</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-accent">Resources</h4>
            <ul className="space-y-2 text-sm text-blue-100">
              <li><Link href="/recognition" className="hover:text-accent transition-colors">Hall of Fame</Link></li>
              <li><Link href="/dashboard/student" className="hover:text-accent transition-colors">Student Portal</Link></li>
              <li><Link href="/dashboard/alumni" className="hover:text-accent transition-colors">Alumni Portal</Link></li>
              <li><Link href="/settings" className="hover:text-accent transition-colors">Settings</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-accent">Contact</h4>
            <ul className="space-y-3 text-sm text-blue-100">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{BRAND.location}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <span>alumni@srmist.edu.in</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+91 44 2745 2222</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 border-t border-white/20 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-blue-200">
            © 2026 {BRAND.university}. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-blue-200">
            <Link href="#" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-accent transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
