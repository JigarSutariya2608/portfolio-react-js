
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "./ui/card";

interface Skill {
  name: string;
  level: number;
}

interface SkillsProps {
  title: string;
  categories: {
    frontend: string;
    backend: string;
    tools: string;
  };
  frontend: Skill[];
  backend: Skill[];
  tools: Skill[];
}

const Skills = ({ title, categories, frontend, backend, tools }: SkillsProps) => {
  const { t } = useLanguage();

  const renderSkillCategory = (skills: Skill[], category: string) => (
    <Card className="bg-card border border-border">
      <CardContent className="pt-6">
        <h3 className="text-xl font-semibold mb-4 text-foreground">{category}</h3>
        <div className="space-y-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-foreground">{t(skill.name)}</span>
                </div>
                <span className="text-sm text-muted-foreground">{skill.level}%</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <section id="skills" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
        >
          {title}
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {renderSkillCategory(frontend, categories.frontend)}
          {renderSkillCategory(backend, categories.backend)}
          {renderSkillCategory(tools, categories.tools)}
        </div>
      </div>
    </section>
  );
};

export default Skills;
