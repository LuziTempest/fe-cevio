// Backend Interfaces (Directly from API)
export interface Profile {
  nama: string;
  email: string;
  linkedin?: string;
  github?: string;
  deskripsi_diri: string;
}

export interface Education {
  institusi: string;
  jurusan: string;
  tahun: string;
}

export interface Experience {
  posisi: string;
  perusahaan: string;
  durasi: string;
  deskripsi: string[];
}

export interface Project {
  nama_proyek: string;
  deskripsi: string;
  teknologi: string[];
}

export interface PortfolioContent {
  profil: Profile;
  pendidikan: Education[];
  pengalaman_kerja: Experience[];
  proyek: Project[];
  keahlian: string[];
}

// Frontend Interfaces (Used by Templates)
export interface FrontendExperience {
  position: string;
  company: string;
  duration: string;
  description: string[];
}

export interface FrontendEducation {
  degree: string;
  institution: string;
  duration: string;
}

export interface PortfolioData {
  name: string;
  role: string;
  profileImage: string;
  profile: string;
  experience: FrontendExperience[];
  education: FrontendEducation[];
  skills: string[];
  languages: string[];
}

// Response/Request Interfaces
export interface Portfolio {
  id: number;
  title: string;
  theme: string;
  focus: string;
  foto: string;
  data: PortfolioContent;
  created_at: string;
}

export interface GeneratePortfolioResponse {
  status: "success" | "error";
  message: string;
  data: {
    data: PortfolioContent;
  };
}

export interface SavePortfolioRequest {
  title: string;
  tema_terpilih: string;
  fokus_terpilih: string;
  foto: string;
  data: PortfolioContent;
}

export interface PortfolioResponse {
  status: "success" | "error";
  message: string;
  data: Portfolio;
}

export interface PortfoliosResponse {
  status: "success" | "error";
  message: string;
  data: Portfolio[];
}
