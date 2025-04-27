
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "./ui/card";
import { Briefcase } from "lucide-react";

interface ExperienceItem {
  company: string;
  position: string;
  period: string;
  description: string;
  technologies: string[];
}

interface ExperienceProps {
  title: string;
  experiences: ExperienceItem[];
}

const Experience = ({ title, experiences }: ExperienceProps) => {
  const { t } = useLanguage();

  return (
    <section id="experience" className="py-20 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
        >
          {t(title)}
        </motion.h2>
        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
          {experiences.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-card shadow group-odd:md:translate-x-5 group-even:md:-translate-x-5 z-10">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 hover:shadow-xl transition-shadow">
                <CardContent className="p-0 space-y-2">
                  <h3 className="font-bold text-lg text-foreground">{t(item.position)}</h3>
                  <div className="text-muted-foreground">
                    <span className="font-medium">{t(item.company)}</span> • <span>{t(item.period)}</span>
                  </div>
                  <p className="text-foreground/80">{t(item.description)}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {item.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full text-xs bg-primary/10 text-primary border border-primary/20"
                      >
                        {t(tech)}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
