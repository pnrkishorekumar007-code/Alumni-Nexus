import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";
import { NAV_LINKS } from "@/constants";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: "student" | "alumni" | "faculty" | "admin";
  userName?: string;
  userAvatar?: string;
}

export function DashboardLayout({ children, role, userName, userAvatar }: DashboardLayoutProps) {
  const links = NAV_LINKS[role];

  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="dashboard" userName={userName} userAvatar={userAvatar} />
      <Sidebar links={[...links]} />
      <main className="lg:pl-64 pt-6 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
