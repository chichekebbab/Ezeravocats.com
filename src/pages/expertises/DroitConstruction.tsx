import React from 'react';
import ExpertiseDetail from '../../components/ExpertiseDetail';
import SeoHead from '../../components/SeoHead';
import { serviceSchema, breadcrumbSchema } from '../../lib/schemas';

export default function DroitConstruction() {
  const content = (
    <>
      <p>
        Nous accompagnons les professionnels du secteur de la construction pour sécuriser et défendre leurs projets.
      </p>
      <p>
        Dans ce cadre, nous intervenons dans la gestion des litiges techniques en veillant à la protection de vos intérêts et à la bonne exécution des ouvrages.
      </p>
      <p>
        Rompu aux procédures d'expertise judiciaire, EZER accompagne tant les maîtres d'ouvrage que les architectes, bureaux de contrôle ou les sous-traitants pour déterminer les causes de désordres ou sinistres et établir la responsabilité des parties amiablement ou judiciairement.
      </p>
      <p>
        Nous travaillons en étroite collaboration avec un réseau d'experts techniques dans le but de défendre au mieux les intérêts de nos clients lors des expertises judiciaires et faciliter la prise de décisions, notamment dans le cadre de négociations amiables.
      </p>
      <p>
        Par ailleurs, le cabinet intervient dans des litiges relatifs aux vices cachés et aux défauts de conformité, nécessitant une expertise technique pointue.
      </p>
      <p className="font-medium">
        Notre engagement : sécuriser vos projets de construction et les risques industriels grâce à une expertise juridique fiable.
      </p>
    </>
  );

  return (
    <>
      <SeoHead
        title="Avocat en droit de la construction — Paris"
        description="Avocat en droit de la construction et risques industriels : malfaçons, garantie décennale, contentieux maître d'ouvrage / entreprises / sous-traitants."
        canonical="/expertises/droit-construction"
        schema={[
          serviceSchema({
            name: 'Droit de la construction et risques industriels',
            description:
              "Malfaçons, garantie décennale, contentieux entre maître d'ouvrage, entreprises et sous-traitants. Risques industriels et contentieux assurantiel.",
            slug: 'droit-construction',
            serviceType: 'Droit de la construction',
          }),
          breadcrumbSchema([
            { name: 'Accueil', path: '/' },
            { name: 'Expertises', path: '/expertises' },
            { name: 'Droit de la construction', path: '/expertises/droit-construction' },
          ]),
        ]}
      />
      <ExpertiseDetail
        slug="droit-construction"
        title="Droit de la construction - Risques industriels"
        description="Sécurisation des projets et gestion des litiges techniques"
        image="/images/expertises/droit-construction"
        content={content}
      />
    </>
  );
}
