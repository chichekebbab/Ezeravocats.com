import React from 'react';
import PageHeader from '../components/PageHeader';
import SeoHead from '../components/SeoHead';

export default function MentionsLegales() {
  return (
    <>
      <SeoHead
        title="Mentions légales"
        description="Mentions légales du site Ezer Avocats : informations légales, hébergeur, propriété intellectuelle, données personnelles et cookies."
        canonical="/mentions-legales"
        noindex
      />
      <PageHeader
        title="Mentions légales"
        description="Informations légales concernant le site web Ezer Avocats"
        image="/images/mentions-legales"
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow">
        <div className="prose prose-lg max-w-none lg:prose-xl text-black">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-2xl font-semibold mb-4">1. Informations générales</h2>
            <p>Conformément à l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique :</p>
            <ul>
              <li>Propriétaire : Myriam Douillet Benaroch (EI)</li>
              <li>Conception et création : Myriam Douillet Benaroch</li>
              <li>Responsable de publication : Myriam Douillet Benaroch <a href="mailto:myriam.douillet@ezeravocats.com" className="text-primary hover-underline">myriam.douillet@ezeravocats.com</a></li>
              <li>Webmaster : Myriam Douillet Benaroch</li>
              <li>Hébergeur : OVH, OVH RCS Roubaix - Tourcoing 424 761 419 00045 Code APE 6202A. Siège social : 2 rue Kellermann - 59100 Roubaix – France. N° TVA : FR 22 424 761 419</li>
              <li>Crédits : Myriam Douillet Benaroch</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Utilisation du site</h2>
            <p>L'accès et l'utilisation du site <a href="https://www.ezeravocats.com" className="text-primary hover-underline">www.ezeravocats.com</a> impliquent l'acceptation sans réserve des conditions d'utilisation décrites ici. Ces conditions peuvent être modifiées à tout moment.</p>
            <p>Le site est normalement accessible 24h/24 et 7j/7. Toute interruption pour maintenance technique sera communiquée au préalable.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Contenu et services</h2>
            <p>Le site a pour objectif de fournir des informations sur les activités et services proposés par le cabinet. EZER AVOCATS ne peut être tenu responsable des éventuelles inexactitudes. Les contenus sont donnés à titre indicatif et sont susceptibles d'être modifiés sans préavis.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Propriété intellectuelle</h2>
            <p>Tous les éléments présents sur ce site (textes, images, graphismes, logo, icônes) sont la propriété exclusive d'EZER AVOCATS ou font l'objet de droits d'usage. Toute reproduction, modification ou exploitation est strictement interdite sans autorisation écrite préalable.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Responsabilités</h2>
            <p>EZER AVOCATS décline toute responsabilité en cas de dommages matériels liés à l'utilisation du site. L'utilisateur s'engage à utiliser un matériel récent et sécurisé.</p>
            <p>En cas d'espace interactif, EZER AVOCATS se réserve le droit de supprimer tout contenu contraire à la législation française.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Données personnelles</h2>
            <p>Les informations personnelles sont traitées dans le respect des lois relatives à la protection des données (loi n° 78-17 du 6 janvier 1978). Aucune donnée n'est cédée à des tiers sans consentement explicite.</p>
            <p>Chaque utilisateur dispose d'un droit d'accès, de rectification et de suppression des données le concernant sur demande écrite.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Cookies</h2>
            <p>Le site peut utiliser des cookies pour améliorer la navigation. L'utilisateur peut configurer son navigateur pour les bloquer, au risque d'altérer certaines fonctionnalités.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Liens externes</h2>
            <p>Les liens hypertextes vers des ressources externes ne sauraient engager la responsabilité d'EZER AVOCATS quant à leur contenu.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">9. Droit applicable</h2>
            <p>Tout litige relatif à l'utilisation du site est régi par le droit français. Les tribunaux de Paris sont seuls compétents.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">10. Lexique</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li className="leading-relaxed"><span className="font-medium">Utilisateur :</span> Toute personne accédant au site <a href="https://www.ezeravocats.com" className="text-primary hover-underline">www.ezeravocats.com</a></li>
              <li className="leading-relaxed"><span className="font-medium">Données personnelles :</span> Informations permettant d'identifier une personne physique</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
