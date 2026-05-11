import React from 'react';
import ExpertiseDetail from '../../components/ExpertiseDetail';
import SeoHead from '../../components/SeoHead';
import { serviceSchema, breadcrumbSchema } from '../../lib/schemas';

export default function DroitCommercial() {
  const content = (
    <>
      <p>
        Nous accompagnons nos clients dans la défense de leurs intérêts commerciaux et les aidons à sécuriser leurs relations d'affaires.
      </p>
      <p>
        Nos domaines d'intervention comprennent notamment les ruptures abusives de pourparlers, la protection contre les actes de concurrence déloyale, la rupture brutale des relations commerciales établies, la responsabilité contractuelle et délictuelle ou le recouvrement de créances.
      </p>
      <p>
        Nous accompagnons également nos clients dans les litiges nés d'inexécution ou de mauvaise exécution contractuelle. Cela recouvre notamment le non-respect des conditions de livraison ou de qualité des biens ou services, les retards dans l'exécution des prestations, les manquements aux clauses de garantie, la violation des clausesde confidentialité ou de non-concurrence ou tout autre engagement déterminé.
      </p>
      <p>
        Le cabinet vous accompagne devant toutes les juridictions, en première instance comme en appel, en procédures de référé ou au fond.
      </p>
      <p className="font-medium">
        Notre engagement : une défense précise et réactive à chaque stade de la procédure, avec une expertise adaptée à la réalité de chaque dossier.
      </p>
    </>
  );

  return (
    <>
      <SeoHead
        title="Avocat en droit commercial — Paris"
        description="Cabinet d'avocat en droit commercial à Paris : ruptures abusives, concurrence déloyale, rupture brutale de relations établies, recouvrement de créances."
        canonical="/expertises/droit-commercial"
        schema={[
          serviceSchema({
            name: 'Droit commercial',
            description:
              "Sécurisation des relations d'affaires et défense des intérêts commerciaux : ruptures abusives, concurrence déloyale, rupture brutale, recouvrement.",
            slug: 'droit-commercial',
            serviceType: 'Droit commercial',
          }),
          breadcrumbSchema([
            { name: 'Accueil', path: '/' },
            { name: 'Expertises', path: '/expertises' },
            { name: 'Droit commercial', path: '/expertises/droit-commercial' },
          ]),
        ]}
      />
      <ExpertiseDetail
        title="Droit commercial"
        description="Sécurisation des relations d'affaires et défense des intérêts commerciaux"
        image="/images/expertises/droit-commercial"
        content={content}
      />
    </>
  );
}
