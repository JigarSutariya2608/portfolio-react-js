import { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Navigation from '@/components/Navigation';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Testimonials from '@/components/Testimonials';
import { BackToTop } from '@/components/BackToTop';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const [data, setData] = useState<any>(null);
  const { toast } = useToast();
  const { t, isLoading } = useLanguage();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/portfolio.json');
        if (!response.ok) {
          throw new Error('Failed to load portfolio data');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
        toast({
          variant: "destructive",
          title: t("errors.dataLoad") || "Error loading data",
          description: t("errors.refreshPage") || "Unable to load portfolio data. Please refresh the page.",
        });
      }
    };

    fetchData();
  }, [toast, t]);

  if (!data || isLoading) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <div>
        <Hero
          title={data.hero.title}
          greeting={data.hero.greeting}
          subtitle={data.hero.profession}
          description={data.hero.description}
          resumeUrl={data.hero.resumeUrl}
          email={data.contact.email}
          buttons={data.hero.buttons}
          languageSwitcher={data.language_switcher}
        />
        <About
          title={data.about.title}
          description={data.about.description}
          skills={data.about.skills}
          interests={data.about.interests}
          quickInfo={data.about.quickInfo}
        />
        <Skills 
          title={t(data.skills.title)}
          categories={{
            frontend: t(data.skills.categories.frontend),
            backend: t(data.skills.categories.backend),
            tools: t(data.skills.categories.tools)
          }}
          frontend={data.skills.frontend}
          backend={data.skills.backend}
          tools={data.skills.tools}
        />
        <Projects 
          title={data.projects.title}
          liveDemo={data.projects.liveDemo}
          sourceCode={data.projects.sourceCode}
          projects={data.projects.items} 
        />
        <Experience 
          title={t(data.experience.title)}
          experiences={data.experience.items} 
        />
        <Education 
          title={t(data.education.title)}
          degreeLabel={t(data.education.degree)}
          gpaLabel={t(data.education.gpa)}
          education={data.education.items}
        />
        <Testimonials 
          title={t(data.testimonials.title)}
          testimonials={data.testimonials.items} 
        />
        <Contact
          nameLabel={t(data.contact.name)}
          emailLabel={t(data.contact.emailLabel)}
          messageLabel={t(data.contact.message)}
          sendLabel={t(data.contact.send)}
          followMeText={t(data.contact.followMe)}
          locationLabel={t(data.contact.location)}
          emailLabel2={t(data.contact.emailLabel)}
          phoneLabel={t(data.contact.phoneLabel)}
          email={data.contact.email}
          phone={data.contact.phone}
          address={data.contact.address}
          linkedin={data.contact.linkedin}
          github={data.contact.github}
        />
        <BackToTop />
      </div>
    </div>
  );
};

export default Index;
