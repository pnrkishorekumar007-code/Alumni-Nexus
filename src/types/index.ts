export type UserRole = "student" | "alumni" | "faculty" | "admin";

export interface Alumni {
  id: string;
  name: string;
  email: string;
  avatar: string;
  coverImage: string;
  department: string;
  batch: number;
  degree: string;
  currentRole: string;
  company: string;
  location: string;
  country: string;
  skills: string[];
  experience: number;
  bio: string;
  linkedin?: string;
  github?: string;
  website?: string;
  achievements: string[];
  certifications: { name: string; issuer: string; year: number }[];
  education: { degree: string; institution: string; year: number }[];
  experienceHistory: {
    role: string;
    company: string;
    startYear: number;
    endYear?: number;
    description: string;
  }[];
  projects: { name: string; description: string; tech: string[] }[];
  featured?: boolean;
  hallOfFame?: boolean;
  category?: "founder" | "researcher" | "award-winner" | "leader";
}

export interface Student {
  id: string;
  name: string;
  email: string;
  avatar: string;
  department: string;
  batch: number;
  year: number;
  rollNumber: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  type: "full-time" | "part-time" | "contract";
  category: "job" | "internship" | "referral";
  department: string[];
  experience: string;
  salary: string;
  postedBy: string;
  postedDate: string;
  deadline: string;
  description: string;
  requirements: string[];
  skills: string[];
  applicants: number;
  featured?: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  type: "workshop" | "reunion" | "webinar" | "symposium" | "networking";
  date: string;
  endDate?: string;
  time: string;
  location: string;
  mode: "online" | "offline" | "hybrid";
  image: string;
  organizer: string;
  attendees: number;
  maxAttendees: number;
  featured?: boolean;
  past?: boolean;
}

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorRole: string;
  content: string;
  image?: string;
  poll?: { question: string; options: { text: string; votes: number }[] };
  likes: number;
  comments: number;
  shares: number;
  createdAt: string;
  trending?: boolean;
}

export interface Mentor {
  id: string;
  alumniId: string;
  name: string;
  avatar: string;
  department: string;
  company: string;
  role: string;
  expertise: string[];
  rating: number;
  sessionsCompleted: number;
  availability: string[];
  bio: string;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  author: string;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  industry: string;
  location: string;
  alumniCount: number;
  openPositions: number;
}

export interface Activity {
  id: string;
  type: string;
  title: string;
  description: string;
  timestamp: string;
  icon: string;
}

export interface DashboardStat {
  label: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon: string;
}
