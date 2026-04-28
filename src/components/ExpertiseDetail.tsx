import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import PageHeader from './PageHeader';
import ScrollReveal from './ScrollReveal';

interface ExpertiseDetailProps {
  title: string;
  description: string;
  imagePath: string;
  content: React.ReactNode;
}

export default function ExpertiseDetail({ title, description, imagePath, content }: ExpertiseDetailProps) {
  return (
    <div id="top" className="min-h-screen flex flex-col">
      <PageHeader
        title={title}
        description={description}
        eyebrow="Domaine d'expertise"
        backgroundImage={imagePath}
      />

      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 lg:gap-16 items-start">
          <ScrollReveal animation="slide-in-left">
            <div className="relative h-[320px] lg:h-[480px] overflow-hidden">
              <img
                src={imagePath}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal animation="fade-in" delay={150}>
            <div className="space-y-5 text-gray-600 font-light leading-relaxed">
              {content}
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Conversion strip */}
      <ScrollReveal animation="fade-in">
        <section className="bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-5">
                Premier contact
              </p>
              <h2 className="font-serif text-2xl md:text-3xl font-light text-gray-900 leading-snug mb-4">
                Votre situation mérite une analyse concrète.
              </h2>
              <p className="text-gray-500 font-light leading-relaxed mb-8">
                Le cabinet vous reçoit sur rendez-vous pour examiner votre dossier et définir la stratégie la plus adaptée. Le premier entretien est l'occasion d'un échange sans engagement.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm tracking-wider font-light text-white bg-gray-900 hover:bg-gray-700 transition-colors duration-200"
                >
                  Prendre rendez-vous
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </Link>
                <Link
                  to="/expertises"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm tracking-wider font-light text-gray-900 border border-gray-300 hover:border-gray-900 transition-colors duration-200"
                >
                  Toutes nos expertises
                </Link>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
