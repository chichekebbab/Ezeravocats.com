import React from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import PageHeader from '../components/PageHeader';
import livresImage from '../assets/images/livres.jpg';

const articleModules = import.meta.glob('../content/articles/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

interface ArticleMeta {
  title: string; description: string; date: string; domaine: string; slug: string;
}

function parseFrontmatter(raw: string): ArticleMeta {
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {} as ArticleMeta;
  const yaml = match[1];
  const get = (key: string) => {
    const m = yaml.match(new RegExp(`^${key}:\\s*"?([^"\\n]+)"?`, 'm'));
    return m ? m[1].trim() : '';
  };
  return { title: get('title'), description: get('description'), date: get('date'), domaine: get('domaine'), slug: get('slug') };
}

const DOMAINE_LABELS: Record<string, string> = {
  'droit-commercial': 'Droit commercial',
  'droit-societes': 'Droit des sociétés',
  'droit-immobilier': 'Droit immobilier',
  'droit-social': 'Droit social',
  'droit-numerique': 'Droit du numérique',
  'droit-construction': 'Droit de la construction',
};

const articles: ArticleMeta[] = Object.values(articleModules)
  .map((raw) => parseFrontmatter(raw))
  .filter((m) => m.slug)
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export default function Articles() {
  return (
    <>
      <SeoHead
        title="Articles juridiques"
        description="Analyses et décryptages juridiques par Ezer Avocats : droit commercial, droit des sociétés, contentieux et stratégie procédurale."
        canonical="/articles"
        schema={{
          '@context': 'https://schema.org', '@type': 'CollectionPage',
          name: 'Articles juridiques — Ezer Avocats',
          url: 'https://www.ezeravocats.com/articles',
          publisher: { '@type': 'LegalService', name: 'Ezer Avocats', url: 'https://www.ezeravocats.com' },
        }}
      />

      <PageHeader
        title="Articles"
        description="Analyses et décryptages par le cabinet Ezer Avocats"
        backgroundImage={livresImage}
        backgroundPosition="center"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">

        {articles.length === 0 && (
          <p className="text-gray-400 text-center py-16">Aucun article publié pour le moment.</p>
        )}

        <ul className="space-y-0">
          {articles.map((article, idx) => {
            const dateFormatted = article.date
              ? new Date(article.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
              : null;
            const domaineLabel = article.domaine ? (DOMAINE_LABELS[article.domaine] ?? article.domaine) : null;

            return (
              <li key={article.slug}>
                {/* Séparateur entre cartes (pas avant la première) */}
                {idx > 0 && <div className="border-t border-gray-100" />}

                <Link
                  to={`/articles/${article.slug}`}
                  className="group block py-10 md:py-12"
                  aria-label={`Lire l'article : ${article.title}`}
                >
                  {/* Méta : domaine + date */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    {domaineLabel && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium tracking-wide bg-primary/10 text-primary-dark border border-primary/20 uppercase">
                        {domaineLabel}
                      </span>
                    )}
                    {dateFormatted && (
                      <time dateTime={article.date} className="text-xs text-gray-400 tracking-wide">
                        {dateFormatted}
                      </time>
                    )}
                  </div>

                  {/* Titre */}
                  <h2 className="font-serif text-xl md:text-2xl font-light text-gray-900 mb-3 group-hover:text-primary-dark transition-colors duration-200 leading-snug">
                    {article.title}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-500 font-light leading-relaxed mb-5 max-w-2xl text-base">
                    {article.description}
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
