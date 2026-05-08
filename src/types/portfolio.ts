export interface Experience {
  position: string;
  company: string;
  duration: string;
  description: string[];
}

export interface Education {
  degree: string;
  institution: string;
  duration: string;
}

export interface PortfolioData {
  name: string;
  role: string;
  profileImage: string;
  profile: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  languages: string[];
}
