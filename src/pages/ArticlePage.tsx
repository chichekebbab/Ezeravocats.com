import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';

// Eager import: tout est disponible au moment du SSG (pas de useEffect)
const articleModules = import.meta.glob('../content/articles/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

interface ArticleFrontmatter {
  title: string;
  description: string;
  date: string;
  domaine: string;
  slug: string;
}

const DOMAINE_LABELS: Record<string, string> = {
  'droit-commercial': 'Droit commercial',
  'droit-societes': 'Droit des sociétés',
  'droit-immobilier': 'Droit immobilier',
  'droit-social': 'Droit social',
  'droit-numerique': 'Droit du numérique',
  'droit-construction': 'Droit de la construction',
};

function parseFrontmatter(raw: string): { meta: ArticleFrontmatter; content: string } {
  // Normalize line endings: Windows-saved files use CRLF, the regex below expects LF.
  const normalized = raw.replace(/\r\n/g, '\n');
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { meta: {} as ArticleFrontmatter, content: raw };
  const yamlBlock = match[1];
  const content = match[2].trim();
  const get = (key: string) => {
    const m = yamlBlock.match(new RegExp(`^${key}:\\s*"?([^"\\n]+?)"?\\s*$`, 'm'));
    return m ? m[1].trim() : '';
  };
  return {
    meta: { title: get('title'), description: get('description'), date: get('date'), domaine: get('domaine'), slug: get('slug') },
    content,
  };
}

function mdToHtml(md: string): string {
  let html = md;
  // Headings
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
  // Inline formatting
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  // Blockquotes
  html = html.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');
  // Lists
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, (block) => `<ul>${block}</ul>`);
  // Paragraphs: split on double newlines
  const blocks = html.split(/\n\n+/);
  html = blocks.map((block) => {
    const trimmed = block.trim();
    if (!trimmed) return '';
    if (/^<(h[1-6]|ul|ol|blockquote|hr|div|pre)/.test(trimmed)) return trimmed;
    return `<p>${trimmed.replace(/\n/g, ' ')}</p>`;
  }).join('\n');
  return html;
}

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const key = `../content/articles/${slug}.md`;
  const raw = articleModules[key];

  if (!raw) return <Navigate to="/articles" replace />;

  const { meta, content } = parseFrontmatter(raw);
  const htmlContent = mdToHtml(content);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    dateModified: meta.date,
    author: { '@type': 'Person', name: 'Myriam Douillet Benaroch', url: 'https://www.ezeravocats.com/equipe' },
    publisher: { '@type': 'LegalService', name: 'Ezer Avocats', url: 'https://www.ezeravocats.com' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://www.ezeravocats.com/articles/${slug}` },
  };

  const dateFormatted = meta.date
    ? new Date(meta.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';

  const domaineLabel = meta.domaine ? (DOMAINE_LABELS[meta.domaine] ?? meta.domaine) : null;

  return (
    <>
      <SeoHead title={meta.title} description={meta.description} canonical={`/articles/${slug}`} schema={schema} />

      {/* Wrapper global centré */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

        {/* ── Breadcrumb ── */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs tracking-widest uppercase text-gray-400 mb-10">
          <Link to="/" className="hover:text-gray-700 transition-colors">Accueil</Link>
          <span className="text-gray-300">/</span>
          <Link to="/articles" className="hover:text-gray-700 transition-colors">Articles</Link>
          {domaineLabel && (
            <>
              <span className="text-gray-300">/</span>
              <span className="text-gray-500 font-medium">{domaineLabel}</span>
            </>
          )}
        </nav>

        {/* ── Header article ── */}
        <header className="mb-10 md:mb-14">
          {/* Méta : domaine + date */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            {domaineLabel && (
              <span className="inline-flex items-center px-3 py-1 text-xs font-medium tracking-[0.12em] uppercase bg-primary/10 text-primary-dark border border-primary/20">
                {domaineLabel}
              </span>
            )}
            {dateFormatted && (
              <time dateTime={meta.date} className="text-xs text-gray-400 tracking-wide">
                {dateFormatted}
              </time>
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

          {/* Séparateur */}
          <div className="mt-8 h-px bg-gradient-to-r from-gray-200 via-gray-100 to-transparent" />
        </header>

        {/* ── Corps de l'article ── */}
        <div
          className="article-body"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* ── Footer article ── */}
        <footer className="mt-16 pt-8 border-t border-gray-100 max-w-[70ch] mx-auto">
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
