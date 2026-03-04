import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';
import ScrollReveal from '../components/ScrollReveal';
import { Link, useLocation } from 'react-router-dom';
import justiceImage from '../assets/images/myriam.jpeg';

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
    <div id="top">
      <Hero />
      
      <article className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-in">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-16 pt-2 text-center">
              Un cabinet d'avocats dédié au contentieux des affaires
            </h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ScrollReveal animation="slide-in-bottom" delay={0}>
              <Link to="/expertises/droit-commercial" className="group p-8 bg-white hover:bg-gray-50 transition-all duration-500 border border-gray-100 block">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-briefcase h-10 w-10 text-gray-900 mb-6 opacity-75 group-hover:scale-110 transition-all duration-500 mx-auto">
                  <rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
                <h3 className="text-xl font-light tracking-wide text-gray-900 text-center">DROIT COMMERCIAL</h3>
              </Link>
            </ScrollReveal>
            <ScrollReveal animation="slide-in-bottom" delay={100}>
              <Link to="/expertises/droit-societes" className="group p-8 bg-white hover:bg-gray-50 transition-all duration-500 border border-gray-100 block">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-building2 h-10 w-10 text-gray-900 mb-6 opacity-75 group-hover:scale-110 transition-all duration-500 mx-auto">
                  <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
                  <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
                  <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path>
                  <path d="M10 6h4"></path>
                  <path d="M10 10h4"></path>
                  <path d="M10 14h4"></path>
                  <path d="M10 18h4"></path>
                </svg>
                <h3 className="text-xl font-light tracking-wide text-gray-900 text-center">DROIT DES SOCIÉTÉS</h3>
              </Link>
            </ScrollReveal>
            <ScrollReveal animation="slide-in-bottom" delay={200}>
              <Link to="/expertises/droit-numerique" className="group p-8 bg-white hover:bg-gray-50 transition-all duration-500 border border-gray-100 block">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-codesandbox h-10 w-10 text-gray-900 mb-6 opacity-75 group-hover:scale-110 transition-all duration-500 mx-auto">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
                  <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
                  <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
                <h3 className="text-xl font-light tracking-wide text-gray-900 text-center">DROITS ET ACTIFS NUMÉRIQUES</h3>
              </Link>
            </ScrollReveal>
            <ScrollReveal animation="slide-in-bottom" delay={300}>
              <Link to="/expertises/droit-consommation" className="group p-8 bg-white hover:bg-gray-50 transition-all duration-500 border border-gray-100 block">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart h-10 w-10 text-gray-900 mb-6 opacity-75 group-hover:scale-110 transition-all duration-500 mx-auto">
                  <circle cx="8" cy="21" r="1"></circle>
                  <circle cx="19" cy="21" r="1"></circle>
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                </svg>
                <h3 className="text-xl font-light tracking-wide text-gray-900 text-center">DROIT DE LA CONSOMMATION ET DE LA DISTRIBUTION</h3>
              </Link>
            </ScrollReveal>
            <ScrollReveal animation="slide-in-bottom" delay={400}>
              <Link to="/expertises/droit-construction" className="group p-8 bg-white hover:bg-gray-50 transition-all duration-500 border border-gray-100 block">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-construction h-10 w-10 text-gray-900 mb-6 opacity-75 group-hover:scale-110 transition-all duration-500 mx-auto">
                  <rect x="2" y="6" width="20" height="8" rx="1"></rect>
                  <path d="M17 14v7"></path>
                  <path d="M7 14v7"></path>
                  <path d="M17 3v3"></path>
                  <path d="M7 3v3"></path>
                  <path d="M10 14 2.3 6.3"></path>
                  <path d="m14 6 7.7 7.7"></path>
                  <path d="m8 6 8 8"></path>
                </svg>
                <h3 className="text-xl font-light tracking-wide text-gray-900 text-center">DROIT DE LA CONSTRUCTION - RISQUES INDUSTRIELS</h3>
              </Link>
            </ScrollReveal>
            <ScrollReveal animation="slide-in-bottom" delay={500}>
              <Link to="/expertises/modes-alternatifs" className="group p-8 bg-white hover:bg-gray-50 transition-all duration-500 border border-gray-100 block">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-handshake h-10 w-10 text-gray-900 mb-6 opacity-75 group-hover:scale-110 transition-all duration-500 mx-auto">
                  <path d="m11 17 2 2a1 1 0 1 0 3-3"></path>
                  <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"></path>
                  <path d="m21 3 1 11h-2"></path>
                  <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"></path>
                  <path d="M3 4h8"></path>
                </svg>
                <h3 className="text-xl font-light tracking-wide text-gray-900 text-center">MODES ALTERNATIFS DE RÈGLEMENT DES LITIGES</h3>
              </Link>
            </ScrollReveal>
          </div>
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
                  EZER AVOCATS, cabinet dédié au droit des affaires, accompagne les entreprises en élaborant les stratégies judiciaires les plus adaptées à leurs situations. Le cabinet intervient devant l'ensemble des juridictions civiles et commerciales de France.
                </p>
                <Link to="/cabinet#top" className="text-sm tracking-wider text-gray-900 hover:text-gray-600 transition-colors duration-300">
                  DÉCOUVRIR NOTRE CABINET →
                </Link>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="slide-in-right">
              <div className="relative h-[600px] overflow-hidden">
                <img
                  src={justiceImage}
                  alt="Salle de réunion"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105 rounded-2xl"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </aside>
    </div>
  );
}
