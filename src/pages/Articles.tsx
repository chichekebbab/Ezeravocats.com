import React from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import PageHeader from '../components/PageHeader';
import { getAllArticles, domaineLabel } from '../lib/articles';
import { breadcrumbSchema, ORG_ID, SITE_URL } from '../lib/schemas';

const articles = getAllArticles();

export default function Articles() {
  return (
    <>
      <SeoHead
        title="Articles en droit des affaires et contentieux commercial"
        description="Analyses et décryptages juridiques par Ezer Avocats : droit commercial, droit des sociétés, contentieux et stratégie procédurale."
        canonical="/articles"
        schema={[
          {
            '@context': 'https://schema.org', '@type': 'CollectionPage',
            name: 'Articles juridiques | Ezer Avocats',
            url: `${SITE_URL}/articles`,
            inLanguage: 'fr-FR',
            publisher: { '@id': ORG_ID },
          },
          breadcrumbSchema([
            { name: 'Accueil', path: '/' },
            { name: 'Articles', path: '/articles' },
          ]),
        ]}
      />

      <PageHeader
        title="Articles"
        description="Analyses et décryptages par le cabinet Ezer Avocats"
        image="/images/livres"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">

        {articles.length === 0 && (
          <p className="text-gray-400 text-center py-16">Aucun article publié pour le moment.</p>
        )}

        <ul className="space-y-0">
          {articles.map(({ meta }, idx) => {
            const dateFormatted = meta.date
              ? new Date(meta.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
              : null;
            const label = domaineLabel(meta.domaine);

            return (
              <li key={meta.slug}>
                {/* Séparateur entre cartes (pas avant la première) */}
                {idx > 0 && <div className="border-t border-gray-100" />}

                <Link
                  to={`/articles/${meta.slug}`}
                  className="group block py-10 md:py-12"
                  aria-label={`Lire l'article : ${meta.title}`}
                >
                  {/* Méta : domaine + date */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    {label && (
                      <span className="inline-flex items-center px-2.5 py-0.5 text-[11px] font-medium tracking-[0.12em] bg-primary/10 text-primary-dark border border-primary/20 uppercase">
                        {label}
                      </span>
                    )}
                    {dateFormatted && (
                      <time dateTime={meta.date} className="text-xs text-gray-400 tracking-wide">
                        {dateFormatted}
                      </time>
                    )}
                  </div>

                  {/* Titre */}
                  <h2 className="font-serif text-xl md:text-2xl font-light text-gray-900 mb-3 group-hover:text-primary-dark transition-colors duration-200 leading-snug">
                    {meta.title}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-500 font-light leading-relaxed mb-5 max-w-2xl text-base">
                    {meta.description}
                  </p>

                  {/* CTA */}
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-700 group-hover:text-primary-dark transition-colors duration-200">
                    Lire l'article
                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
