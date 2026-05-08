import { PortfolioData } from "@/types/portfolio";

export const dummyData: PortfolioData = {
  "name": "Budi Santoso",
  "role": "Frontend Developer",
  "profileImage": "https://images.unsplash.com/photo-1773332611550-9f5a465b4e42?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "profile": "Seorang Frontend Developer yang berdedikasi dengan pengalaman lebih dari 5 tahun dalam merancang dan membangun aplikasi web yang responsif serta berkinerja tinggi. Memiliki keahlian mendalam dalam ekosistem React.js, TypeScript, dan optimasi antarmuka pengguna.",
  "experience": [
    {
      "position": "Senior Frontend Developer",
      "company": "PT Inovasi Teknologi Nusantara",
      "duration": "Januari 2022 - Sekarang",
      "description": [
        "Memimpin tim yang terdiri dari 4 developer frontend dalam membangun ulang platform e-commerce utama perusahaan menggunakan React dan Next.js.",
        "Meningkatkan performa pemuatan website (load time) sebesar 40% dengan mengoptimalkan aset dan mengimplementasikan Server-Side Rendering (SSR).",
        "Berkolaborasi erat dengan tim UI/UX untuk memastikan implementasi desain yang pixel-perfect dan memenuhi standar aksesibilitas (WCAG)."
      ]
    },
    {
      "position": "Web Developer",
      "company": "CV Solusi Digital Kreatif",
      "duration": "Agustus 2019 - Desember 2021",
      "description": [
        "Mengembangkan dan memelihara lebih dari 15 website klien menggunakan HTML, CSS, JavaScript modern, dan berbagai sistem manajemen konten (CMS).",
        "Mengintegrasikan RESTful API dari pihak ketiga untuk mengaktifkan fitur gateway pembayaran dan manajemen inventaris real-time.",
        "Melakukan pengujian cross-browser dan debugging secara berkala untuk memastikan pengalaman pengguna yang konsisten di berbagai perangkat web dan mobile."
      ]
    }
  ],
  "education": [
    {
      "degree": "Magister Teknik Komputer",
      "institution": "Universitas Indonesia",
      "duration": "Agustus 2019 - Sekarang"
    },
    {
      "degree": "Sarjana Komputer (S1) - Teknik Informatika",
      "institution": "Universitas Indonesia",
      "duration": "Agustus 2015 - Juli 2019"
    },
  ],
  "skills": [
    "JavaScript (ES6+)",
    "TypeScript",
    "React.js",
    "Next.js",
    "Tailwind CSS",
    "Git / Version Control",
    "RESTful API Integration",
    "Agile / Scrum Methodology"
  ],
  "languages": [
    "Bahasa Indonesia (Native)",
    "Bahasa Inggris (Professional Working Proficiency)"
  ]
};
