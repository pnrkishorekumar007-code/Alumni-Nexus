export const BRAND = {
  name: "SRM Alumni Nexus",
  shortName: "SRM Connect",
  tagline: "Connecting Generations of SRM Excellence",
  primary: "#003DA5",
  gold: "#FFC72C",
  university: "SRM Institute of Science and Technology",
  location: "Chennai, Tamil Nadu, India",
} as const;

export const DEPARTMENTS = [
  "Computer Science & Engineering",
  "Electronics & Communication",
  "Mechanical Engineering",
  "Civil Engineering",
  "Electrical & Electronics",
  "Information Technology",
  "Biotechnology",
  "Data Science & AI",
  "Automobile Engineering",
  "Aerospace Engineering",
] as const;

export const COUNTRIES = [
  "India",
  "United States",
  "United Kingdom",
  "Singapore",
  "Germany",
  "Canada",
  "Australia",
  "UAE",
  "Japan",
  "Netherlands",
] as const;

export const SKILLS = [
  "React",
  "Node.js",
  "Python",
  "Machine Learning",
  "Cloud Architecture",
  "Product Management",
  "Data Analytics",
  "DevOps",
  "UI/UX Design",
  "Cybersecurity",
] as const;

export const NAV_LINKS = {
  public: [
    { href: "/alumni", label: "Alumni Directory" },
    { href: "/jobs", label: "Career Hub" },
    { href: "/events", label: "Events" },
    { href: "/community", label: "Community" },
    { href: "/recognition", label: "Recognition" },
  ],
  student: [
    { href: "/dashboard/student", label: "Dashboard", icon: "LayoutDashboard" },
    { href: "/alumni", label: "Alumni", icon: "Users" },
    { href: "/jobs", label: "Jobs", icon: "Briefcase" },
    { href: "/internships", label: "Internships", icon: "GraduationCap" },
    { href: "/mentorship", label: "Mentorship", icon: "HeartHandshake" },
    { href: "/community", label: "Community", icon: "MessageSquare" },
    { href: "/events", label: "Events", icon: "Calendar" },
    { href: "/settings", label: "Settings", icon: "Settings" },
  ],
  alumni: [
    { href: "/dashboard/alumni", label: "Dashboard", icon: "LayoutDashboard" },
    { href: "/profile", label: "Profile", icon: "User" },
    { href: "/mentorship", label: "Mentorship", icon: "HeartHandshake" },
    { href: "/jobs", label: "Post Jobs", icon: "Briefcase" },
    { href: "/community", label: "Community", icon: "MessageSquare" },
    { href: "/events", label: "Events", icon: "Calendar" },
    { href: "/recognition", label: "Recognition", icon: "Award" },
    { href: "/settings", label: "Settings", icon: "Settings" },
  ],
  faculty: [
    { href: "/dashboard/faculty", label: "Dashboard", icon: "LayoutDashboard" },
    { href: "/alumni", label: "Alumni", icon: "Users" },
    { href: "/mentorship", label: "Mentorship", icon: "HeartHandshake" },
    { href: "/events", label: "Events", icon: "Calendar" },
    { href: "/community", label: "Community", icon: "MessageSquare" },
    { href: "/settings", label: "Settings", icon: "Settings" },
  ],
  admin: [
    { href: "/dashboard/admin", label: "Dashboard", icon: "LayoutDashboard" },
    { href: "/alumni", label: "Users", icon: "Users" },
    { href: "/events", label: "Events", icon: "Calendar" },
    { href: "/jobs", label: "Jobs", icon: "Briefcase" },
    { href: "/recognition", label: "Reports", icon: "BarChart3" },
    { href: "/settings", label: "Settings", icon: "Settings" },
  ],
} as const;

export const STATS = [
  { label: "Alumni Worldwide", value: 50000, suffix: "+" },
  { label: "Countries", value: 80, suffix: "+" },
  { label: "Partner Companies", value: 500, suffix: "+" },
  { label: "Mentorship Sessions", value: 12000, suffix: "+" },
] as const;
