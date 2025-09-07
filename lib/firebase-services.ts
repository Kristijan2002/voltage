import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy,
  serverTimestamp,
  where 
} from 'firebase/firestore';
import { db, auth } from './firebase';
import { Service, Project, FAQ, MultiLanguageService, MultiLanguageProject, MultiLanguageFAQ } from '../types/data';

// Collection names
const COLLECTIONS = {
  SERVICES: 'services',
  PROJECTS: 'projects',
  FAQS: 'faqs',
  TRANSLATIONS: 'translations'
} as const;

// Debug function to test Firebase connection
export const testFirebaseConnection = async () => {
  try {
    
    // Try to access a collection to test permissions
    const testQuery = await getDocs(collection(db, 'services'));
    return true;
  } catch (error: any) {
    console.error('Firebase connection test failed:', error);
    return false;
  }
};

// Helper function to check authentication for write operations
const checkAuth = () => {
  if (!auth.currentUser) {
    throw new Error('User not authenticated. Please log in first.');
  }
};

// Generic CRUD operations
export const firebaseServices = {
  // Get all documents from a collection (public read access)
  async getAll<T>(collectionName: string, language?: string): Promise<T[]> {
    try {
      
      let querySnapshot;
      
      if (language && collectionName !== COLLECTIONS.TRANSLATIONS) {
        // For content collections, filter by language
        const q = query(
          collection(db, collectionName), 
          where('language', '==', language),
          orderBy('createdAt', 'desc')
        );
        querySnapshot = await getDocs(q);
      } else if (language && collectionName === COLLECTIONS.TRANSLATIONS) {
        // For translations, filter by language
        const q = query(
          collection(db, collectionName), 
          where('language', '==', language),
          orderBy('createdAt', 'desc')
        );
        querySnapshot = await getDocs(q);
      } else {
        // For other collections, try to get documents with ordering first, fallback to unordered if that fails
        try {
          const q = query(collection(db, collectionName), orderBy('createdAt', 'desc'));
          querySnapshot = await getDocs(q);
        } catch (orderError: any) {
          // Fallback to unordered query if ordering fails
          querySnapshot = await getDocs(collection(db, collectionName));
        }
      }
      
      const results = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as T[];
      
      return results;
    } catch (error: any) {
      if (error.code === 'permission-denied') {
        throw new Error(`Permission denied accessing ${collectionName}. Please check Firebase security rules.`);
      }
      throw new Error(`Failed to fetch ${collectionName}: ${error.message}`);
    }
  },

  // Get a single document by ID (public read access)
  async getById<T>(collectionName: string, id: string): Promise<T | null> {
    try {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as T;
      } else {
        return null;
      }
    } catch (error: any) {
      if (error.code === 'permission-denied') {
        throw new Error(`Permission denied accessing ${collectionName}. Please check Firebase security rules.`);
      }
      throw new Error(`Failed to fetch ${collectionName}: ${error.message}`);
    }
  },

  // Add a document (requires authentication)
  async add<T>(collectionName: string, data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      checkAuth();
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error: any) {
      if (error.code === 'permission-denied') {
        throw new Error(`Permission denied adding ${collectionName}. Please check Firebase security rules and ensure you're logged in.`);
      }
      throw new Error(`Failed to add ${collectionName}: ${error.message}`);
    }
  },

  // Update a document (requires authentication)
  async update<T>(collectionName: string, id: string, data: Partial<T>): Promise<void> {
    try {
      checkAuth();
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp()
      });
    } catch (error: any) {
      if (error.code === 'permission-denied') {
        throw new Error(`Permission denied updating ${collectionName}. Please check Firebase security rules and ensure you're logged in.`);
      }
      throw new Error(`Failed to update ${collectionName}: ${error.message}`);
    }
  },

  // Delete a document (requires authentication)
  async delete(collectionName: string, id: string): Promise<void> {
    try {
      checkAuth();
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
    } catch (error: any) {
      if (error.code === 'permission-denied') {
        throw new Error(`Permission denied deleting ${collectionName}. Please check Firebase security rules and ensure you're logged in.`);
      }
      throw new Error(`Failed to delete ${collectionName}: ${error.message}`);
    }
  }
};

// Service-specific operations
export const servicesAPI = {
  // Public read access - get services by language
  async getAll(language?: string): Promise<Service[]> {
    return firebaseServices.getAll<Service>(COLLECTIONS.SERVICES, language);
  },

  // Get services in all languages for admin panel
  async getAllLanguages(): Promise<Service[]> {
    return firebaseServices.getAll<Service>(COLLECTIONS.SERVICES);
  },

  async getById(id: string): Promise<Service | null> {
    return firebaseServices.getById<Service>(COLLECTIONS.SERVICES, id);
  },

  // Admin operations (require authentication)
  async add(service: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    return firebaseServices.add<Service>(COLLECTIONS.SERVICES, service);
  },

  async update(id: string, service: Partial<Service>): Promise<void> {
    return firebaseServices.update<Service>(COLLECTIONS.SERVICES, id, service);
  },

  async delete(id: string): Promise<void> {
    return firebaseServices.delete(COLLECTIONS.SERVICES, id);
  }
};

export const projectsAPI = {
  // Public read access - get projects by language
  async getAll(language?: string): Promise<Project[]> {
    return firebaseServices.getAll<Project>(COLLECTIONS.PROJECTS, language);
  },

  // Get projects in all languages for admin panel
  async getAllLanguages(): Promise<Project[]> {
    return firebaseServices.getAll<Project>(COLLECTIONS.PROJECTS);
  },

  async getById(id: string): Promise<Project | null> {
    return firebaseServices.getById<Project>(COLLECTIONS.PROJECTS, id);
  },

  // Admin operations (require authentication)
  async add(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    return firebaseServices.add<Project>(COLLECTIONS.PROJECTS, project);
  },

  async update(id: string, project: Partial<Project>): Promise<void> {
    return firebaseServices.update<Project>(COLLECTIONS.PROJECTS, id, project);
  },

  async delete(id: string): Promise<void> {
    return firebaseServices.delete(COLLECTIONS.PROJECTS, id);
  }
};

export const faqsAPI = {
  // Public read access - get FAQs by language
  async getAll(language?: string): Promise<FAQ[]> {
    return firebaseServices.getAll<FAQ>(COLLECTIONS.FAQS, language);
  },

  // Get FAQs in all languages for admin panel
  async getAllLanguages(): Promise<FAQ[]> {
    return firebaseServices.getAll<FAQ>(COLLECTIONS.FAQS);
  },

  async getById(id: string): Promise<FAQ | null> {
    return firebaseServices.getById<FAQ>(COLLECTIONS.FAQS, id);
  },

  // Admin operations (require authentication)
  async add(faq: Omit<FAQ, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    return firebaseServices.add<FAQ>(COLLECTIONS.FAQS, faq);
  },

  async update(id: string, faq: Partial<FAQ>): Promise<void> {
    return firebaseServices.update<FAQ>(COLLECTIONS.FAQS, id, faq);
  },

  async delete(id: string): Promise<void> {
    return firebaseServices.delete(COLLECTIONS.FAQS, id);
  }
};

// New translations API for dynamic content
export const translationsAPI = {
  // Get translations for a specific language
  async getByLanguage(language: string): Promise<any[]> {
    return firebaseServices.getAll(COLLECTIONS.TRANSLATIONS, language);
  },

  // Get all translations
  async getAll(): Promise<any[]> {
    return firebaseServices.getAll(COLLECTIONS.TRANSLATIONS);
  },

  // Add a new translation
  async add(translation: { language: string; key: string; value: string; context?: string }): Promise<string> {
    return firebaseServices.add(COLLECTIONS.TRANSLATIONS, translation);
  },

  // Update a translation
  async update(id: string, translation: Partial<any>): Promise<void> {
    return firebaseServices.update(COLLECTIONS.TRANSLATIONS, id, translation);
  },

  // Delete a translation
  async delete(id: string): Promise<void> {
    return firebaseServices.delete(COLLECTIONS.TRANSLATIONS, id);
  }
};

// Sample data for testing
const sampleServices: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    language: 'sl',
    title: 'Odpravljanje napak',
    description: '24/7 odziv za kritične situacije',
    shortDescription: 'Hitro odpravljanje električnih napak',
    details: 'Hitro in zanesljivo odpravljanje električnih napak. Na razpolago smo 24 ur na dan, 7 dni v tednu za nujne primere. Uporabljamo najsodobnejšo opremo za diagnosticiranje in reševanje problemov.',
    icon: '⚡',
    price: '45€/ura (nujni primeri)',
    warranty: '2 leti garancije',
    duration: '30 min - 4 ure',
    materials: [
      'Rezervni deli za takojšnjo zamenjavo',
      'Univerzalni kabli in priključki',
      'Varnostna oprema (ABB, Hager)',
      'Diagnostični instrumenti (Fluke, Testo)'
    ],
    brands: ['ABB', 'Hager', 'Schneider Electric', 'Siemens', 'Fluke', 'Testo'],
    process: [
      'Hiter odziv na klic (2-4 ure)',
      'Varnostna ocena situacije',
      'Lokalizacija napake z diagnostično opremo',
      'Takojšnja začasna rešitev za varnost',
      'Trajna odprava napake',
      'Preventivni ukrepi za preprečitev ponovitve'
    ],
    included: [
      'Brezplačen dohod v Ljubljani',
      '24/7 razpoložljivost',
      'Začasna rešitev v 30 minutah',
      'Garancija na opravljeno delo',
      'Svetovanje za preprečitev napak'
    ]
  },
  {
    language: 'sl',
    title: 'Nove elektroinštalacije',
    description: 'Popolne elektroinštalacije za nova stanovanja in hiše',
    shortDescription: 'Kompletne elektroinštalacije',
    details: 'Projektiranje in izvedba novih elektroinštalacij za stanovanjske in poslovne objekte. Zagotavljamo kakovostno izvedbo v skladu z veljavnimi standardi in predpisi.',
    icon: '🏠',
    price: 'Od 25€/m²',
    warranty: '5 let garancije',
    duration: '3-14 dni',
    materials: [
      'Bakreni kabli NYM-J (Nexans, Prysmian)',
      'Razdelilne omarice (ABB, Schneider)',
      'Varnostni elementi (ABB, Hager)',
      'Inštalacijske cevi in kanali (Pipelife)'
    ],
    brands: ['ABB', 'Schneider Electric', 'Hager', 'Nexans', 'Prysmian', 'Pipelife'],
    process: [
      'Projektiranje elektroinštalacije',
      'Pridobivanje dovoljenj',
      'Dobava materialov',
      'Izvedba instalacijskih del',
      'Testiranje in meritve',
      'Pridobivanje uporabnega dovoljenja'
    ],
    included: [
      'Projekt elektroinštalacije',
      'Vsi potrebni materiali',
      'Meritve in preizkusi',
      'Dokumentacija za upravne organe',
      '5-letna garancija na celotno instalacijo'
    ]
  },
  {
    language: 'sl',
    title: 'Montaža svetil',
    description: 'Profesionalna montaža vseh vrst svetil',
    shortDescription: 'Montaža svetil in razsvetljave',
    details: 'Montaža notranjih in zunanjih svetil, LED tehnologije, pametnih svetlobnih sistemov in dekorativne razsvetljave. Svetujemo pri izbiri energetsko učinkovitih rešitev.',
    icon: '💡',
    price: '25€/svetilo',
    warranty: '3 leta garancije',
    duration: '30 min - 2 ure',
    materials: [
      'LED svetila (Philips, Osram, Ledvance)',
      'Pametna svetila (Philips Hue, IKEA)',
      'Dekorativna svetila (premium blagovne znamke)',
      'Montažni material (Fischer, Rawl)'
    ],
    brands: ['Philips', 'Osram', 'Ledvance', 'IKEA', 'Fischer', 'Rawl'],
    process: [
      'Svetovanje pri izbiri svetil',
      'Preverjanje obstoječe instalacije',
      'Profesionalna montaža',
      'Testiranje delovanja',
      'Nastavitev pametnih funkcij',
      'Navodila za uporabo'
    ],
    included: [
      'Svetovanje o energetski učinkovitosti',
      'Montaža in priklop',
      'Nastavitev pametnih funkcij',
      'Odpadni material odnesen',
      'Garancija na montažo in delovanje'
    ]
  }
];

const sampleProjects: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    language: 'sl',
    title: 'Elektrifikacija nove hiše v Ljubljani',
    description: 'Kompletna elektroinštalacija za družinsko hišo',
    shortDescription: 'Nova hiša - kompletna elektroinštalacija',
    category: 'nove-instalacije',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
    details: 'Projektiranje in izvedba kompletne elektroinštalacije za novo družinsko hišo v Ljubljani. Vključno z razdelilno omarico, varnostnimi elementi in pametnim sistemom.',
    fullDescription: 'Kompletna elektroinštalacija za novo družinsko hišo z najsodobnejšo tehnologijo in varnostnimi standardi.',
    client: 'Družina Novak',
    location: 'Ljubljana, Slovenija',
    year: '2024',
    duration: '14 dni',
    budget: '15.000€',
    technologies: ['ABB', 'Schneider Electric', 'Philips Hue'],
    challenges: [
      'Kompleksna arhitektura hiše',
      'Visoki varnostni standardi',
      'Pametni sistemi'
    ],
    solutions: [
      'Prilagojen projekt elektroinštalacije',
      'Najvišja varnostna oprema',
      'Integracija pametnih sistemov'
    ],
    results: [
      'Varnostna oprema najvišje kategorije',
      'Pametni sistem za upravljanje energije',
      '5-letna garancija na celotno instalacijo'
    ],
    images: [],
    testimonial: {
      text: 'Odlično delo! Elektroinštalacija je popolna in vse deluje brezhibno.',
      author: 'Marko Novak',
      position: 'Lastnik hiše'
    }
  }
];

// Function to populate database with sample data (for testing)
export const populateSampleData = async () => {
  try {
    checkAuth();
    
    // Add sample services
    for (const service of sampleServices) {
      await servicesAPI.add(service);
    }
    
    // Add sample projects
    for (const project of sampleProjects) {
      await projectsAPI.add(project);
    }
    
    return true;
  } catch (error: any) {
    throw new Error(`Failed to populate sample data: ${error.message}`);
  }
};
