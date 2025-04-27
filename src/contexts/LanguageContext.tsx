import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "fr" | "es";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>("en");
  const [translations, setTranslations] = useState<Record<string, any>>({});
  const [englishTranslations, setEnglishTranslations] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadEnglishTranslations = async () => {
      try {
        const response = await fetch('/data/translations/en.json');
        if (!response.ok) throw new Error('Failed to load English translations');
        const data = await response.json();
        setEnglishTranslations(data);
      } catch (error) {
        console.error("Error loading English translations:", error);
      }
    };

    loadEnglishTranslations();
  }, []);

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/data/translations/${language}.json`);
        if (!response.ok) {
          throw new Error(`Failed to load translations for ${language}`);
        }
        const data = await response.json();
        setTranslations(data);
      } catch (error) {
        console.error("Error loading translations:", error);
        setTranslations(englishTranslations);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadTranslations();
    localStorage.setItem("language", language);
  }, [language, englishTranslations]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && ["en", "fr", "es"].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    } else {
      const browserLang = navigator.language.split('-')[0];
      if (["en", "fr", "es"].includes(browserLang)) {
        setLanguage(browserLang as Language);
      }
    }
  }, []);

  const t = (key: string): string => {
    const value = getTranslationValue(translations, key);
    if (!value && language !== 'en') {
      const englishValue = getTranslationValue(englishTranslations, key);
      if (englishValue) return englishValue;
    }
    return value || key;
  };

  const getTranslationValue = (translationObj: Record<string, any>, key: string): string | undefined => {
    const keys = key.split(".");
    let value = translationObj;
    
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        return undefined;
      }
    }
    
    return typeof value === "string" ? value : undefined;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
