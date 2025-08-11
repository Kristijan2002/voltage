import React, { createContext, useContext, useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import Cookies from 'js-cookie';
import slTranslations from '../locales/sl.json';
import enTranslations from '../locales/en.json';

type Language = 'sl' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  sl: slTranslations,
  en: enTranslations
};

// Standalone translation function that works during SSR
export const translate = (key: string, language: Language = 'sl'): string => {
  const keys = key.split('.');
  let value: any = translations[language];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode, initialLang: Language }> = ({ children, initialLang }) => {
  const [language, setLanguage] = useState<Language>(initialLang);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Check if there's a language preference in cookies that differs from initialLang
    const cookieLang = Cookies.get('NEXT_LOCALE') as Language;
    if (cookieLang && cookieLang !== initialLang) {
      setLanguage(cookieLang);
    }
  }, [initialLang]);

  const handleSetLanguage = (newLang: Language) => {
    setLanguage(newLang);
    Cookies.set('NEXT_LOCALE', newLang, { expires: 365 });
  };

  const t = (key: string): string => {
    // During SSR, always use the initial language to avoid hydration mismatch
    const currentLang = isClient ? language : initialLang;
    return translate(key, currentLang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageSelector: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'sl' as Language, name: 'Slovenščina', flag: '🇸🇮' },
    { code: 'en' as Language, name: 'English', flag: '🇬🇧' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className={`gap-2 ${className}`}>
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLanguage?.flag} {currentLanguage?.name}</span>
          <span className="sm:hidden">{currentLanguage?.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={language === lang.code ? 'bg-accent' : ''}
          >
            <span className="mr-2">{lang.flag}</span>
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};