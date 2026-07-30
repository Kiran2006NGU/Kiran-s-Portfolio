export type PageId = 'home' | 'projects' | 'skills' | 'academics' | 'ai-copilot' | 'playground' | 'contact';

export type ThemeMode = 'dark' | 'light' | 'nebula' | 'emerald' | 'sunset';

export interface PersonalInfo {
  name: string;
  shortName: string;
  headline: string;
  status: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  university: string;
  cgpa: string;
  year: string;
  about: string;
  objective: string;
  profileImage?: string;
  resumePdfUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'Fullstack' | 'AI / ML' | 'C++ / DSA' | 'Systems & Tools' | string;
  shortDescription: string;
  fullDescription: string;
  techStack: string[];
  keyFeatures: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  imageAccent: string;
  architectureNotes?: string;
  sampleCodeOrOutput?: string;
  metrics?: { label: string; value: string }[];
}

export interface SkillItem {
  name: string;
  level: number; // 0-100
  category: string;
  tag: string;
  description?: string;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: SkillItem[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  year?: string;
  description: string;
  badgeColor: string;
  credentialUrl?: string;
  skillsCovered?: string[];
  skills?: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
  cgpa: string;
  highlights: string[];
  courses: string[];
}

export interface AcademicAchievement {
  title: string;
  description: string;
  icon: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  education: Education;
  projects: Project[];
  skills: SkillCategory[];
  certifications: Certification[];
  achievements: AcademicAchievement[];
  adminPasscodeHash?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  suggestedActions?: { label: string; action: string }[];
}
