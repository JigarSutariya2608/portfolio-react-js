
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "./ui/card";
import { School } from "lucide-react";

interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  description: string;
  gpa: string;
}

interface EducationProps {
  title: string;
  degreeLabel: string;
  gpaLabel: string;
  education: EducationItem[];
}

const Education = ({ title, degreeLabel, gpaLabel, education }: EducationProps) => {
  const { t } = useLanguage();

  return (
    <section id="education" className="py-20 px-4 bg-background">
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
        <div className="space-y-8">
          {education.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden border border-border">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                      <School className="h-5 w-5" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-bold text-lg text-foreground">{t(item.degree)}</h3>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 text-muted-foreground">
                        <span className="font-medium">{t(item.institution)}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>{t(item.period)}</span>
                      </div>
                      <p className="text-foreground/80">{t(item.description)}</p>
                      <div className="pt-2">
                        <span className="text-sm font-medium">
                          {t(gpaLabel)}: <span className="text-primary">{item.gpa}</span>
                        </span>
                      </div>
                    </div>
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

export default Education;
