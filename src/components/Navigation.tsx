
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

interface NavigationItem {
  key: string;
  href: string;
}

const Navigation = () => {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [navigationData, setNavigationData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/portfolio.json');
        if (!response.ok) {
          throw new Error('Failed to load navigation data');
        }
        const jsonData = await response.json();
        setNavigationData(jsonData.navigation);
      } catch (error) {
        console.error('Error fetching navigation data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!navigationData) return null;

  const navigationItems: NavigationItem[] = [
    { key: navigationData.homeLink, href: "#" },
    { key: navigationData.aboutLink, href: "#about" },
    { key: navigationData.skillsLink, href: "#skills" },
    { key: navigationData.projectsLink, href: "#projects" },
    { key: navigationData.experienceLink, href: "#experience" },
    { key: navigationData.educationLink, href: "#education" },
    { key: navigationData.testimonialsLink, href: "#testimonials" },
    { key: navigationData.contactLink, href: "#contact" }
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-40 px-6 py-4 transition-all duration-300 ${
        scrolled ? "bg-background/80 shadow-md backdrop-blur-sm" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <motion.a
            href="#"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-bold text-foreground"
          >
            {t(navigationData.brandName)}<span className="text-primary">.</span>
          </motion.a>

          <nav className="hidden lg:flex items-center gap-1">
            {navigationItems.map((item, index) => (
              <motion.a
                key={item.key}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="px-4 py-2 text-foreground/80 hover:text-primary transition-colors rounded-md"
              >
                {t(item.key)}
              </motion.a>
            ))}
          </nav>

          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw] sm:w-[385px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navigationItems.map((item) => (
                  <a
                    key={item.key}
                    href={item.href}
                    className="px-4 py-3 hover:bg-accent rounded-md text-foreground hover:text-primary transition-colors"
                  >
                    {t(item.key)}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
};

export default Navigation;
