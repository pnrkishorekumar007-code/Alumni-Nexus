import alumni from "@/data/alumni.json";
import students from "@/data/students.json";
import jobs from "@/data/jobs.json";
import events from "@/data/events.json";
import posts from "@/data/posts.json";
import mentors from "@/data/mentors.json";
import news from "@/data/news.json";
import companies from "@/data/companies.json";
import type {
  Alumni,
  Student,
  Job,
  Event,
  Post,
  Mentor,
  NewsItem,
  Company,
  Activity,
} from "@/types";

export function getAlumni(): Alumni[] {
  return alumni as Alumni[];
}

export function getAlumniById(id: string): Alumni | undefined {
  return getAlumni().find((a) => a.id === id);
}

export function getFeaturedAlumni(): Alumni[] {
  return getAlumni().filter((a) => a.featured);
}

export function getHallOfFame(): Alumni[] {
  return getAlumni().filter((a) => a.hallOfFame);
}

export function getStudents(): Student[] {
  return students as Student[];
}

export function getJobs(): Job[] {
  return jobs as Job[];
}

export function getJobsByCategory(category: Job["category"]): Job[] {
  return getJobs().filter((j) => j.category === category);
}

export function getEvents(): Event[] {
  return events as Event[];
}

export function getUpcomingEvents(): Event[] {
  return getEvents().filter((e) => !e.past);
}

export function getPastEvents(): Event[] {
  return getEvents().filter((e) => e.past);
}

export function getPosts(): Post[] {
  return posts as Post[];
}

export function getTrendingPosts(): Post[] {
  return getPosts().filter((p) => p.trending);
}

export function getMentors(): Mentor[] {
  return mentors as Mentor[];
}

export function getNews(): NewsItem[] {
  return news as NewsItem[];
}

export function getCompanies(): Company[] {
  return companies as Company[];
}

export const userGrowthData = [
  { month: "Jan", students: 1200, alumni: 850, faculty: 120 },
  { month: "Feb", students: 1350, alumni: 920, faculty: 125 },
  { month: "Mar", students: 1480, alumni: 980, faculty: 128 },
  { month: "Apr", students: 1620, alumni: 1050, faculty: 130 },
  { month: "May", students: 1780, alumni: 1120, faculty: 132 },
  { month: "Jun", students: 1950, alumni: 1200, faculty: 135 },
  { month: "Jul", students: 2100, alumni: 1280, faculty: 138 },
];

export const departmentStats = [
  { name: "CSE", students: 4200, alumni: 8500, placements: 96 },
  { name: "ECE", students: 3800, alumni: 7200, placements: 94 },
  { name: "MECH", students: 3200, alumni: 6800, placements: 92 },
  { name: "IT", students: 2800, alumni: 5600, placements: 95 },
  { name: "DS&AI", students: 1500, alumni: 1200, placements: 97 },
  { name: "CIVIL", students: 2400, alumni: 5100, placements: 88 },
];

export const placementStats = [
  { year: "2020", rate: 88, avgPackage: 6.2 },
  { year: "2021", rate: 90, avgPackage: 7.1 },
  { year: "2022", rate: 92, avgPackage: 8.5 },
  { year: "2023", rate: 93, avgPackage: 9.8 },
  { year: "2024", rate: 94, avgPackage: 10.5 },
  { year: "2025", rate: 95, avgPackage: 12.0 },
];

export const mentorshipStats = [
  { month: "Jan", sessions: 145 },
  { month: "Feb", sessions: 178 },
  { month: "Mar", sessions: 210 },
  { month: "Apr", sessions: 256 },
  { month: "May", sessions: 289 },
  { month: "Jun", sessions: 312 },
  { month: "Jul", sessions: 348 },
];

export const recentActivities: Activity[] = [
  { id: "1", type: "mentorship", title: "Mentorship session completed", description: "Adithya Raman with Arjun Krishnamurthy", timestamp: "2026-07-19T08:00:00Z", icon: "HeartHandshake" },
  { id: "2", type: "job", title: "New job posted", description: "DevOps Engineer at Flipkart", timestamp: "2026-07-18T14:30:00Z", icon: "Briefcase" },
  { id: "3", type: "event", title: "Event registration", description: "AI & ML Symposium - 23 new registrations", timestamp: "2026-07-18T11:00:00Z", icon: "Calendar" },
  { id: "4", type: "alumni", title: "New alumni registered", description: "Kavya Srinivasan (Batch 2025, CSE)", timestamp: "2026-07-17T16:45:00Z", icon: "UserPlus" },
  { id: "5", type: "post", title: "Trending post", description: "Rahul Sharma's GreenDrive milestone", timestamp: "2026-07-17T14:20:00Z", icon: "TrendingUp" },
];

export const recentRegistrations = [
  { id: "1", name: "Kavya Srinivasan", email: "kavya.s@srmuniv.ac.in", role: "Student", department: "CSE", date: "2026-07-19", status: "verified" },
  { id: "2", name: "Sanjay Menon", email: "sanjay.m@srmalumni.org", role: "Alumni", department: "ECE", date: "2026-07-18", status: "pending" },
  { id: "3", name: "Dr. Lakshmi Narayan", email: "lakshmi.n@srmuniv.ac.in", role: "Faculty", department: "Biotechnology", date: "2026-07-18", status: "verified" },
  { id: "4", name: "Varun Reddy", email: "varun.r@srmalumni.org", role: "Alumni", department: "Mechanical", date: "2026-07-17", status: "pending" },
  { id: "5", name: "Ishita Banerjee", email: "ishita.b@srmuniv.ac.in", role: "Student", department: "Data Science & AI", date: "2026-07-17", status: "verified" },
];

export const pendingVerifications = [
  { id: "1", name: "Sanjay Menon", email: "sanjay.m@srmalumni.org", role: "Alumni", batch: 2018, submitted: "2026-07-18" },
  { id: "2", name: "Varun Reddy", email: "varun.r@srmalumni.org", role: "Alumni", batch: 2016, submitted: "2026-07-17" },
  { id: "3", name: "Nisha Kapoor", email: "nisha.k@srmalumni.org", role: "Alumni", batch: 2020, submitted: "2026-07-16" },
];
