// Generates dist/sitemap.xml from the SSG route list + article frontmatter.
// Run as a postbuild step. Stays in sync with vite.config.ts via a shared route list.

import { promises as fs, readdirSync, readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const distDir = path.join(repoRoot, 'dist');
const articlesDir = path.join(repoRoot, 'src', 'content', 'articles');

const BASE_URL = 'https://www.ezeravocats.com';
const today = new Date().toISOString().split('T')[0];

// Static routes with their SEO priority/changefreq and the source files whose
// last commit date becomes <lastmod>. Keep in sync with vite.config.ts.
// /mentions-legales and /404 are intentionally excluded (noindex).
const STATIC_ROUTES = [
  { path: '/',                              priority: '1.0', changefreq: 'weekly',  sources: ['src/pages/Home.tsx', 'src/components/Hero.tsx'] },
  { path: '/cabinet',                       priority: '0.9', changefreq: 'monthly', sources: ['src/pages/Cabinet.tsx'] },
  { path: '/equipe',                        priority: '0.8', changefreq: 'monthly', sources: ['src/pages/Equipe.tsx'] },
  { path: '/expertises',                    priority: '0.9', changefreq: 'monthly', sources: ['src/pages/Expertises.tsx'] },
  { path: '/expertises/droit-commercial',   priority: '0.8', changefreq: 'monthly', sources: ['src/pages/expertises/DroitCommercial.tsx'] },
  { path: '/expertises/droit-societes',     priority: '0.8', changefreq: 'monthly', sources: ['src/pages/expertises/DroitSocietes.tsx'] },
  { path: '/expertises/droit-numerique',    priority: '0.8', changefreq: 'monthly', sources: ['src/pages/expertises/DroitNumerique.tsx'] },
  { path: '/expertises/droit-consommation', priority: '0.8', changefreq: 'monthly', sources: ['src/pages/expertises/DroitConsommation.tsx'] },
  { path: '/expertises/droit-construction', priority: '0.8', changefreq: 'monthly', sources: ['src/pages/expertises/DroitConstruction.tsx'] },
  { path: '/expertises/modes-alternatifs',  priority: '0.8', changefreq: 'monthly', sources: ['src/pages/expertises/ModesAlternatifs.tsx'] },
  { path: '/articles',                      priority: '0.7', changefreq: 'weekly',  sources: ['src/pages/Articles.tsx', 'src/content/articles'] },
  { path: '/contact',                       priority: '0.7', changefreq: 'yearly',  sources: ['src/pages/Contact.tsx'] },
];

/**
 * Last commit date (YYYY-MM-DD) touching any of the given paths.
 * Falls back to today when git is unavailable (or the clone is too shallow
 * to know), which is no worse than the previous behaviour.
 */
function gitLastMod(sources) {
  try {
    const out = execSync(`git log -1 --format=%cs -- ${sources.map((s) => JSON.stringify(s)).join(' ')}`, {
      cwd: repoRoot,
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : today;
  } catch {
    return today;
  }
}

function getArticles() {
  let files = [];
  try { files = readdirSync(articlesDir).filter((f) => f.endsWith('.md')); } catch { return []; }
  return files.map((file) => {
    const raw = readFileSync(path.join(articlesDir, file), 'utf-8').replace(/\r\n/g, '\n');
    const fm = raw.match(/^---\n([\s\S]*?)\n---/);
    const yaml = fm ? fm[1] : '';
    const field = (key) => (yaml.match(new RegExp(`^${key}:\\s*"?([^"\\n]+?)"?\\s*$`, 'm')) ?? [])[1] ?? null;
    const slug = field('slug') ?? file.replace(/\.md$/, '');
    const lastmod = field('updated') ?? field('date') ?? gitLastMod([`src/content/articles/${file}`]);
    return { path: `/articles/${slug}`, lastmod, priority: '0.6', changefreq: 'monthly' };
  });
}

const entries = [
  ...STATIC_ROUTES.map((r) => ({ ...r, lastmod: gitLastMod(r.sources) })),
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
