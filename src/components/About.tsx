
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

interface QuickInfo {
  title: string;
  experience: {
    title: string;
    value: string;
  };
  location: {
    title: string;
    value: string;
  };
  languages: {
    title: string;
    values: string[];
  };
}

interface AboutProps {
  title: string;
  description: string;
  skills: string[];
  interests?: {
    title: string;
    description: string;
  };
  quickInfo?: QuickInfo;
}

const About = ({ title, description, skills, interests, quickInfo }: AboutProps) => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 px-4 bg-muted/30 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">{t(title)}</h2>
            <p className="text-lg text-foreground/80 mb-6">{t(description)}</p>
            {interests && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3 text-foreground">{t(interests.title)}</h3>
                <p className="text-foreground/80">{t(interests.description)}</p>
              </div>
            )}
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-6 text-foreground">Skills</h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="px-4 py-2 bg-background rounded-full shadow-sm text-foreground border border-border hover:border-primary/50 transition-all"
                >
                  {t(skill)}
                </motion.span>
              ))}
            </div>
            {quickInfo && (
              <div className="mt-8 bg-card border border-border rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-foreground">{t(quickInfo.title)}</h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-foreground/80">
                    <span className="font-medium mr-2">{t(quickInfo.experience.title)}:</span> {t(quickInfo.experience.value)}
                  </li>
                  <li className="flex items-center text-foreground/80">
                    <span className="font-medium mr-2">{t(quickInfo.location.title)}:</span> {t(quickInfo.location.value)}
                  </li>
                  <li className="flex items-center text-foreground/80">
                    <span className="font-medium mr-2">{t(quickInfo.languages.title)}:</span> {quickInfo.languages.values.join(", ")}
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
