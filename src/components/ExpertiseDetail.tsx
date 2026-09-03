import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import PageHeader from './PageHeader';
import ResponsiveImage from './ResponsiveImage';
import ScrollReveal from './ScrollReveal';
import { getArticlesByDomaine } from '../lib/articles';

interface ExpertiseDetailProps {
  /** Expertise slug, e.g. "droit-commercial". Also matches the `domaine` of related articles. */
  slug: string;
  title: string;
  description: string;
  /** Base path of the optimized image set, e.g. "/images/expertises/droit-commercial". */
  image: string;
  content: React.ReactNode;
}

export default function ExpertiseDetail({ slug, title, description, image, content }: ExpertiseDetailProps) {
  const articles = getArticlesByDomaine(slug);
  return (
    <div id="top" className="min-h-screen flex flex-col">
      <PageHeader
        title={title}
        description={description}
        eyebrow="Domaine d'expertise"
        image={image}
      />

      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 lg:gap-16 items-start">
          <ScrollReveal animation="slide-in-left">
            <div className="relative h-[320px] lg:h-[480px] overflow-hidden">
              <ResponsiveImage
                src={image}
                alt={title}
                sizes="(max-width: 1024px) 100vw, 40vw"
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

      {/* Articles on this topic */}
      {articles.length > 0 && (
        <ScrollReveal animation="fade-in">
          <section aria-labelledby="articles-domaine" className="border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-5">
                Pour aller plus loin
              </p>
              <h2 id="articles-domaine" className="font-serif text-2xl md:text-3xl font-light text-gray-900 leading-snug mb-8">
                Nos articles sur le sujet
              </h2>
              <ul className="divide-y divide-gray-100 border-y border-gray-100 max-w-3xl">
                {articles.map(({ meta }) => (
                  <li key={meta.slug}>
                    <Link to={`/articles/${meta.slug}`} className="group block py-6">
                      <p className="font-serif text-lg md:text-xl text-gray-900 group-hover:text-primary-dark transition-colors duration-200 leading-snug">
                        {meta.title}
                      </p>
                      <p className="text-sm text-gray-500 font-light mt-2 max-w-2xl">{meta.description}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </ScrollReveal>
      )}

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
