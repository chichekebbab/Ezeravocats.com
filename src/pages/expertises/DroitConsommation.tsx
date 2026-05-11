import React from 'react';
import ExpertiseDetail from '../../components/ExpertiseDetail';
import SeoHead from '../../components/SeoHead';
import { serviceSchema, breadcrumbSchema } from '../../lib/schemas';

export default function DroitConsommation() {
  const content = (
    <>
      <p>
        Nous vous accompagnons dans la gestion de vos litiges avec les consommateurs et intervenons notamment sur des contentieux relatifs aux pratiques commerciales trompeuses, à la publicité mensongère ou encore à des manquements aux obligations d'information.
      </p>
      <p>
        Dans ce cadre, nous vous assistons tant devant les autorités régulatrices telles que la DGCCRF ou l'ARPP, pour répondre aux contrôles et enquêtes susceptibles d'affecter votre activité, que devant les juridictions.
      </p>
      <p>
        Notre expertise couvre également les litiges relatifs à la conformité, à la sécurité ainsi qu'aux garanties légales et contractuelles de vos produits.
      </p>
      <p className="font-medium">
        Notre engagement : vous offrir une défense  sur mesure pour sécuriser vos relations avec les consommateurs et protéger durablement la réputation de vos produits et services.
      </p>
    </>
  );

  return (
    <>
      <SeoHead
        title="Avocat en droit de la consommation — Paris"
        description="Avocat en droit de la consommation et de la distribution : pratiques commerciales trompeuses, litiges fournisseur-distributeur et contentieux B2C."
        canonical="/expertises/droit-consommation"
        schema={[
          serviceSchema({
            name: 'Droit de la consommation et de la distribution',
            description:
              'Pratiques commerciales, contentieux fournisseur-distributeur, litiges B2C et conformité aux obligations précontractuelles.',
            slug: 'droit-consommation',
            serviceType: 'Droit de la consommation',
          }),
          breadcrumbSchema([
            { name: 'Accueil', path: '/' },
            { name: 'Expertises', path: '/expertises' },
            { name: 'Droit de la consommation', path: '/expertises/droit-consommation' },
          ]),
        ]}
      />
      <ExpertiseDetail
        title="Droit de la consommation et de la distribution"
        description="Protection des intérêts et conformité dans les relations avec les consommateurs"
        image="/images/expertises/droit-consommation"
        content={content}
      />
    </>
  );
}
