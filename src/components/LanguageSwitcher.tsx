
import { Globe } from "lucide-react";
import { Button } from "./ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "./ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function LanguageSwitcher({ languageSwitcher }: { languageSwitcher?: { code: string; label: string }[] }) {
  const { language, setLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  console.log("language: ", language);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="icon"
            className="rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-md"
          >
            <Globe className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="bg-popover/95 backdrop-blur-sm border border-border">
          {languageSwitcher.map((lang) => (
            <DropdownMenuItem 
              key={lang.code}
              className={`cursor-pointer ${language === lang.code ? 'bg-accent font-bold text-accent-foreground' : ''}`}
              onClick={() => setLanguage(lang.code as "en" | "fr" | "es")}
            >
              {lang.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  );
}
