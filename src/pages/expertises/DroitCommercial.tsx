import React from 'react';
import ExpertiseDetail from '../../components/ExpertiseDetail';
import droitCommercialImage from '../../assets/images/expertises/Droit commercial.jpg';

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
    <ExpertiseDetail
      title="Droit commercial"
      description="Sécurisation des relations d'affaires et défense des intérêts commerciaux"
      imagePath={droitCommercialImage}
      content={content}
    />
  );
}
