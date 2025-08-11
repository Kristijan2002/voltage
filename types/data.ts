export interface Service {
  id: string;
  language: string; // 'en' or 'sl'
  title: string;
  description: string;
  shortDescription: string;
  details: string;
  icon: string;
  price: string;
  warranty: string;
  duration: string;
  materials: string[];
  brands: string[];
  process: string[];
  included: string[];
  createdAt?: any; // Firestore timestamp
  updatedAt?: any; // Firestore timestamp
}

export interface Project {
  id: string;
  language: string; // 'en' or 'sl'
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  image: string;
  details: string;
  fullDescription: string;
  client: string;
  location: string;
  year: string;
  duration: string;
  budget: string;
  technologies: string[];
  challenges: string[];
  solutions: string[];
  results: string[];
  images: string[];
  testimonial?: {
    text?: string;
    author?: string;
    position?: string;
  };
  createdAt?: any; // Firestore timestamp
  updatedAt?: any; // Firestore timestamp
}

export interface FAQ {
  id: string;
  language: string; // 'en' or 'sl'
  question: string;
  answer: string;
  createdAt?: any; // Firestore timestamp
  updatedAt?: any; // Firestore timestamp
}

export interface EditingFAQ extends FAQ {
  index: number;
}

// New interface for language-specific content management
export interface LanguageContent {
  en: string;
  sl: string;
}

export interface MultiLanguageService {
  id: string;
  title: LanguageContent;
  description: LanguageContent;
  shortDescription: LanguageContent;
  details: LanguageContent;
  icon: string;
  price: LanguageContent;
  warranty: LanguageContent;
  duration: LanguageContent;
  materials: LanguageContent[];
  brands: string[];
  process: LanguageContent[];
  included: LanguageContent[];
  createdAt?: any;
  updatedAt?: any;
}

export interface MultiLanguageProject {
  id: string;
  title: LanguageContent;
  description: LanguageContent;
  shortDescription: LanguageContent;
  category: string;
  image: string;
  details: LanguageContent;
  fullDescription: LanguageContent;
  client: string;
  location: string;
  year: string;
  duration: string;
  budget: string;
  technologies: string[];
  challenges: LanguageContent[];
  solutions: LanguageContent[];
  results: LanguageContent[];
  images: string[];
  testimonial?: {
    text?: LanguageContent;
    author?: string;
    position?: string;
  };
  createdAt?: any;
  updatedAt?: any;
}

export interface MultiLanguageFAQ {
  id: string;
  question: LanguageContent;
  answer: LanguageContent;
  createdAt?: any;
  updatedAt?: any;
}
