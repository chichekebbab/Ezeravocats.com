import React, { useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import ContactForm from '../components/ContactForm';
import ScrollReveal from '../components/ScrollReveal';
import ZcalEmbed from '../components/ZcalEmbed';
import { useLocation } from 'react-router-dom';
import bureauImage from '../assets/images/bureau.jpg';

export default function Contact() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (location.hash) {
      const element = document.getElementById(location.hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);
  return (
    <div id="top">
      <PageHeader
        title="Contact"
        description="Premier entretien sans engagement pour analyser votre situation"
        eyebrow="Nous contacter"
        backgroundImage={bureauImage}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <ScrollReveal animation="fade-in">
            <div>
              <h2 className="text-3xl font-extralight tracking-wide mb-8 text-gray-900">Contactez-nous</h2>
              <ContactForm />
            </div>
          </ScrollReveal>
          <ScrollReveal animation="fade-in" delay={150}>
            <div className="w-full">
              <h2 className="text-3xl font-extralight tracking-wide mb-8 text-gray-900">Prenez rendez-vous</h2>
              <ZcalEmbed
                src="https://zcal.co/i/eaFLKrTt?embed=1&embedType=iframe"
                height={800}
                title="Prendre rendez-vous avec Maître Myriam Douillet Benaroch"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
