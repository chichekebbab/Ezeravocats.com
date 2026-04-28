import React, { useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';
import ScrollReveal from '../components/ScrollReveal';
import { Link, useLocation } from 'react-router-dom';
import justiceImage from '../assets/images/myriam.jpeg';
import SeoHead from '../components/SeoHead';

const expertises = [
  {
    slug: 'droit-commercial',
    title: 'Droit commercial',
    description:
      "Ruptures abusives de pourparlers, concurrence déloyale, rupture brutale de relations établies, recouvrement de créances.",
  },
  {
    slug: 'droit-societes',
    title: 'Droit des sociétés',
    description:
      "Conflits entre actionnaires, responsabilité des dirigeants, contentieux post-cession, garanties d'actif et de passif.",
  },
  {
    slug: 'droit-numerique',
    title: 'Droits et actifs numériques',
    description:
      "Litiges propres aux acteurs de l'économie numérique : prestataires, plateformes, données, contrats SaaS.",
  },
  {
    slug: 'droit-consommation',
    title: 'Droit de la consommation et de la distribution',
    description:
      "Pratiques commerciales, contentieux fournisseur-distributeur, litiges consommateurs en B2C.",
  },
  {
    slug: 'droit-construction',
    title: 'Droit de la construction et risques industriels',
    description:
      "Sécurisation et défense des projets des professionnels du secteur, contentieux après-vente et garantie.",
  },
  {
    slug: 'modes-alternatifs',
    title: 'Modes alternatifs de règlement des litiges',
    description:
      "Négociation, médiation, conciliation. Résolution amiable lorsque c'est plus efficace qu'un contentieux.",
  },
];

export default function Home() {
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
    <>
      <SeoHead
        title="Ezer Avocats"
        description="Cabinet d'avocats spécialisé en droit des affaires et contentieux commercial à Paris. Droit commercial, droit des sociétés, recouvrement de créances."
        canonical="/"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'LegalService',
          name: 'Ezer Avocats',
          url: 'https://www.ezeravocats.com',
          description:
            "Cabinet d'avocats spécialisé en droit des affaires et contentieux commercial à Paris.",
          address: {
            '@type': 'PostalAddress',
            streetAddress: '15 rue de Lübeck',
            addressLocality: 'Paris',
            postalCode: '75116',
            addressCountry: 'FR',
          },
          email: 'myriam.douillet@ezeravocats.com',
        }}
      />
      <div id="top">
        <Hero />

        {/* ── Domaines d'intervention — liste éditoriale numérotée ── */}
        <article className="py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal animation="fade-in">
              <div className="mb-16 md:mb-20 max-w-2xl">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-5">
                  Domaines d'intervention
                </p>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 leading-[1.15]">
                  Un cabinet dédié au contentieux des affaires.
                </h2>
              </div>
            </ScrollReveal>

            <ul className="border-t border-gray-200">
              {expertises.map((expertise, idx) => (
                <li key={expertise.slug} className="border-b border-gray-200">
                  <ScrollReveal animation="fade-in" delay={idx * 60}>
                    <Link
                      to={`/expertises/${expertise.slug}`}
                      className="group grid grid-cols-[64px_1fr] md:grid-cols-[120px_1fr_auto] items-baseline gap-x-4 md:gap-x-12 py-8 md:py-10 px-2 md:px-4 -mx-2 md:-mx-4 hover:bg-gray-50/70 transition-colors duration-200"
                    >
                      <span
                        aria-hidden="true"
                        className="font-serif text-3xl md:text-5xl font-extralight text-gray-300 tabular-nums leading-none pt-1"
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <div className="col-start-2 row-start-1 row-span-2 md:row-span-1">
                        <h3 className="font-serif text-xl md:text-2xl lg:text-[1.65rem] font-light text-gray-900 mb-2 md:mb-3 leading-snug group-hover:text-primary-dark transition-colors duration-200">
                          {expertise.title}
                        </h3>
                        <p className="text-sm md:text-base text-gray-500 font-light leading-relaxed max-w-2xl">
                          {expertise.description}
                        </p>
                      </div>
                      <span className="hidden md:inline-flex items-center text-sm text-gray-400 group-hover:text-gray-900 transition-colors duration-200 self-start pt-2">
                        <span className="mr-2 tracking-wide">Découvrir</span>
                        <ArrowUpRight
                          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden
                        />
                      </span>
                    </Link>
                  </ScrollReveal>
                </li>
              ))}
            </ul>
          </div>
        </article>

        <aside className="py-32 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <ScrollReveal animation="fade-in">
                <div>
                  <SectionTitle
                    subtitle="Notre cabinet"
                    title="Un accompagnement sur mesure"
                    alignment="left"
                  />
                  <p className="text-gray-600 mb-8 leading-relaxed font-light">
                    EZER AVOCATS, cabinet dédié au droit des affaires, accompagne les
                    entreprises en élaborant les stratégies judiciaires les plus adaptées à
                    leurs situations. Le cabinet intervient devant l'ensemble des
                    juridictions civiles et commerciales de France.
                  </p>
                  <Link
                    to="/cabinet#top"
                    className="text-sm tracking-wider text-gray-900 hover:text-gray-600 transition-colors duration-300"
                  >
                    DÉCOUVRIR NOTRE CABINET →
                  </Link>
                </div>
              </ScrollReveal>
              <ScrollReveal animation="slide-in-right">
                <div className="relative h-[600px] overflow-hidden">
                  <img
                    src={justiceImage}
                    alt="Salle de réunion"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
