// Shared article loading, frontmatter parsing and Markdown rendering.
// Used by Articles.tsx (listing), ArticlePage.tsx (detail) and ExpertiseDetail.tsx (related articles).
//
// Articles are imported eagerly so that everything is available at SSG time.

import { marked } from 'marked';

const articleModules = import.meta.glob('../content/articles/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export interface ArticleMeta {
  title: string;
  description: string;
  /** Publication date, ISO (YYYY-MM-DD). */
  date: string;
  /** Optional last-update date, ISO. Falls back to `date`. */
  updated: string;
  domaine: string;
  slug: string;
}

export interface Article {
  meta: ArticleMeta;
  /** Raw Markdown body (without frontmatter). */
  content: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

/** Label shown for each `domaine` frontmatter value. */
export const DOMAINE_LABELS: Record<string, string> = {
  'droit-commercial': 'Droit commercial',
  'droit-societes': 'Droit des sociétés',
  'droit-immobilier': 'Droit immobilier',
  'droit-social': 'Droit social',
  'droit-numerique': 'Droit du numérique',
  'droit-construction': 'Droit de la construction',
  'droit-consommation': 'Droit de la consommation',
  'modes-alternatifs': 'Modes alternatifs de règlement des litiges',
};

/** Domaines that have a dedicated expertise page at /expertises/{domaine}. */
export const DOMAINES_WITH_EXPERTISE_PAGE = new Set([
  'droit-commercial',
  'droit-societes',
  'droit-numerique',
  'droit-consommation',
  'droit-construction',
  'modes-alternatifs',
]);

export function domaineLabel(domaine: string | undefined): string | null {
  if (!domaine) return null;
  return DOMAINE_LABELS[domaine] ?? domaine;
}

export function expertisePathForDomaine(domaine: string | undefined): string | null {
  if (!domaine || !DOMAINES_WITH_EXPERTISE_PAGE.has(domaine)) return null;
  return `/expertises/${domaine}`;
}

export function parseArticle(raw: string): Article {
  // Windows-saved files use CRLF; the regexes below expect LF.
  const normalized = raw.replace(/\r\n/g, '\n');
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { meta: {} as ArticleMeta, content: normalized };
  const yaml = match[1];
  const get = (key: string) => {
    const m = yaml.match(new RegExp(`^${key}:\\s*"?([^"\\n]+?)"?\\s*$`, 'm'));
    return m ? m[1].trim() : '';
  };
  const date = get('date');
  return {
    meta: {
      title: get('title'),
      description: get('description'),
      date,
      updated: get('updated') || date,
      domaine: get('domaine'),
      slug: get('slug'),
    },
    content: match[2].trim(),
  };
}

const ALL_ARTICLES: Article[] = Object.entries(articleModules)
  .map(([, raw]) => parseArticle(raw))
  .filter((a) => a.meta.slug)
  .sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1));

/** All articles, newest first. */
export function getAllArticles(): Article[] {
  return ALL_ARTICLES;
}

export function getArticleBySlug(slug: string | undefined): Article | undefined {
  if (!slug) return undefined;
  return ALL_ARTICLES.find((a) => a.meta.slug === slug);
}

export function getArticlesByDomaine(domaine: string): Article[] {
  return ALL_ARTICLES.filter((a) => a.meta.domaine === domaine);
}

/** Articles other than `slug`, same domaine first, newest first. */
export function getRelatedArticles(slug: string, domaine: string, limit = 3): Article[] {
  const others = ALL_ARTICLES.filter((a) => a.meta.slug !== slug);
  const same = others.filter((a) => a.meta.domaine === domaine);
  const rest = others.filter((a) => a.meta.domaine !== domaine);
  return [...same, ...rest].slice(0, limit);
}

marked.use({ gfm: true, breaks: false });

/**
 * Markdown → HTML. Deterministic (no async), so the SSG output and the
 * client hydration produce the same string.
 */
export function mdToHtml(md: string): string {
  return marked.parse(md, { async: false }) as string;
}

/** Strip inline Markdown to plain text (for schema.org answers). */
function mdToText(md: string): string {
  return md
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Extract the FAQ from an article body. Convention:
 *
 *   ## Questions fréquentes...
 *   **Question ?**
 *   Answer paragraph(s)
 *
 * Stops at the next `## ` heading or end of document.
 */
export function extractFaq(md: string): FaqItem[] {
  const normalized = md.replace(/\r\n/g, '\n');
  const start = normalized.search(/^## Questions fréquentes/im);
  if (start === -1) return [];
  let section = normalized.slice(start).replace(/^## [^\n]*\n/, '');
  const next = section.search(/^## /m);
  if (next !== -1) section = section.slice(0, next);

  const items: FaqItem[] = [];
  const blocks = section.split(/\n\n+/).map((b) => b.trim()).filter(Boolean);
  let current: FaqItem | null = null;
  for (const block of blocks) {
    const q = block.match(/^\*\*(.+?)\*\*$/);
    if (q) {
      if (current && current.answer) items.push(current);
      current = { question: mdToText(q[1]), answer: '' };
    } else if (current) {
      current.answer = current.answer ? `${current.answer} ${mdToText(block)}` : mdToText(block);
    }
  }
  if (current && current.answer) items.push(current);
  return items;
}
