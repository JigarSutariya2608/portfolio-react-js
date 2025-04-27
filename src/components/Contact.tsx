
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";
import emailjs from '@emailjs/browser';
import CONFIG from "@/config";

interface ContactProps {
  email: string;
  phone?: string;
  address?: string;
  linkedin: string;
  github: string;
  contactTitle?: string;
  nameLabel?: string;
  emailLabel?: string;
  messageLabel?: string;
  sendLabel?: string;
  followMeText?: string;
  locationLabel?: string;
  emailLabel2?: string;
  phoneLabel?: string;
}

const Contact = ({
  email,
  phone,
  address,
  linkedin,
  github,
  contactTitle = "Get In Touch",
  nameLabel = "Your Name",
  emailLabel = "Your Email",
  messageLabel = "Your Message",
  sendLabel = "Send Message",
  followMeText = "Follow me on",
  locationLabel = "Location",
  emailLabel2 = "Email",
  phoneLabel = "Phone"
}: ContactProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (formRef.current) {
      emailjs.sendForm(CONFIG.serviceId, CONFIG.templateId, formRef.current, CONFIG.publicKey)
        .then((result) => {
          console.log('SUCCESS!', result.text);
          toast({
            title: t("CONTACT.SUCCESS"),
            description: `Thank you, ${formData.name}! I'll get back to you soon.`,
            duration: 5000,
          });
          setFormData({ name: "", email: "", message: "" });
          setIsSubmitting(false);
        }, (error) => {
          console.log('FAILED...', error.text);
          setIsSubmitting(false);
        });
    }
  };

  return (
    <section id="contact" className="py-20 px-4 bg-muted/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto"
      >
        <h2 className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          {t(contactTitle)}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">{t(nameLabel)}</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">{t(emailLabel)}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="message">{t(messageLabel)}</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mt-1 resize-none"
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? t("CONTACT.SENDING") : t(sendLabel)}
              </Button>
            </form>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {t(contactTitle)}
              </h3>
              {email && (
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-primary/10 text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{emailLabel2}</h4>
                    <a
                      href={`mailto:${email}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {email}
                    </a>
                  </div>
                </div>
              )}
              {phone && (
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-primary/10 text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{t(phoneLabel)}</h4>
                    <a
                      href={`tel:${phone.replace(/\D/g, '')}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {phone}
                    </a>
                  </div>
                </div>
              )}
              {address && (
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-primary/10 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{t(locationLabel)}</h4>
                    <p className="text-muted-foreground">{t(address)}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-8">
              <h4 className="font-medium text-foreground mb-4">{t(followMeText)}</h4>
              <div className="flex gap-4">
                {github && (
                  <a
                    href={`https://${github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-background border border-border hover:bg-primary/10 hover:text-primary transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                )}
                {linkedin && (
                  <a
                    href={`https://${linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-background border border-border hover:bg-primary/10 hover:text-primary transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
