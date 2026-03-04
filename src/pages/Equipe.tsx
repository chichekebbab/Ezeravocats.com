import React, { useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import SectionTitle from '../components/SectionTitle';
import ScrollReveal from '../components/ScrollReveal';
import { useLocation } from 'react-router-dom';
import quiSommesNousImage from '../assets/images/qui sommes nous.jpg';
import myriamImage from '../assets/images/myriam.jpeg';

export default function Equipe() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);
  return (
    <div id="top">
      <PageHeader 
        title="Qui sommes nous ?"
        description="Une équipe d'experts à votre service"
        backgroundImage={quiSommesNousImage}
      />
      
      <aside className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <ScrollReveal animation="fade-in">
              <div>
                <SectionTitle
                  subtitle=" "
                  title="Maître Myriam Douillet Benaroch"
                  alignment="left"
                />
                <div className="text-gray-600 mb-3 text-justify space-y-4">
                  <p>
                    Avocate au Barreau de Paris depuis 2019, exerçant en contentieux des affaires, j'accompagne des entreprises françaises et internationales de toutes tailles dans la gestion de leurs litiges.
                  </p>
                  
                  <p>
                    Mon parcours, au sein de cabinets pluridisciplinaires français et anglo-saxons à Paris (Bird & Bird et LPA Law) et en Californie (Bruns Legal), m'a permis de développer une expertise approfondie dans divers types de litiges civils et commerciaux : ruptures de relations contractuelles ou commerciales, contentieux post-cessions ou acquisitions,  litiges entre actionnaires, construction, risques industriels, différends spécifiques aux acteurs de l'économie numérique.
                  </p>
                  
                  <p>
                    Je suis diplômée d'un Master I en Droit des affaires de l'Université Paris I – Panthéon Sorbonne (2016), et d'un Master II en Droit des activités numériques de l'Université Paris V – Descartes, réalisé en alternance au sein du département Tech & Data d'un cabinet français (Lawways).
                  </p>
                  
                  <p>
                    Curieuse et créative, je m'engage à défendre les intérêts de mes clients devant les juridictions françaises dans les meilleures conditions possibles. Pragmatique, je privilégie la résolution amiable des litiges (négociation, médiation ou conciliation) lorsque cela est envisageable. Néanmoins, je n'hésite pas à adopter une approche procédurale et stratégique lorsque les parties ne sont pas disposées à négocier de bonne foi.
                  </p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="slide-in-right">
              <div className="relative h-[600px] overflow-hidden">
                <img
                  src={myriamImage}
                  alt="Maître Myriam Douillet Benaroch"
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
