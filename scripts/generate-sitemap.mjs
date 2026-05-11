// Generates dist/sitemap.xml from the SSG route list + article frontmatter.
// Run as a postbuild step. Stays in sync with vite.config.ts via a shared route list.

import { promises as fs, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const distDir = path.join(repoRoot, 'dist');
const articlesDir = path.join(repoRoot, 'src', 'content', 'articles');

const BASE_URL = 'https://www.ezeravocats.com';

// Static routes with their SEO priority/changefreq. Keep in sync with vite.config.ts.
// /mentions-legales is intentionally excluded (noindex).
const STATIC_ROUTES = [
  { path: '/',                                  priority: '1.0', changefreq: 'weekly' },
  { path: '/cabinet',                           priority: '0.9', changefreq: 'monthly' },
  { path: '/equipe',                            priority: '0.8', changefreq: 'monthly' },
  { path: '/expertises',                        priority: '0.9', changefreq: 'monthly' },
  { path: '/expertises/droit-commercial',       priority: '0.8', changefreq: 'monthly' },
  { path: '/expertises/droit-societes',         priority: '0.8', changefreq: 'monthly' },
  { path: '/expertises/droit-numerique',        priority: '0.8', changefreq: 'monthly' },
  { path: '/expertises/droit-consommation',     priority: '0.8', changefreq: 'monthly' },
  { path: '/expertises/droit-construction',     priority: '0.8', changefreq: 'monthly' },
  { path: '/expertises/modes-alternatifs',      priority: '0.8', changefreq: 'monthly' },
  { path: '/articles',                          priority: '0.7', changefreq: 'weekly' },
  { path: '/contact',                           priority: '0.7', changefreq: 'yearly' },
];

function getArticles() {
  let files = [];
  try { files = readdirSync(articlesDir).filter((f) => f.endsWith('.md')); } catch { return []; }
  return files.map((file) => {
    const raw = readFileSync(path.join(articlesDir, file), 'utf-8').replace(/\r\n/g, '\n');
    const fm = raw.match(/^---\n([\s\S]*?)\n---/);
    const yaml = fm ? fm[1] : '';
    const slug = (yaml.match(/^slug:\s*"?([^"\n]+?)"?\s*$/m) ?? [])[1] ?? file.replace(/\.md$/, '');
    const date = (yaml.match(/^date:\s*"?([^"\n]+?)"?\s*$/m) ?? [])[1] ?? null;
    return { path: `/articles/${slug}`, lastmod: date, priority: '0.6', changefreq: 'monthly' };
  });
}

const today = new Date().toISOString().split('T')[0];
const entries = [
  ...STATIC_ROUTES.map((r) => ({ ...r, lastmod: today })),
  ...getArticles(),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) => `  <url>
    <loc>${BASE_URL}${e.path}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

await fs.mkdir(distDir, { recursive: true });
await fs.writeFile(path.join(distDir, 'sitemap.xml'), xml, 'utf-8');
console.log(`✓ sitemap.xml written with ${entries.length} URLs`);
