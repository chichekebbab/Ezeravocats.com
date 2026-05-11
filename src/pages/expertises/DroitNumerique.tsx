import React from 'react';
import ExpertiseDetail from '../../components/ExpertiseDetail';
import SeoHead from '../../components/SeoHead';
import { serviceSchema, breadcrumbSchema } from '../../lib/schemas';

export default function DroitNumerique() {
  const content = (
    <>
      <p>
        Grâce à notre expérience en droit des activités numériques, nous accompagnons les entreprises dans la résolution de leurs litiges digitaux.
      </p>
      <p>
        Nous intervenons notamment en cas d'inexécution de contrats informatiques (contrats de développement ou de licence de logiciel, contrats de maintenance, d'infogérance, contrats SaaS, contrats de prestation de service informatique, contrats d'intégration système) et défendons vos intérêts face aux prestataires défaillants en assurant le respect des engagements contractuels.
      </p>
      <p>
        Sensibles aux enjeux d'e-réputation, nous assistons notre clientèle dans la protection de son image en ligne et dans la lutte contre les atteintes réputationnelles (avis diffamatoires, dénigrement, divulgation de données confidentielles, campagnes de doxing,…).
      </p>
      <p>
         Forts de notre expertise en matière de protection des bases de données, nous veillons également à la sécurité de vos actifs numériques.
      </p>
      <p className="font-medium">
        Notre engagement : sécuriser votre activité numérique pour vous permettre de vous concentrer sur votre cœur de métier.
      </p>
    </>
  );

  return (
    <>
      <SeoHead
        title="Avocat en droit du numérique — Paris"
        description="Avocat en droits et actifs numériques : litiges plateformes, contrats SaaS, données personnelles, propriété intellectuelle des logiciels et bases de données."
        canonical="/expertises/droit-numerique"
        schema={[
          serviceSchema({
            name: 'Droits et actifs numériques',
            description:
              "Litiges propres aux acteurs de l'économie numérique : plateformes, contrats SaaS, données personnelles, propriété intellectuelle des logiciels.",
            slug: 'droit-numerique',
            serviceType: 'Droit du numérique',
          }),
          breadcrumbSchema([
            { name: 'Accueil', path: '/' },
            { name: 'Expertises', path: '/expertises' },
            { name: 'Droit du numérique', path: '/expertises/droit-numerique' },
          ]),
        ]}
      />
      <ExpertiseDetail
        title="Droits et actifs numériques"
        description="Protection et sécurisation de vos activités numériques"
        image="/images/expertises/droit-numerique"
        content={content}
      />
    </>
  );
}
