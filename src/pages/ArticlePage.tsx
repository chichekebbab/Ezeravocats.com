import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import {
  getArticleBySlug,
  getRelatedArticles,
  mdToHtml,
  extractFaq,
  domaineLabel,
  expertisePathForDomaine,
} from '../lib/articles';
import { articleSchema, faqSchema, breadcrumbSchema } from '../lib/schemas';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = getArticleBySlug(slug);

  if (!article || !slug) return <Navigate to="/404" replace />;

  const { meta, content } = article;
  const htmlContent = mdToHtml(content);
  const faq = extractFaq(content);
  const label = domaineLabel(meta.domaine);
  const expertisePath = expertisePathForDomaine(meta.domaine);
  const related = getRelatedArticles(slug, meta.domaine);

  const schemas: object[] = [
    articleSchema({
      title: meta.title,
      description: meta.description,
      slug,
      datePublished: meta.date,
      dateModified: meta.updated,
      section: label,
    }),
    breadcrumbSchema([
      { name: 'Accueil', path: '/' },
      { name: 'Articles', path: '/articles' },
      { name: meta.title, path: `/articles/${slug}` },
    ]),
  ];
  if (faq.length > 0) schemas.push(faqSchema(faq));

  const isUpdated = meta.updated && meta.updated !== meta.date;

  return (
    <>
      <SeoHead title={meta.title} description={meta.description} canonical={`/articles/${slug}`} schema={schemas} />

      {/* Wrapper global centré */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

        {/* ── Breadcrumb ── */}
        <nav aria-label="Fil d'Ariane" className="flex flex-wrap items-center gap-2 text-xs tracking-widest uppercase text-gray-400 mb-10">
          <Link to="/" className="hover:text-gray-700 transition-colors">Accueil</Link>
          <span className="text-gray-300">/</span>
          <Link to="/articles" className="hover:text-gray-700 transition-colors">Articles</Link>
          {label && (
            <>
              <span className="text-gray-300">/</span>
              {expertisePath ? (
                <Link to={expertisePath} className="text-gray-500 font-medium hover:text-gray-700 transition-colors">
                  {label}
                </Link>
              ) : (
                <span className="text-gray-500 font-medium">{label}</span>
              )}
            </>
          )}
        </nav>

        {/* ── Header article ── */}
        <header className="mb-10 md:mb-14">
          {/* Méta : domaine + date */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            {label && (
              <span className="inline-flex items-center px-3 py-1 text-xs font-medium tracking-[0.12em] uppercase bg-primary/10 text-primary-dark border border-primary/20">
                {label}
              </span>
            )}
            {meta.date && (
              <time dateTime={meta.date} className="text-xs text-gray-400 tracking-wide">
                {formatDate(meta.date)}
              </time>
            )}
            {isUpdated && (
              <span className="text-xs text-gray-400 tracking-wide">
                Mis à jour le <time dateTime={meta.updated}>{formatDate(meta.updated)}</time>
              </span>
            )}
          </div>

          {/* Titre */}
          <h1 className="font-serif text-3xl md:text-4xl lg:text-[2.6rem] font-light text-gray-900 leading-tight mb-6">
            {meta.title}
          </h1>

          {/* Chapô / description */}
          <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed max-w-2xl">
            {meta.description}
          </p>

          {/* Auteure */}
          <p className="mt-6 text-sm text-gray-500 font-light">
            Par{' '}
            <Link to="/equipe" rel="author" className="text-gray-800 hover:text-primary-dark underline underline-offset-4 transition-colors">
              Maître Myriam Douillet Benaroch
            </Link>
            , avocate au Barreau de Paris
          </p>

          {/* Séparateur */}
          <div className="mt-8 h-px bg-gray-200" />
        </header>

        {/* ── Corps de l'article ── */}
        <div
          className="article-body"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* ── Footer article ── */}
        <footer className="mt-16 pt-8 border-t border-gray-100 max-w-[70ch] mx-auto">
          {/* À propos de l'auteure */}
          <section aria-labelledby="auteure" className="mb-10">
            <h2 id="auteure" className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-4">
              À propos de l'auteure
            </h2>
            <p className="text-sm text-gray-600 font-light leading-relaxed">
              <Link to="/equipe" className="text-gray-900 font-normal hover:text-primary-dark transition-colors">
                Myriam Douillet Benaroch
              </Link>{' '}
              est avocate au Barreau de Paris depuis 2019 et fondatrice d'Ezer Avocats, cabinet dédié au
              contentieux des affaires. Elle accompagne les entreprises dans leurs litiges commerciaux,
              conflits entre associés et contentieux post-cession devant l'ensemble des juridictions
              civiles et commerciales.
              {expertisePath && label && (
                <>
                  {' '}En savoir plus sur notre intervention en{' '}
                  <Link to={expertisePath} className="text-primary-dark underline underline-offset-4 hover:text-gray-900 transition-colors">
                    {label.toLowerCase()}
                  </Link>
                  .
                </>
              )}
            </p>
          </section>

          <div className="bg-slate-50 p-6 md:p-8">
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              <span className="font-medium text-gray-700">À noter :</span>{' '}
              Cet article est rédigé à titre informatif et ne constitue pas un conseil juridique personnalisé.
              Chaque situation étant unique, nous vous invitons à consulter un avocat pour toute question spécifique.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-sm font-light tracking-wider text-gray-900 border border-gray-300 hover:border-gray-900 px-4 py-2 transition-colors duration-200"
            >
              Contacter le cabinet →
            </Link>
          </div>

          {/* Articles liés */}
          {related.length > 0 && (
            <section aria-labelledby="articles-lies" className="mt-12">
              <h2 id="articles-lies" className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-6">
                À lire également
              </h2>
              <ul className="divide-y divide-gray-100 border-y border-gray-100">
                {related.map(({ meta: r }) => (
                  <li key={r.slug}>
                    <Link to={`/articles/${r.slug}`} className="group block py-5">
                      <p className="font-serif text-lg text-gray-900 group-hover:text-primary-dark transition-colors leading-snug">
                        {r.title}
                      </p>
                      <p className="text-sm text-gray-500 font-light mt-1">{r.description}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="mt-8">
            <Link
              to="/articles"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors"
            >
              ← Retour aux articles
            </Link>
          </div>
        </footer>
      </div>
    </>
  );
}
