import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import ScrollReveal from '../components/ScrollReveal';
import expertiseImage from '../assets/images/expertise.jpg';

interface Expertise {
  slug: string;
  title: string;
  lead: string;
  cases: string[];
}

const expertises: Expertise[] = [
  {
    slug: 'droit-commercial',
    title: 'Droit commercial',
    lead:
      "Sécurisation des relations d'affaires et défense des intérêts commerciaux des entreprises devant l'ensemble des juridictions civiles et commerciales.",
    cases: [
      'Ruptures abusives de pourparlers',
      'Concurrence déloyale',
      'Rupture brutale de relations commerciales établies',
      'Recouvrement de créances B2B',
      'Inexécution ou mauvaise exécution contractuelle',
    ],
  },
  {
    slug: 'droit-societes',
    title: 'Droit des sociétés',
    lead:
      "Résolution des litiges complexes entre actionnaires, dirigeants et entreprises, avec une attention particulière à la stabilité de votre structure.",
    cases: [
      "Conflits entre actionnaires (blocage, abus de majorité ou minorité)",
      'Violation de pactes statutaires ou extra-statutaires',
      "Responsabilité des dirigeants",
      "Contentieux post-cession (garanties d'actif et de passif, ajustement de prix)",
    ],
  },
  {
    slug: 'droit-numerique',
    title: 'Droits et actifs numériques',
    lead:
      "Litiges propres aux acteurs de l'économie numérique, avec une expertise issue d'un parcours en cabinet Tech & Data.",
    cases: [
      'Contrats SaaS, prestation IT, hébergement',
      'Contentieux entre plateformes et utilisateurs professionnels',
      'Litiges propriété intellectuelle (logiciels, bases de données)',
      'Données personnelles et conformité RGPD',
    ],
  },
  {
    slug: 'droit-consommation',
    title: 'Droit de la consommation et de la distribution',
    lead:
      "Gestion des contentieux relatifs aux pratiques commerciales et aux relations entre professionnels et consommateurs.",
    cases: [
      'Pratiques commerciales trompeuses ou agressives',
      'Litiges fournisseur-distributeur',
      'Contentieux B2C et actions de groupe',
      'Conformité aux obligations d\'information précontractuelle',
    ],
  },
  {
    slug: 'droit-construction',
    title: 'Droit de la construction et risques industriels',
    lead:
      "Sécurisation et défense des projets des professionnels du secteur de la construction et de l'industrie.",
    cases: [
      'Contentieux relatifs aux malfaçons et à la garantie décennale',
      'Litiges entre maîtres d\'ouvrage, entreprises et sous-traitants',
      'Responsabilité des constructeurs',
      'Risques industriels et contentieux assurantiel',
    ],
  },
  {
    slug: 'modes-alternatifs',
    title: 'Modes alternatifs de règlement des litiges',
    lead:
      "Résolution amiable des différends lorsque la transaction est plus efficace, plus rapide et plus confidentielle qu'une procédure judiciaire.",
    cases: [
      'Négociation pré-contentieuse',
      'Médiation et conciliation',
      "Procédures participatives",
      'Pré-contentieux et exécution amiable des décisions',
    ],
  },
];

export default function Expertises() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash !== '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div id="top">
      <PageHeader
        title="Nos Expertises"
        description="Six domaines d'intervention en contentieux des affaires"
        eyebrow="Domaines d'intervention"
        backgroundImage={expertiseImage}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-in">
            <div className="mb-16 md:mb-20 max-w-3xl">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-5">
                Domaines d'intervention
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-gray-900 leading-[1.15] mb-6">
                Une expertise transversale du contentieux des affaires.
              </h2>
              <p className="text-base md:text-lg text-gray-600 font-light leading-relaxed">
                Le cabinet intervient sur six domaines complémentaires, devant
                l'ensemble des juridictions civiles et commerciales de France. Chaque
                dossier fait l'objet d'une stratégie sur mesure, conçue après un premier
                rendez-vous d'analyse.
              </p>
            </div>
          </ScrollReveal>

          <ul className="border-t border-gray-200">
            {expertises.map((expertise, idx) => (
              <li key={expertise.slug} className="border-b border-gray-200">
                <ScrollReveal animation="fade-in" delay={idx * 60}>
                  <Link
                    to={`/expertises/${expertise.slug}`}
                    className="group block py-10 md:py-14 px-2 md:px-4 -mx-2 md:-mx-4 hover:bg-gray-50/70 transition-colors duration-200"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-[120px_1fr_auto] gap-x-12 gap-y-6 items-baseline">
                      <span
                        aria-hidden="true"
                        className="font-serif text-3xl md:text-5xl font-extralight text-gray-300 tabular-nums leading-none"
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </span>

                      <div>
                        <h3 className="font-serif text-2xl md:text-3xl font-light text-gray-900 mb-3 leading-snug group-hover:text-primary-dark transition-colors duration-200">
                          {expertise.title}
                        </h3>
                        <p className="text-base text-gray-600 font-light leading-relaxed mb-6 max-w-2xl">
                          {expertise.lead}
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 max-w-2xl">
                          {expertise.cases.map((c) => (
                            <li
                              key={c}
                              className="text-sm text-gray-500 font-light leading-relaxed flex items-start gap-2"
                            >
                              <span
                                aria-hidden
                                className="text-gray-300 mt-1 flex-shrink-0"
                              >
                                ·
                              </span>
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <span className="hidden md:inline-flex items-center text-sm text-gray-400 group-hover:text-gray-900 transition-colors duration-200 self-start pt-2">
                        <span className="mr-2 tracking-wide">En savoir plus</span>
                        <ArrowUpRight
                          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden
                        />
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
