import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import PageHeader from '../components/PageHeader';
import ScrollReveal from '../components/ScrollReveal';
import expertiseImage from '../assets/images/expertise.jpg';

export default function Expertises() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const expertises = [
    {
      id: 'droit-commercial',
      title: 'Droit commercial',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-briefcase h-16 w-16 text-gray-900 mb-6 opacity-75 group-hover:scale-110 transition-all duration-500 mx-auto">
          <rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
      ),
      description: "Nous accompagnons nos clients dans la défense de leurs intérêts commerciaux et les aidons à sécuriser leurs relations d'affaires.",
      link: '/expertises/droit-commercial'
    },
    {
      id: 'droit-societes',
      title: 'Droit des sociétés',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-building2 h-16 w-16 text-gray-900 mb-6 opacity-75 group-hover:scale-110 transition-all duration-500 mx-auto">
          <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
          <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
          <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path>
          <path d="M10 6h4"></path>
          <path d="M10 10h4"></path>
          <path d="M10 14h4"></path>
          <path d="M10 18h4"></path>
        </svg>
      ),
      description: 'Nous accompagnons les entreprises et leurs dirigeants pour résoudre des litiges complexes en droit des sociétés.',
      link: '/expertises/droit-societes'
    },
    {
      id: 'droit-numerique',
      title: 'Droits et actifs numériques',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-codesandbox h-16 w-16 text-gray-900 mb-6 opacity-75 group-hover:scale-110 transition-all duration-500 mx-auto">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
          <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
          <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
      ),
      description: 'Grâce à notre expérience en droit des activités numériques, nous accompagnons les entreprises dans la résolution de leurs litiges digitaux.',
      link: '/expertises/droit-numerique'
    },
    {
      id: 'droit-consommation',
      title: 'Droit de la consommation et de la distribution',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart h-16 w-16 text-gray-900 mb-6 opacity-75 group-hover:scale-110 transition-all duration-500 mx-auto">
          <circle cx="8" cy="21" r="1"></circle>
          <circle cx="19" cy="21" r="1"></circle>
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
        </svg>
      ),
      description: 'Nous vous accompagnons dans la gestion de vos litiges avec les consommateurs et intervenons notamment sur des contentieux relatifs aux pratiques commerciales.',
      link: '/expertises/droit-consommation'
    },
    {
      id: 'droit-construction',
      title: 'Droit de la construction - Risques industriels',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-construction h-16 w-16 text-gray-900 mb-6 opacity-75 group-hover:scale-110 transition-all duration-500 mx-auto">
          <rect x="2" y="6" width="20" height="8" rx="1"></rect>
          <path d="M17 14v7"></path>
          <path d="M7 14v7"></path>
          <path d="M17 3v3"></path>
          <path d="M7 3v3"></path>
          <path d="M10 14 2.3 6.3"></path>
          <path d="m14 6 7.7 7.7"></path>
          <path d="m8 6 8 8"></path>
        </svg>
      ),
      description: 'Nous accompagnons les professionnels du secteur de la construction pour sécuriser et défendre leurs projets.',
      link: '/expertises/droit-construction'
    },
    {
      id: 'modes-alternatifs',
      title: 'Modes alternatifs de règlements des litiges',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-handshake h-16 w-16 text-gray-900 mb-6 opacity-75 group-hover:scale-110 transition-all duration-500 mx-auto">
          <path d="m11 17 2 2a1 1 0 1 0 3-3"></path>
          <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"></path>
          <path d="m21 3 1 11h-2"></path>
          <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"></path>
          <path d="M3 4h8"></path>
        </svg>
      ),
      description: 'Nous accompagnons entreprises et particuliers dans la recherche de solutions efficaces et constructives pour leurs différends.',
      link: '/expertises/modes-alternatifs'
    }
  ];
  
  return (
    <div id="top">
      <PageHeader
        title="Nos Expertises"
        description="Domaines d'intervention"
        backgroundImage={expertiseImage}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <ScrollReveal animation="fade-in">
          <SectionTitle
            subtitle="Nos Expertises"
            title="Domaines d'intervention"
            alignment="center"
          />
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {expertises.map((expertise, index) => (
            <ScrollReveal key={expertise.id} animation="slide-in-bottom" delay={index * 100}>
              <Link
                to={expertise.link}
                className="group block"
              >
                <article className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 h-full">
                  <div className="p-6 h-full flex flex-col">
                    {expertise.icon}
                    <h2 className="text-2xl font-light text-gray-900 mb-4 group-hover:text-primary transition-colors">
                      {expertise.title}
                    </h2>
                    <p className="text-gray-600 font-light leading-relaxed">
                      {expertise.description}
                    </p>
                    <div className="mt-4 text-primary font-medium group-hover:text-primary">
                      En savoir plus →
                    </div>
                  </div>
                </article>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
