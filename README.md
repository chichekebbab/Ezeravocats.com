# Ezer Avocats — Site vitrine

Site marketing du cabinet **Ezer Avocats**, spécialisé en contentieux des affaires à Paris (75116). Construit avec React + Vite, pré-rendu en statique (SSG), déployé sur Netlify.

## Stack

- **React 18** + **TypeScript**
- **vite-react-ssg** — génération statique des pages au build
- **Tailwind CSS** — avec `md` breakpoint à 900 px et couleur `primary` personnalisée
- **EB Garamond** (titres) + **Jost** (corps) — polices auto-hébergées
- **Netlify** — hébergement, deploy previews par PR, cache headers, headers de sécurité

## Commandes

```bash
npm install
npm run dev              # Serveur de développement (HMR, sans SSG)
npm run build            # Build SSG + génération du sitemap
npm run lint             # ESLint
npm run preview          # Prévisualisation du build
npm run optimize-images  # Régénère public/images/ depuis src/assets/images/
```

## Structure principale

```
src/
├── App.tsx                  # Routes (RouteRecord[], pas de JSX <Routes>)
├── main.tsx                 # Point d'entrée SSG (ViteReactSSG)
├── pages/                   # Pages (Home, Cabinet, Equipe, Expertises, Contact…)
│   └── expertises/          # Pages de domaine (DroitCommercial, DroitSocietes…)
├── components/
│   └── layout/              # Header, Navbar, Footer, Layout — composants actifs
├── content/articles/        # Articles en Markdown avec frontmatter YAML
├── lib/schemas.ts           # Builders JSON-LD centralisés (SEO)
└── index.css                # Animations scroll + styles .article-body
scripts/
├── optimize-images.mjs      # Pipeline sharp → WebP multi-résolution + JPEG fallback
└── generate-sitemap.mjs     # Génère dist/sitemap.xml après le build
public/
├── images/                  # Images optimisées (générées par optimize-images)
├── fonts/                   # Polices auto-hébergées
├── _headers                 # Cache + headers de sécurité (format Netlify)
└── _redirects               # Fallback SPA
```

## Ajouter un article

1. Créer `src/content/articles/mon-slug.md` avec le frontmatter suivant :

```yaml
---
title: "Titre de l'article"
description: "Description courte (~155 caractères)"
date: 2026-01-15
domaine: droit-commercial   # droit-commercial | droit-societes | droit-numerique | droit-construction
slug: mon-slug
---
```

2. Le build détecte automatiquement le fichier et pré-rend la route `/articles/mon-slug`.

## Ajouter une image

1. Déposer le fichier source dans `src/assets/images/`.
2. Ajouter une entrée dans `SOURCES` dans `scripts/optimize-images.mjs`.
3. Lancer `npm run optimize-images` — génère les variantes dans `public/images/`.
4. Utiliser `<ResponsiveImage src="/images/nom-de-base" alt="..." />` dans les composants.

## Ajouter une route statique

Mettre à jour **les deux** fichiers suivants :
- `vite.config.ts` → tableau `includedRoutes` dans `ssgOptions`
- `scripts/generate-sitemap.mjs` → tableau `STATIC_ROUTES`
