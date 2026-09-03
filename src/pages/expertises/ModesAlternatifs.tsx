import React from 'react';
import ExpertiseDetail from '../../components/ExpertiseDetail';
import SeoHead from '../../components/SeoHead';
import { serviceSchema, breadcrumbSchema } from '../../lib/schemas';

export default function ModesAlternatifs() {
  const content = (
    <>
      <p>
        Nous accompagnons entreprises et particuliers dans la recherche de solutions efficaces et constructives pour leurs différends. Convaincus que la voie contentieuse classique n'est pas toujours la plus appropriée, nous explorons systématiquement, y compris en cours de procédure, toutes les options de médiation, de conciliation ou de négociation susceptibles de conduire à un règlement amiable, rapide et maîtrisé.
      </p>
      <p>
        Cette approche permet de réduire sensiblement les coûts et les délais d'un contentieux tout en préservant les relations d'affaires et la réputation des parties.
      </p>
      <p>
        Grâce à notre expertise en procédures participatives et en transactions, nous aidons nos clients à structurer des solutions équilibrées qui sécurisent leurs droits et intérêts. Lorsque cela est nécessaire, nous les assistons également dans le cadre d'arbitrages internes pour garantir un règlement confidentiel et définitif.
      </p>
      <p className="font-medium mt-4">
        Notre engagement : vous accompagner pour parvenir à une solution amiable, rapide et maîtriser les coûts du règlement de votre litige.
      </p>
    </>
  );

  return (
    <>
      <SeoHead
        title="Modes alternatifs de règlement des litiges"
        description="Résolution amiable des litiges : négociation pré-contentieuse, médiation, conciliation et procédure participative. Alternative efficace au contentieux."
        canonical="/expertises/modes-alternatifs"
        schema={[
          serviceSchema({
            name: 'Modes alternatifs de règlement des litiges',
            description:
              'Négociation, médiation, conciliation et procédures participatives. Résolution amiable lorsque plus efficace qu\'un contentieux.',
            slug: 'modes-alternatifs',
            serviceType: 'Médiation et résolution amiable',
          }),
          breadcrumbSchema([
            { name: 'Accueil', path: '/' },
            { name: 'Expertises', path: '/expertises' },
            { name: 'Modes alternatifs', path: '/expertises/modes-alternatifs' },
          ]),
        ]}
      />
      <ExpertiseDetail
        slug="modes-alternatifs"
        title="Modes alternatifs de règlements des litiges"
        description="Solutions amiables et efficaces pour la résolution des différends"
        image="/images/expertises/modes-alternatifs"
        content={content}
      />
    </>
  );
}
