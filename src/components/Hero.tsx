
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "./ui/button";
import { Download, Mail } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface HeroProps {
  greeting?: string;
  title: string;
  subtitle: string;
  description: string;
  resumeUrl?: string;
  email?: string;
  buttons?: {
    resume: string;
    contact: string;
  };
  languageSwitcher?: {
    code: string;
    label: string;
  }[];
}

const Hero = ({ languageSwitcher, greeting, title, subtitle, description, resumeUrl, email = "john@example.com", buttons }: HeroProps) => {
  const { t } = useLanguage();

  const handleDownloadCV = () => {
    if (resumeUrl) {
      window.open(resumeUrl, '_blank');
    }
  };

  const handleContactMe = () => {
    window.location.href = `mailto:${email}?subject=Getting%20in%20touch`;
  };

  return (
    <section className="min-h-screen flex flex-col px-4 py-20 bg-background relative overflow-hidden">
      {/* Settings bar */}
      <div className="fixed top-20 left-0 w-full z-30 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-2">
          <LanguageSwitcher languageSwitcher={languageSwitcher} />
          <ThemeToggle />
        </div>
      </div>
      
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto text-center z-10 flex-1 flex flex-col justify-center"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-lg md:text-xl text-primary mb-2"
        >
          {t(greeting)}
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
        >
          {t(title)}
        </motion.h1>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-2xl md:text-3xl text-foreground/80 mb-6"
        >
          {t(subtitle)}
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto"
        >
          {t(description)}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Button 
            size="lg" 
            className="gap-2 rounded-full" 
            onClick={handleDownloadCV}
            disabled={!resumeUrl}
          >
            <Download className="h-5 w-5" />
            {t(buttons?.resume)}
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="gap-2 rounded-full"
            onClick={handleContactMe}
          >
            <Mail className="h-5 w-5" />
            {t(buttons?.contact)}
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
