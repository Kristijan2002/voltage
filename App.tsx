import { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Zap, CheckCircle, Menu, X, ArrowLeft, Euro, Clock, Shield, Settings, Camera, Users, Lock, Plus, Edit, Trash2, Save, Calendar, User, Award, Target } from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './components/ui/accordion';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import { Label } from './components/ui/label';
import { Badge } from './components/ui/badge';
import { Separator } from './components/ui/separator';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Alert, AlertDescription } from './components/ui/alert';
// impoconst logoPath = '/logo.png';

// Types
interface Service {
  id: string;
  title: string;
  description: string;
  details: string;
  icon: string;
  price: string;
  warranty: string;
  duration: string;
  materials: string[];
  brands: string[];
  process: string[];
  included: string[];
}

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
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
    text: string;
    author: string;
    position: string;
  };
}

interface FAQ {
  question: string;
  answer: string;
}

// Initial data
const initialServices: Service[] = [
  {
    id: 'odpravljanje-napak',
    title: 'Odpravljanje napak',
    description: '24/7 odziv za kritične situacije',
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
    id: 'nove-instalacije',
    title: 'Nove elektroinštalacije',
    description: 'Popolne elektroinštalacije za nova stanovanja in hiše',
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
    id: 'svetila',
    title: 'Montaža svetil',
    description: 'Profesionalna montaža vseh vrst svetil',
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
  },
  {
    id: 'vtičnice',
    title: 'Montaža vtičnic',
    description: 'Dodajanje novih vtičnic in preklopnikov',
    details: 'Dodajanje novih vtičnic, preklopnikov in drugih električnih priključkov. Zagotavljamo varno in estetsko izvedbo z minimalnimi posegi v obstoječo strukturo.',
    icon: '🔌',
    price: '35€/vtičnica',
    warranty: '3 leta garancije',
    duration: '1-2 ure',
    materials: [
      'Kakovostne vtičnice (Legrand, Jung, Gira)',
      'Preklopniki in tipkala (Jung, Berker)',
      'Inštalacijski kabel NYM-J',
      'Montažne doze in material'
    ],
    brands: ['Legrand', 'Jung', 'Gira', 'Berker', 'ABB', 'Schneider'],
    process: [
      'Ogled in načrtovanje pozicij',
      'Preverjanje obstoječe instalacije',
      'Izdelava odprtin (če potrebno)',
      'Polaganje kablov',
      'Montaža vtičnic/preklopnikov',
      'Testiranje in dokončanje'
    ],
    included: [
      'Svetovanje o optimalni razporeditvi',
      'Vsa potrebna orodja in materiali',
      'Čiščenje po opravljenem delu',
      'Testiranje varnosti',
      'Garancija na montažo'
    ]
  },
  {
    id: 'pametni-dom',
    title: 'Pametni dom',
    description: 'Avtomatizacija in pametni sistemi',
    details: 'Inštalacija pametnih sistemov za dom, avtomatizacija razsvetljave, varnostni sistemi, pametni termostati in integrirane rešitve za sodoben način življenja.',
    icon: '🏡',
    price: 'Od 200€/sistem',
    warranty: '2 leta garancije',
    duration: '4-8 ur',
    materials: [
      'Pametni preklopniki (Shelly, Sonoff)',
      'Pametni termostati (Nest, Honeywell)',
      'Varnostni senzorji (Ajax, Paradox)',
      'Centralne enote (Fibaro, Homey)'
    ],
    brands: ['Shelly', 'Sonoff', 'Nest', 'Honeywell', 'Ajax', 'Fibaro'],
    process: [
      'Analiza potreb in načrtovanje sistema',
      'Izbira kompatibilnih naprav',
      'Inštalacija pametnih komponent',
      'Konfiguracija in povezovanje',
      'Testiranje avtomatizacij',
      'Usposabljanje uporabnika'
    ],
    included: [
      'Svetovanje o pametnih rešitvah',
      'Konfiguracija mobilnih aplikacij',
      'Usposabljanje za uporabo',
      'Dokumentacija sistema',
      'Tehnična podpora 6 mesecev'
    ]
  }
];

const initialProjects: Project[] = [
  {
    id: 1,
    title: 'Popolna elektroinštalacija hiše',
    category: 'nove-instalacije',
    description: 'Celotna elektroinštalacija za 200m² stanovanjsko hišo z modernimi pametnimi sistemi.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
    details: 'Ljubljana, 2024',
    fullDescription: 'Obsežen projekt celotne elektroinštalacije za novo stanovanjsko hišo v Ljubljani. Projekt je vključeval načrtovanje in izvedbo kompleksne elektroinštalacije z integriranimi pametnimi sistemi za sodoben način življenja.',
    client: 'Družina Novak',
    location: 'Ljubljana, Bežigrad',
    year: '2024',
    duration: '14 dni',
    budget: '15.000€',
    technologies: ['ABB pametni sistemi', 'LED razsvetljava', 'KNX avtomatizacija', 'Varnostni senzorji', 'Pametni termostati'],
    challenges: [
      'Integracija starega dela hiše z novo dozidavo',
      'Kompleksna koordinacija z drugimi obrtniki',
      'Implementacija pametnega sistema v obstoječo strukturo',
      'Zagotavljanje ustreznih varnostnih standardov'
    ],
    solutions: [
      'Izdelava natančnih načrtov za fazno izvedbo',
      'Uporaba naprednih KNX sistemov za integracijo',
      'Redno usklajevanje z arhitektom in drugim projektnim timom',
      'Testiranje in kalibracija vseh sistemov pred predajo'
    ],
    results: [
      '100% digitalno upravljanje razsvetljave in ogrevanja',
      '40% zmanjšanje porabe električne energije',
      'Celostna pametna hiša z glasovnim upravljanjem',
      'Popolna integracija z obstoječo strukturo',
      'Zadovoljnost stranke: 5/5 zvezdic'
    ],
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=600&h=400&fit=crop'
    ],
    testimonial: {
      text: 'Voltage je presegel vsa naša pričakovanja. Profesionalnost, odzivnost in kakovost dela so na najvišji ravni. Pametni dom deluje brezhibno!',
      author: 'Marko Novak',
      position: 'Lastnik hiše'
    }
  },
  {
    id: 2,
    title: 'LED razsvetljava poslovnih prostorov',
    category: 'svetila',
    description: 'Energetsko učinkovita LED razsvetljava za pisarne s pametnim nadzorom.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
    details: 'Maribor, 2024',
    fullDescription: 'Modernizacija razsvetljave v poslovni stavbi s 500m² pisarniških prostorov. Projekt je zajemal zamenjavo celotne razsvetljave z energetsko učinkovitimi LED sistemi in implementacijo pametnega upravljanja.',
    client: 'IT Solutions d.o.o.',
    location: 'Maribor, Tabor',
    year: '2024',
    duration: '7 dni',
    budget: '8.500€',
    technologies: ['Philips LED svetila', 'DALI svetlobni nadzor', 'Senzorji gibanja', 'Svetlobni senzorji', 'Centralno upravljanje'],
    challenges: [
      'Minimal disruption to daily operations',
      'Complex ceiling structure with existing installations',
      'Energy efficiency requirements',
      'Integration with existing building management system'
    ],
    solutions: [
      'Izvedba del izven delovnega časa',
      'Natančno načrtovanje tras za minimalne posege',
      'Izbira visokokakovostnih LED sistemov z dolgim življenjskim časom',
      'Programiranje sistema za optimalno porabo energije'
    ],
    results: [
      '60% zmanjšanje porabe električne energije za razsvetljavo',
      'Avtomatsko prilagajanje svetlobe dnevni svetlobi',
      'Povečana produktivnost zaposlenih',
      'Zmanjšanje stroškov vzdrževanja za 80%',
      'ROI dosežen v 2,5 letih'
    ],
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&h=400&fit=crop'
    ],
    testimonial: {
      text: 'Rezultat je presegel naša pričakovanja. Novi LED sistem je dramatično zmanjšal naše stroške električne energije, hkrati pa izboljšal delovno okolje.',
      author: 'Maja Kos',
      position: 'Direktorica IT Solutions'
    }
  },
  {
    id: 3,
    title: 'Servis in modernizacija stare instalacije',
    category: 'servis',
    description: 'Posodobitev 30-letne elektroinštalacije z novimi varnostnimi elementi.',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop',
    details: 'Kranj, 2024',
    fullDescription: 'Kompleksna modernizacija 30 let stare elektroinštalacije v stanovanjski hiši. Projekt je vključeval popolno revizijo obstoječe instalacije, zamenjavo zastarelih komponent in uvedbo sodobnih varnostnih standardov.',
    client: 'Družina Koprivnik',
    location: 'Kranj, Stražišče',
    year: '2024',
    duration: '10 dni',
    budget: '12.000€',
    technologies: ['ABB razdelilne omarice', 'Hager avtomati', 'Schneider FI stikala', 'Nove instalacijske poti', 'Ozemljitev TN-S'],
    challenges: [
      'Zastarela instalacija brez dokumentacije',
      'Neustrezna ozemljitev',
      'Premajhne preseke vodnikov',
      'Ohranjanje funkcionalnosti med posodobitvijo'
    ],
    solutions: [
      'Izdelava nove projektne dokumentacije',
      'Fazna zamenjava po posameznih krogovanih',
      'Nova ozemljitvena infrastruktura',
      'Uporaba sodobnih materialov z dolgim življenjskim časom'
    ],
    results: [
      '100% skladnost s trenutnimi standardi',
      'Povečana varnost za 10-krat',
      'Pripravljena infrastruktura za prihodnje nadgradnje',
      'Vsa potrebna dokumentacija in certifikati',
      '10-letna garancija na vso instalacijo'
    ],
    images: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1581092918484-8313d0c5e87e?w=600&h=400&fit=crop'
    ]
  },
  {
    id: 4,
    title: 'Pametni dom z avtomatizacijo',
    category: 'pametni-dom',
    description: 'Celostna rešitev pametnega doma z Fibaro sistemi in glasovnim nadzorom.',
    image: 'https://images.unsplash.com/photo-1558002038-bb4237b99844?w=600&h=400&fit=crop',
    details: 'Celje, 2024',
    fullDescription: 'Implementacija naprednega pametnega domskega sistema z Z-Wave tehnologijo. Projekt je zajemal avtomatizacijo razsvetljave, ogrevanja, varnosti in multimedije z inteligentnimi scenariji.',
    client: 'Ing. Aleš Tomšič',
    location: 'Celje, Center',
    year: '2024',
    duration: '12 dni',
    budget: '18.000€',
    technologies: ['Fibaro Home Center', 'Z-Wave naprave', 'Amazon Alexa', 'IP kamere', 'Pametni termostati', 'Motorji za senčila'],
    challenges: [
      'Integracija različnih protokolov (Z-Wave, WiFi, IP)',
      'Zahtevni scenariji avtomatizacije',
      'Varnost in zasebnost podatkov',
      'Uporabniška izkušnja za vso družino'
    ],
    solutions: [
      'Centralno upravljanje preko Fibaro platforme',
      'Hierarhična struktura avtomatizacij',
      'Lokalni strežnik za maksimalno zasebnost',
      'Intuitivni uporabniški vmesniki za vse starosti'
    ],
    results: [
      'Popolnoma avtomatizirani dom z več kot 50 scenariji',
      '30% prihranek pri energijskih stroških',
      'Glasovno upravljanje v slovenščini',
      'Daljinsko upravljanje preko mobilne aplikacije',
      'Najvišja raven varnosti z lokalnim upravljanjem'
    ],
    images: [
      'https://images.unsplash.com/photo-1558002038-bb4237b99844?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600&h=400&fit=crop'
    ],
    testimonial: {
      text: 'Naš dom je postal pravi pametni dom iz prihodnosti. System dela brezhibno, naše življenje pa se je močno poenostavilo.',
      author: 'Aleš Tomšič',
      position: 'Lastnik hiše'
    }
  },
  {
    id: 5,
    title: 'Dodatne vtičnice in preklopniki',
    category: 'vtičnice',
    description: 'Dodajanje USB vtičnic in pametnih preklopnikov v moderni stanovanje.',
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop',
    details: 'Ljubljana, 2024',
    fullDescription: 'Modernizacija stanovanja z dodatnimi vtičnicami in pametnimi preklopniki. Projekt je vključeval strategično nameščanje novih točk za optimalno uporabo sodobnih naprav.',
    client: 'Ana Horvat',
    location: 'Ljubljana, Šiška',
    year: '2024',
    duration: '3 dni',
    budget: '2.800€',
    technologies: ['Jung vtičnice z USB', 'Gira pametni preklopniki', 'Legrand podometne doze', 'NYM-J kabli'],
    challenges: [
      'Dodajanje vtičnic brez rušenja sten',
      'Integracija s obstoječo instalacijo',
      'Estetska integracija z interior dizajnom',
      'Minimalno motenje stanovanjskega okolja'
    ],
    solutions: [
      'Uporaba obstoječih instalacijskih poti kjer možno',
      'Precizno načrtovanje novih tras',
      'Izbira materialov, ki se ujemajo z dizajnom',
      'Delo v kratkem časovnem oknu'
    ],
    results: [
      '15 novih električnih točk',
      '8 USB vtičnic za sodobne naprave',
      'Popolna estetska integracija',
      'Povečana funkcionalnost stanovanja',
      '100% usklajenost z obstoječim dizajnom'
    ],
    images: [
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=400&fit=crop'
    ]
  },
  {
    id: 6,
    title: 'Nujno odpravljanje napake',
    category: 'odpravljanje-napak',
    description: 'Hitra odprava kratkega stika in zamenjava varnostnih elementov.',
    image: 'https://images.unsplash.com/photo-1621905252472-e8ace746c0f6?w=600&h=400&fit=crop',
    details: 'Novo mesto, 2024',
    fullDescription: 'Nujen poseg za odpravo kratkega stika v stanovanjski hiši. Klic smo prejeli ob 22:00 uri in se odzivali v roku 45 minut. Diagnoza je pokazala okvaro glavnega razdelilnika.',
    client: 'Marjan Počkar',
    location: 'Novo mesto',
    year: '2024',
    duration: '3 ure',
    budget: '450€',
    technologies: ['Fluke multimeter', 'Termovizijska kamera', 'ABB avtomati', 'Hager glavno stikalo'],
    challenges: [
      'Nočni klic in nujna intervencija',
      'Popoln izpad električne energije',
      'Okvara glavnega razdelilnika',
      'Potreba po takojšnji rešitvi'
    ],
    solutions: [
      'Takojšnja mobilizacija nujne ekipe',
      'Termovizijska diagnoza okvare',
      'Začasna rešitev za osnovne potrebe',
      'Zamenjava okvarjenih komponent'
    ],
    results: [
      'Obnova električne energije v 45 minutah',
      'Trajna rešitev problema',
      'Preprečena večja škoda',
      'Zadovoljstvo stranke kljub nočnemu času',
      'Brezplačen nadzor naslednji dan'
    ],
    images: [
      'https://images.unsplash.com/photo-1621905252472-e8ace746c0f6?w=600&h=400&fit=crop'
    ],
    testimonial: {
      text: 'Kljub temu da je bilo to sredi noči, so prišli takoj in profesionalno rešili problem. Hvala za vso pomoč!',
      author: 'Marjan Počkar',
      position: 'Lastnik hiše'
    }
  },
  {
    id: 7,
    title: 'Zunanja razsvetljava vrta',
    category: 'svetila',
    description: 'Ambientna LED razsvetljava za vrt z avtomatskim nadzorom.',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop',
    details: 'Bled, 2024',
    fullDescription: 'Oblikovanje in implementacija ambientne LED razsvetljave vrta z avtomatskim upravljanjem. Projekt je vključeval osvetlitev vrtnih poti, rastlinja in arhitekturnih elementov.',
    client: 'Villa Bled',
    location: 'Bled, Grad',
    year: '2024',
    duration: '5 dni',
    budget: '6.200€',
    technologies: ['Philips LED zunanja svetila', 'Osram Driver sistemi', 'Senzorji mraka', 'Timer upravljanje', 'IP65 zaščita'],
    challenges: [
      'Kompleksna topografija vrta',
      'Zaščita pred vremenskimi vplivi',
      'Estetska integracija v naravno okolje',
      'Energijska učinkovitost'
    ],
    solutions: [
      'Skrbno načrtovanje razporeditve svetil',
      'Uporaba visokokakovostnih IP65 komponent',
      'Izbira toplih LED tonov za ambient',
      'Programirljivi sistem z več scenariji'
    ],
    results: [
      'Čudovita nočna osvetlitev vrta',
      '70% manjša poraba kot halogenske žarnice',
      'Avtomatsko prižiganje ob mraku',
      'Različni scenariji za posebne priložnosti',
      'Popolna odpornost na vremenske vplive'
    ],
    images: [
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop'
    ]
  },
  {
    id: 8,
    title: 'Elektroinštalacija v kuhinji',
    category: 'nove-instalacije',
    description: 'Specializirana instalacija za kuhinjo z močnostnimi priključki.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop',
    details: 'Koper, 2024',
    fullDescription: 'Specializirana elektroinštalacija za moderno kuhinjo z visokoprozvodnimi aparati. Projekt je zajemal načrtovanje in izvedbo vseh električnih priključkov za profesionalno kulinarično okolje.',
    client: 'Restavracija Mediteran',
    location: 'Koper, Pristanišče',
    year: '2024',
    duration: '8 dni',
    budget: '9.500€',
    technologies: ['32A priključki', 'Indukcijske plošče', 'Profesionalni hladilniki', 'Ventilacijski sistemi', 'Varnostna razsvetljava'],
    challenges: [
      'Visoke električne obremenitve',
      'Strogi higienski standardi',
      'Ograničen prostor za instalacije',
      'Potreba po redundanci za kritične aparate'
    ],
    solutions: [
      'Dimenzioniranje za maksimalne obremenitve',
      'Uporaba živilsko varnih materialov',
      'Optimizacija tras v omejenih prostorih',
      'Ločeni krogovi za kritične aparate'
    ],
    results: [
      'Zanesljivo napajanje za vse kuhinjske aparate',
      '100% skladnost z HACCP standardi',
      'Ločeni krogovi za maksimalno varnost',
      'Možnost razširitve v prihodnje',
      'Certificirana instalacija za komercialno uporabo'
    ],
    images: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1556909195-f26f4ded0a87?w=600&h=400&fit=crop'
    ]
  }
];

const initialFaqs: FAQ[] = [
  {
    question: 'Kako hitro se odzovete na klic?',
    answer: 'Na nujne klice se odzovemo v 2-4 urah, na redne klice pa v 24 urah. Za kritične situacije smo na voljo 24/7.'
  },
  {
    question: 'Ali izdajate garancijo na opravljeno delo?',
    answer: 'Da, na vse opravljeno delo dajemo 2-letno garancijo. Za vgrajene materiale velja garancija proizvajalca.'
  },
  {
    question: 'Kakšne so vaše cene?',
    answer: 'Cene so odvisne od obsega dela. Osnovno uro dela zaračunavamo 35€. Za večje projekte pripravimo individualno ponudbo.'
  },
  {
    question: 'Ali potrebujem dovoljenje za elektroinštalacije?',
    answer: 'Za večje posege je potrebno dovoljenje. Mi vam pomagamo pri vseh administrativnih postopkih in zagotovimo potrebno dokumentacijo.'
  },
  {
    question: 'Ali delate tudi ob vikendih?',
    answer: 'Za nujne primere smo na voljo tudi ob vikendih. Redne storitve običajno opravljamo med tednom.'
  },
  {
    question: 'Kako dolgotrajni so tipični posegi?',
    answer: 'Manjši posegi (montaža vtičnice, svetila) trajajo 1-2 uri. Večji projekti se ocenijo individualno in lahko trajajo od enega dne do več tednov.'
  }
];

export default function App() {
  // State for content management
  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem('voltage-services');
    return saved ? JSON.parse(saved) : initialServices;
  });

  const [portfolioProjects, setPortfolioProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('voltage-projects');
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [faqs, setFaqs] = useState<FAQ[]>(() => {
    const saved = localStorage.getItem('voltage-faqs');
    return saved ? JSON.parse(saved) : initialFaqs;
  });

  // State for UI
  const [currentPage, setCurrentPage] = useState<'home' | 'admin' | string>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem('voltage-admin-auth') === 'true';
  });

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // Admin login state
  const [adminLoginData, setAdminLoginData] = useState({
    username: '',
    password: ''
  });

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('voltage-services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('voltage-projects', JSON.stringify(portfolioProjects));
  }, [portfolioProjects]);

  useEffect(() => {
    localStorage.setItem('voltage-faqs', JSON.stringify(faqs));
  }, [faqs]);

  // Handlers
  const handleServiceClick = (serviceId: string) => {
    setCurrentPage(serviceId);
    setIsMenuOpen(false);
  };

  const handleProjectClick = (projectId: number) => {
    setCurrentPage(`project-${projectId}`);
    setIsMenuOpen(false);
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Sporočilo je bilo poslano! Kontaktirali vas bomo v najkrajšem možnem času.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple authentication (in production, use proper authentication)
    if (adminLoginData.username === 'admin' && adminLoginData.password === 'voltage2024') {
      setIsAdminAuthenticated(true);
      localStorage.setItem('voltage-admin-auth', 'true');
      setAdminLoginData({ username: '', password: '' });
    } else {
      alert('Napačno uporabniško ime ali geslo');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('voltage-admin-auth');
    setCurrentPage('home');
  };

  const filteredProjects = selectedCategory === 'all' 
    ? portfolioProjects 
    : portfolioProjects.filter(project => project.category === selectedCategory);

  const getCategoryName = (categoryId: string) => {
    const service = services.find(s => s.id === categoryId);
    return service ? service.title : 'Vsa dela';
  };

  // Admin Login Component
  const AdminLogin = () => (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {/* <img src={logo} alt="Voltage Elektroinštalacije" className="h-16 w-auto" /> */}
          </div>
          <CardTitle className="flex items-center justify-center gap-2">
            <Lock className="h-5 w-5" />
            Admin Prijava
          </CardTitle>
          <CardDescription>
            Prijavite se za dostop do admin panela
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <Label htmlFor="username">Uporabniško ime</Label>
              <Input
                id="username"
                name="username"
                value={adminLoginData.username}
                onChange={(e) => setAdminLoginData({...adminLoginData, username: e.target.value})}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password">Geslo</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={adminLoginData.password}
                onChange={(e) => setAdminLoginData({...adminLoginData, password: e.target.value})}
                required
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full">
              Prijavite se
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Button variant="ghost" onClick={() => setCurrentPage('home')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Nazaj na domov
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Admin Panel Component
  const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('services');
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
    const [editingFaqIndex, setEditingFaqIndex] = useState<number | null>(null);

    // Service form state
    const [serviceForm, setServiceForm] = useState<Service>({
      id: '',
      title: '',
      description: '',
      details: '',
      icon: '',
      price: '',
      warranty: '',
      duration: '',
      materials: [],
      brands: [],
      process: [],
      included: []
    });

    // Project form state - updated to include new fields
    const [projectForm, setProjectForm] = useState<Project>({
      id: 0,
      title: '',
      category: '',
      description: '',
      image: '',
      details: '',
      fullDescription: '',
      client: '',
      location: '',
      year: '',
      duration: '',
      budget: '',
      technologies: [],
      challenges: [],
      solutions: [],
      results: [],
      images: [],
      testimonial: {
        text: '',
        author: '',
        position: ''
      }
    });

    // FAQ form state
    const [faqForm, setFaqForm] = useState<FAQ>({
      question: '',
      answer: ''
    });

    const resetServiceForm = () => {
      setServiceForm({
        id: '',
        title: '',
        description: '',
        details: '',
        icon: '',
        price: '',
        warranty: '',
        duration: '',
        materials: [],
        brands: [],
        process: [],
        included: []
      });
      setEditingService(null);
    };

    const resetProjectForm = () => {
      setProjectForm({
        id: 0,
        title: '',
        category: '',
        description: '',
        image: '',
        details: '',
        fullDescription: '',
        client: '',
        location: '',
        year: '',
        duration: '',
        budget: '',
        technologies: [],
        challenges: [],
        solutions: [],
        results: [],
        images: [],
        testimonial: {
          text: '',
          author: '',
          position: ''
        }
      });
      setEditingProject(null);
    };

    const resetFaqForm = () => {
      setFaqForm({
        question: '',
        answer: ''
      });
      setEditingFaq(null);
      setEditingFaqIndex(null);
    };

    const handleServiceSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (editingService) {
        setServices(services.map(s => s.id === editingService.id ? serviceForm : s));
      } else {
        const newId = serviceForm.title.toLowerCase().replace(/\s+/g, '-');
        setServices([...services, { ...serviceForm, id: newId }]);
      }
      resetServiceForm();
    };

    const handleProjectSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (editingProject) {
        setPortfolioProjects(portfolioProjects.map(p => p.id === editingProject.id ? projectForm : p));
      } else {
        const newId = Math.max(...portfolioProjects.map(p => p.id), 0) + 1;
        setPortfolioProjects([...portfolioProjects, { ...projectForm, id: newId }]);
      }
      resetProjectForm();
    };

    const handleFaqSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (editingFaq && editingFaqIndex !== null) {
        const newFaqs = [...faqs];
        newFaqs[editingFaqIndex] = faqForm;
        setFaqs(newFaqs);
      } else {
        setFaqs([...faqs, faqForm]);
      }
      resetFaqForm();
    };

    const handleEditService = (service: Service) => {
      setServiceForm(service);
      setEditingService(service);
    };

    const handleDeleteService = (serviceId: string) => {
      if (confirm('Ali ste prepričani, da želite izbrisati to storitev?')) {
        setServices(services.filter(s => s.id !== serviceId));
      }
    };

    const handleEditProject = (project: Project) => {
      setProjectForm(project);
      setEditingProject(project);
    };

    const handleDeleteProject = (projectId: number) => {
      if (confirm('Ali ste prepričani, da želite izbrisati ta projekt?')) {
        setPortfolioProjects(portfolioProjects.filter(p => p.id !== projectId));
      }
    };

    const handleEditFaq = (faq: FAQ, index: number) => {
      setFaqForm(faq);
      setEditingFaq(faq);
      setEditingFaqIndex(index);
    };

    const handleDeleteFaq = (index: number) => {
      if (confirm('Ali ste prepričani, da želite izbrisati to vprašanje?')) {
        setFaqs(faqs.filter((_, i) => i !== index));
      }
    };

    return (
      <div className="min-h-screen bg-background">
        {/* Admin Header */}
        <header className="border-b border-border bg-white">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* <img src={logo} alt="Voltage Elektroinštalacije" className="h-12 w-auto" /> */}
              <div>
                <h1 className="text-lg">Admin Panel</h1>
                <p className="text-sm text-muted-foreground">Upravljanje vsebin</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => setCurrentPage('home')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Nazaj na domov
              </Button>
              <Button variant="destructive" onClick={handleAdminLogout}>
                Odjava
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="services">Storitve</TabsTrigger>
              <TabsTrigger value="projects">Projekti</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>

            {/* Services Tab */}
            <TabsContent value="services" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2>Upravljanje storitev</h2>
                <Button onClick={resetServiceForm}>
                  <Plus className="h-4 w-4 mr-2" />
                  Dodaj storitev
                </Button>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Service Form */}
                <Card>
                  <CardHeader>
                    <CardTitle>{editingService ? 'Uredi storitev' : 'Dodaj novo storitev'}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleServiceSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="service-title">Naslov</Label>
                        <Input
                          id="service-title"
                          value={serviceForm.title}
                          onChange={(e) => setServiceForm({...serviceForm, title: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="service-description">Kratek opis</Label>
                        <Input
                          id="service-description"
                          value={serviceForm.description}
                          onChange={(e) => setServiceForm({...serviceForm, description: e.target.value})}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="service-details">Podroben opis</Label>
                        <Textarea
                          id="service-details"
                          value={serviceForm.details}
                          onChange={(e) => setServiceForm({...serviceForm, details: e.target.value})}
                          required
                          rows={3}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="service-icon">Ikona (emoji)</Label>
                          <Input
                            id="service-icon"
                            value={serviceForm.icon}
                            onChange={(e) => setServiceForm({...serviceForm, icon: e.target.value})}
                            placeholder="🔧"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="service-price">Cena</Label>
                          <Input
                            id="service-price"
                            value={serviceForm.price}
                            onChange={(e) => setServiceForm({...serviceForm, price: e.target.value})}
                            placeholder="35€/ura"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="service-warranty">Garancija</Label>
                          <Input
                            id="service-warranty"
                            value={serviceForm.warranty}
                            onChange={(e) => setServiceForm({...serviceForm, warranty: e.target.value})}
                            placeholder="2 leti garancije"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="service-duration">Trajanje</Label>
                          <Input
                            id="service-duration"
                            value={serviceForm.duration}
                            onChange={(e) => setServiceForm({...serviceForm, duration: e.target.value})}
                            placeholder="1-3 ure"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="service-materials">Materiali (en na vrstico)</Label>
                        <Textarea
                          id="service-materials"
                          value={serviceForm.materials.join('\n')}
                          onChange={(e) => setServiceForm({...serviceForm, materials: e.target.value.split('\n').filter(m => m.trim())})}
                          rows={3}
                          placeholder="Kakovostni električni kabli (Nexans, Prysmian)"
                        />
                      </div>

                      <div>
                        <Label htmlFor="service-brands">Blagovne znamke (ločeno z vejico)</Label>
                        <Input
                          id="service-brands"
                          value={serviceForm.brands.join(', ')}
                          onChange={(e) => setServiceForm({...serviceForm, brands: e.target.value.split(',').map(b => b.trim()).filter(b => b)})}
                          placeholder="ABB, Schneider Electric, Legrand"
                        />
                      </div>

                      <div>
                        <Label htmlFor="service-process">Potek storitve (en korak na vrstico)</Label>
                        <Textarea
                          id="service-process"
                          value={serviceForm.process.join('\n')}
                          onChange={(e) => setServiceForm({...serviceForm, process: e.target.value.split('\n').filter(p => p.trim())})}
                          rows={3}
                          placeholder="Pregled obstoječe elektroinštalacije"
                        />
                      </div>

                      <div>
                        <Label htmlFor="service-included">Kaj je vključeno (en element na vrstico)</Label>
                        <Textarea
                          id="service-included"
                          value={serviceForm.included.join('\n')}
                          onChange={(e) => setServiceForm({...serviceForm, included: e.target.value.split('\n').filter(i => i.trim())})}
                          rows={3}
                          placeholder="Brezplačen pregled in ocena"
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button type="submit">
                          <Save className="h-4 w-4 mr-2" />
                          {editingService ? 'Posodobi' : 'Dodaj'}
                        </Button>
                        {editingService && (
                          <Button type="button" variant="outline" onClick={resetServiceForm}>
                            Prekliči
                          </Button>
                        )}
                      </div>
                    </form>
                  </CardContent>
                </Card>

                {/* Services List */}
                <Card>
                  <CardHeader>
                    <CardTitle>Obstoječe storitve</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {services.map((service) => (
                      <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4>{service.icon} {service.title}</h4>
                          <p className="text-sm text-muted-foreground">{service.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleEditService(service)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDeleteService(service.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Projects Tab - Enhanced form */}
            <TabsContent value="projects" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2>Upravljanje projektov</h2>
                <Button onClick={resetProjectForm}>
                  <Plus className="h-4 w-4 mr-2" />
                  Dodaj projekt
                </Button>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Enhanced Project Form */}
                <Card>
                  <CardHeader>
                    <CardTitle>{editingProject ? 'Uredi projekt' : 'Dodaj nov projekt'}</CardTitle>
                  </CardHeader>
                  <CardContent className="max-h-96 overflow-y-auto">
                    <form onSubmit={handleProjectSubmit} className="space-y-4">
                      {/* Basic Info */}
                      <div>
                        <Label htmlFor="project-title">Naslov</Label>
                        <Input
                          id="project-title"
                          value={projectForm.title}
                          onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="project-category">Kategorija</Label>
                          <Input
                            id="project-category"
                            value={projectForm.category}
                            onChange={(e) => setProjectForm({...projectForm, category: e.target.value})}
                            placeholder="servis, svetila..."
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="project-client">Stranka</Label>
                          <Input
                            id="project-client"
                            value={projectForm.client}
                            onChange={(e) => setProjectForm({...projectForm, client: e.target.value})}
                            placeholder="Ime stranke"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="project-description">Kratek opis</Label>
                        <Textarea
                          id="project-description"
                          value={projectForm.description}
                          onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                          required
                          rows={2}
                        />
                      </div>

                      <div>
                        <Label htmlFor="project-full-description">Podroben opis</Label>
                        <Textarea
                          id="project-full-description"
                          value={projectForm.fullDescription}
                          onChange={(e) => setProjectForm({...projectForm, fullDescription: e.target.value})}
                          rows={3}
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="project-location">Lokacija</Label>
                          <Input
                            id="project-location"
                            value={projectForm.location}
                            onChange={(e) => setProjectForm({...projectForm, location: e.target.value})}
                            placeholder="Ljubljana"
                          />
                        </div>
                        <div>
                          <Label htmlFor="project-year">Leto</Label>
                          <Input
                            id="project-year"
                            value={projectForm.year}
                            onChange={(e) => setProjectForm({...projectForm, year: e.target.value})}
                            placeholder="2024"
                          />
                        </div>
                        <div>
                          <Label htmlFor="project-duration">Trajanje</Label>
                          <Input
                            id="project-duration"
                            value={projectForm.duration}
                            onChange={(e) => setProjectForm({...projectForm, duration: e.target.value})}
                            placeholder="7 dni"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="project-budget">Proračun</Label>
                        <Input
                          id="project-budget"
                          value={projectForm.budget}
                          onChange={(e) => setProjectForm({...projectForm, budget: e.target.value})}
                          placeholder="8.500€"
                        />
                      </div>

                      <div>
                        <Label htmlFor="project-image">URL glavne slike</Label>
                        <Input
                          id="project-image"
                          value={projectForm.image}
                          onChange={(e) => setProjectForm({...projectForm, image: e.target.value})}
                          placeholder="https://images.unsplash.com/..."
                          required
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button type="submit">
                          <Save className="h-4 w-4 mr-2" />
                          {editingProject ? 'Posodobi' : 'Dodaj'}
                        </Button>
                        {editingProject && (
                          <Button type="button" variant="outline" onClick={resetProjectForm}>
                            Prekliči
                          </Button>
                        )}
                      </div>
                    </form>
                  </CardContent>
                </Card>

                {/* Projects List */}
                <Card>
                  <CardHeader>
                    <CardTitle>Obstoječi projekti</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                    {portfolioProjects.map((project) => (
                      <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <img src={project.image} alt={project.title} className="w-16 h-16 object-cover rounded" />
                          <div>
                            <h4>{project.title}</h4>
                            <p className="text-sm text-muted-foreground">{project.category}</p>
                            <p className="text-sm text-muted-foreground">{project.location}, {project.year}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleEditProject(project)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDeleteProject(project.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* FAQ Tab */}
            <TabsContent value="faq" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2>Upravljanje FAQ</h2>
                <Button onClick={resetFaqForm}>
                  <Plus className="h-4 w-4 mr-2" />
                  Dodaj vprašanje
                </Button>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* FAQ Form */}
                <Card>
                  <CardHeader>
                    <CardTitle>{editingFaq ? 'Uredi vprašanje' : 'Dodaj novo vprašanje'}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleFaqSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="faq-question">Vprašanje</Label>
                        <Input
                          id="faq-question"
                          value={faqForm.question}
                          onChange={(e) => setFaqForm({...faqForm, question: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="faq-answer">Odgovor</Label>
                        <Textarea
                          id="faq-answer"
                          value={faqForm.answer}
                          onChange={(e) => setFaqForm({...faqForm, answer: e.target.value})}
                          required
                          rows={4}
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button type="submit">
                          <Save className="h-4 w-4 mr-2" />
                          {editingFaq ? 'Posodobi' : 'Dodaj'}
                        </Button>
                        {editingFaq && (
                          <Button type="button" variant="outline" onClick={resetFaqForm}>
                            Prekliči
                          </Button>
                        )}
                      </div>
                    </form>
                  </CardContent>
                </Card>

                {/* FAQ List */}
                <Card>
                  <CardHeader>
                    <CardTitle>Obstoječa vprašanja</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="flex-1">{faq.question}</h4>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleEditFaq(faq, index)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleDeleteFaq(index)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{faq.answer}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  };

  // Project Detail Page Component
  const ProjectDetailPage = ({ project }: { project: Project }) => {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-border z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* <img src={logo} alt="Voltage Elektroinštalacije" className="h-20 w-auto" /> */}
              
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => setCurrentPage('admin')} 
                className="text-sm"
              >
                Admin
              </Button>
              <Button onClick={handleBackToHome} variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Nazaj na domov
              </Button>
            </div>
          </div>
        </header>

        {/* Project Hero */}
        <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-yellow-50">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge variant="secondary" className="bg-yellow-500 text-black mb-4">
                    {getCategoryName(project.category)}
                  </Badge>
                  <h1 className="mb-6">{project.title}</h1>
                  <p className="text-xl text-muted-foreground mb-8">
                    {project.fullDescription || project.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button onClick={() => scrollToSection('kontakt')} className="bg-yellow-500 hover:bg-yellow-600 text-black">
                      <Phone className="mr-2 h-4 w-4" />
                      Kontaktirajte nas
                    </Button>
                    <Button variant="outline">
                      <Mail className="mr-2 h-4 w-4" />
                      Podoben projekt
                    </Button>
                  </div>
                </div>
                <div className="relative">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-80 object-cover rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Project Overview */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-4 gap-6 mb-16">
              <Card className="text-center">
                <CardContent className="p-6">
                  <User className="h-8 w-8 mx-auto mb-4 text-yellow-500" />
                  <h3 className="mb-2">Stranka</h3>
                  <p className="text-lg">{project.client}</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-6">
                  <MapPin className="h-8 w-8 mx-auto mb-4 text-blue-500" />
                  <h3 className="mb-2">Lokacija</h3>
                  <p className="text-lg">{project.location}</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-6">
                  <Calendar className="h-8 w-8 mx-auto mb-4 text-green-500" />
                  <h3 className="mb-2">Trajanje</h3>
                  <p className="text-lg">{project.duration}</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-6">
                  <Euro className="h-8 w-8 mx-auto mb-4 text-purple-500" />
                  <h3 className="mb-2">Proračun</h3>
                  <p className="text-lg">{project.budget}</p>
                </CardContent>
              </Card>
            </div>

            {/* Project Gallery */}
            {project.images && project.images.length > 1 && (
              <div className="mb-16">
                <h2 className="mb-8 text-center">Galerija projekta</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {project.images.map((image, index) => (
                    <div key={index} className="relative overflow-hidden rounded-lg">
                      <ImageWithFallback
                        src={image}
                        alt={`${project.title} - slika ${index + 1}`}
                        className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="mb-16">
                <h2 className="mb-6">Uporabljene tehnologije</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {project.technologies.map((tech, index) => (
                    <div key={index} className="flex items-center space-x-3 p-4 bg-muted rounded-lg">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></div>
                      <span>{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Challenges and Solutions */}
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              {project.challenges && project.challenges.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-orange-500" />
                      Izzivi projekta
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {project.challenges.map((challenge, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 mt-2"></div>
                          <span className="text-sm">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
              
              {project.solutions && project.solutions.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      Naše rešitve
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {project.solutions.map((solution, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-2"></div>
                          <span className="text-sm">{solution}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Results */}
            {project.results && project.results.length > 0 && (
              <div className="mb-16">
                <h2 className="mb-6 text-center">Doseženi rezultati</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {project.results.map((result, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg border border-green-200">
                      <Award className="h-6 w-6 text-green-500 flex-shrink-0" />
                      <span>{result}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Testimonial */}
            {project.testimonial && project.testimonial.text && (
              <div className="text-center p-8 bg-yellow-50 rounded-lg border border-yellow-200 mb-16">
                <blockquote className="text-xl italic mb-4">
                  "{project.testimonial.text}"
                </blockquote>
                <div>
                  <p>{project.testimonial.author}</p>
                  <p className="text-muted-foreground text-sm">{project.testimonial.position}</p>
                </div>
              </div>
            )}

            {/* CTA Section */}
            <div className="text-center p-8 bg-blue-50 rounded-lg border border-blue-200">
              <h2 className="mb-4">Potrebujete podoben projekt?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Imamo izkušnje z najrazličnejšimi projekti. Kontaktirajte nas za brezplačno svetovanje 
                in pripravo ponudbe za vaš projekt.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
                  <Phone className="mr-2 h-4 w-4" />
                  +386 40 123 456
                </Button>
                <Button variant="outline">
                  <Mail className="mr-2 h-4 w-4" />
                  Pošljite povpraševanje
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  };

  // Service Detail Page Component
  const ServiceDetailPage = ({ service }: { service: Service }) => {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-border z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* <img src={logo} alt="Voltage Elektroinštalacije" className="h-20 w-auto" /> */}
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => setCurrentPage('admin')} 
                className="text-sm"
              >
                Admin
              </Button>
              <Button onClick={handleBackToHome} variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Nazaj na domov
              </Button>
            </div>
          </div>
        </header>

        {/* Service Hero */}
        <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-yellow-50">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <div className="text-6xl mb-6">{service.icon}</div>
              <h1 className="mb-6">{service.title}</h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                {service.details}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => scrollToSection('kontakt')} className="bg-yellow-500 hover:bg-yellow-600 text-black">
                  <Phone className="mr-2 h-4 w-4" />
                  Naročite storitev
                </Button>
                <Button variant="outline">
                  Pridobite ponudbo
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Service Overview */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-4 gap-6 mb-16">
              <Card className="text-center">
                <CardContent className="p-6">
                  <Euro className="h-8 w-8 mx-auto mb-4 text-yellow-500" />
                  <h3 className="mb-2">Cena</h3>
                  <p className="text-2xl">{service.price}</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-6">
                  <Clock className="h-8 w-8 mx-auto mb-4 text-blue-500" />
                  <h3 className="mb-2">Trajanje</h3>
                  <p className="text-xl">{service.duration}</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-6">
                  <Shield className="h-8 w-8 mx-auto mb-4 text-green-500" />
                  <h3 className="mb-2">Garancija</h3>
                  <p className="text-xl">{service.warranty}</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-6">
                  <Settings className="h-8 w-8 mx-auto mb-4 text-purple-500" />
                  <h3 className="mb-2">Storitev</h3>
                  <Badge variant="secondary">Profesionalna</Badge>
                </CardContent>
              </Card>
            </div>

            {/* Service Process */}
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div>
                <h2 className="mb-6">Potek storitve</h2>
                <div className="space-y-4">
                  {service.process.map((step, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="bg-yellow-500 text-black rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                        {index + 1}
                      </div>
                      <p>{step}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="mb-6">Kaj je vključeno</h2>
                <div className="space-y-3">
                  {service.included.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Materials and Brands */}
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <Card>
                <CardHeader>
                  <CardTitle>Materiali in komponente</CardTitle>
                  <CardDescription>Uporabljamo le kakovostne materiale vodilnih proizvajalcev</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.materials.map((material, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></div>
                        <span className="text-sm">{material}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Partnerske blagovne znamke</CardTitle>
                  <CardDescription>Sodelujemo z najuglednejšimi proizvajalci električne opreme</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {service.brands.map((brand, index) => (
                      <div key={index} className="p-3 bg-muted rounded-lg text-center">
                        <span className="text-sm">{brand}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* CTA Section */}
            <div className="text-center p-8 bg-yellow-50 rounded-lg border border-yellow-200">
              <h2 className="mb-4">Potrebujete to storitev?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Pokličite nas za brezplačno svetovanje in oceno. Pripravimo vam individualno ponudbo, 
                prilagojeno vašim potrebam.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
                  <Phone className="mr-2 h-4 w-4" />
                  +386 40 123 456
                </Button>
                <Button variant="outline">
                  <Mail className="mr-2 h-4 w-4" />
                  Pošljite povpraševanje
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  };

  // Show admin login if not authenticated
  if (currentPage === 'admin' && !isAdminAuthenticated) {
    return <AdminLogin />;
  }

  // Show admin panel if authenticated
  if (currentPage === 'admin' && isAdminAuthenticated) {
    return <AdminPanel />;
  }

  // Show project detail page
  if (currentPage.startsWith('project-')) {
    const projectId = parseInt(currentPage.replace('project-', ''));
    const project = portfolioProjects.find(p => p.id === projectId);
    if (project) {
      return <ProjectDetailPage project={project} />;
    }
  }

  // Show service detail page
  if (currentPage !== 'home') {
    const service = services.find(s => s.id === currentPage);
    if (service) {
      return <ServiceDetailPage service={service} />;
    }
  }

  // Home page content
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* <img src={logo} alt="Voltage Elektroinštalacije" className="h-20 w-auto" /> */}
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button onClick={() => scrollToSection('domov')} className="text-foreground hover:text-primary transition-colors">
              Domov
            </button>
            <button onClick={() => scrollToSection('storitve')} className="text-foreground hover:text-primary transition-colors">
              Storitve
            </button>
            <button onClick={() => scrollToSection('portfolio')} className="text-foreground hover:text-primary transition-colors">
              Naša dela
            </button>
            <button onClick={() => scrollToSection('vprasanja')} className="text-foreground hover:text-primary transition-colors">
              Pogosta vprašanja
            </button>
            <button onClick={() => scrollToSection('kontakt')} className="text-foreground hover:text-primary transition-colors">
              Kontakt
            </button>
            <Button 
              variant="ghost" 
              onClick={() => setCurrentPage('admin')} 
              className="text-sm flex items-center gap-2"
            >
              <Lock className="h-4 w-4" />
              Admin
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-border">
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <button onClick={() => scrollToSection('domov')} className="text-left text-foreground hover:text-primary transition-colors">
                Domov
              </button>
              <button onClick={() => scrollToSection('storitve')} className="text-left text-foreground hover:text-primary transition-colors">
                Storitve
              </button>
              <button onClick={() => scrollToSection('portfolio')} className="text-left text-foreground hover:text-primary transition-colors">
                Naša dela
              </button>
              <button onClick={() => scrollToSection('vprasanja')} className="text-left text-foreground hover:text-primary transition-colors">
                Pogosta vprašanja
              </button>
              <button onClick={() => scrollToSection('kontakt')} className="text-left text-foreground hover:text-primary transition-colors">
                Kontakt
              </button>
              <Button 
                variant="ghost" 
                onClick={() => setCurrentPage('admin')} 
                className="justify-start text-sm flex items-center gap-2"
              >
                <Lock className="h-4 w-4" />
                Admin
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="domov" className="py-20 px-4 bg-gradient-to-br from-blue-50 to-yellow-50">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="mb-6 text-4xl md:text-6xl">
              Profesionalne elektroinštalacije za vaš dom in podjetje
            </h1>
            <p className="mb-8 text-xl text-muted-foreground max-w-2xl mx-auto">
              Voltage Elektroinštalacije s.p. zagotavlja kakovostne elektro storitve v Sloveniji. 
              Z več kot 10-letnimi izkušnjami smo vaš zanesljiv partner za vse električne potrebe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => scrollToSection('kontakt')} className="bg-yellow-500 hover:bg-yellow-600 text-black">
                <Zap className="mr-2 h-4 w-4" />
                Pokličite nas
              </Button>
              <Button variant="outline" onClick={() => scrollToSection('storitve')}>
                Naše storitve
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="storitve" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="mb-4">Naše storitve</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Nudimo celovite elektro storitve za vse vaše potrebe
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card key={service.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">{service.icon}</span>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </div>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4 text-sm text-muted-foreground">
                    <span>Od {service.price}</span>
                    <span>{service.duration}</span>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleServiceClick(service.id)}
                  >
                    Podrobnosti storitve
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="mb-4">Naša dela</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Oglejte si nekaj naših najnovejših projektov
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
              className={selectedCategory === 'all' ? 'bg-yellow-500 hover:bg-yellow-600 text-black' : ''}
            >
              Vsa dela
            </Button>
            {services.map((service) => (
              <Button
                key={service.id}
                variant={selectedCategory === service.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(service.id)}
                className={selectedCategory === service.id ? 'bg-yellow-500 hover:bg-yellow-600 text-black' : ''}
              >
                {service.title}
              </Button>
            ))}
          </div>

          {/* Portfolio Grid - Now clickable */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card 
                key={project.id} 
                className="group overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleProjectClick(project.id)}
              >
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-yellow-500 text-black">
                      {getCategoryName(project.category)}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Camera className="h-4 w-4" />
                      <span>{project.location}, {project.year}</span>
                    </div>
                    <Button size="sm" variant="ghost" className="text-yellow-600 hover:text-yellow-700">
                      Preberi več →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Ni projektov v tej kategoriji.</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="mb-4">Zakaj izbrati nas?</h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-black" />
              </div>
              <h3 className="mb-2">Certifikati</h3>
              <p className="text-sm text-muted-foreground">Licenciran elektrikar z vsemi potrebnimi certifikati</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-2">Hitrost</h3>
              <p className="text-sm text-muted-foreground">Odziv v 24 urah, za nujne primere 24/7</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-2">Garancija</h3>
              <p className="text-sm text-muted-foreground">2-letna garancija na vse opravljeno delo</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-2">Podpora</h3>
              <p className="text-sm text-muted-foreground">Stalna podpora tudi po opravljenem delu</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="vprasanja" className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="mb-4">Pogosto zastavljena vprašanja</h2>
            <p className="text-xl text-muted-foreground">
              Odgovori na najpogostejša vprašanja naših strank
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontakt" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="mb-4">Kontaktirajte nas</h2>
            <p className="text-xl text-muted-foreground">
              Pokličite nas ali pošljite sporočilo za brezplačno oceno
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h3 className="mb-6">Kontaktni podatki</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-yellow-500 mt-1" />
                  <div>
                    <p>Telefon</p>
                    <p className="text-lg">+386 40 123 456</p>
                    <p className="text-sm text-muted-foreground">24/7 za nujne primere</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-yellow-500 mt-1" />
                  <div>
                    <p>E-pošta</p>
                    <p className="text-lg">info@voltage-elektro.si</p>
                    <p className="text-sm text-muted-foreground">Odgovorimo v 24 urah</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-yellow-500 mt-1" />
                  <div>
                    <p>Območje delovanja</p>
                    <p className="text-lg">Ljubljana in okolica</p>
                    <p className="text-sm text-muted-foreground">V dogovoru tudi širše po Sloveniji</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
                <h4 className="mb-2">Nujni primeri</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Za nujne električne okvare smo na voljo 24/7. Pokličite nas takoj!
                </p>
                <Badge variant="secondary" className="bg-yellow-500 text-black">
                  24/7 RAZPOLOŽLJIVOST
                </Badge>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h3 className="mb-6">Pošljite sporočilo</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Ime in priimek</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">E-pošta</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Telefon</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label htmlFor="message">Sporočilo</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    required
                    className="mt-2"
                    rows={4}
                    placeholder="Opišite vašo potrebo ali problem..."
                  />
                </div>
                
                <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                  <Mail className="mr-2 h-4 w-4" />
                  Pošlji sporočilo
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                {/* <img src={logo} alt="Voltage Elektroinštalacije" className="h-16 w-auto brightness-0 invert" /> */}
              </div>
              <p className="text-sm opacity-80 mb-4">
                Profesionalne elektroinštalacije za vaš dom in podjetje. 
                Zanesljiv partner z več kot 10-letnimi izkušnjami.
              </p>
              <Badge variant="secondary" className="bg-yellow-500 text-black">
                Licenciran elektrikar
              </Badge>
            </div>
            
            <div>
              <h4 className="mb-4">Storitve</h4>
              <ul className="space-y-2 text-sm opacity-80">
                {services.slice(0, 6).map((service) => (
                  <li key={service.id}>{service.title}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="mb-4">Kontakt</h4>
              <div className="space-y-2 text-sm opacity-80">
                <p>📞 +386 40 123 456</p>
                <p>✉️ info@voltage-elektro.si</p>
                <p>📍 Ljubljana in okolica</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm opacity-60">
            <p>© 2024 Voltage Elektroinštalacije s.p. Vse pravice pridržane.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}