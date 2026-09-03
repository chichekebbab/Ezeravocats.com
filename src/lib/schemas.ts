// Shared JSON-LD schema builders for SEO rich results.
// Reused across pages via the SeoHead component.

export const SITE_URL = 'https://www.ezeravocats.com';
const LOGO_URL = `${SITE_URL}/apple-touch-icon.png`;
const DEFAULT_OG = `${SITE_URL}/og-default.jpg`;

export const ORG_ID = `${SITE_URL}/#legalservice`;
export const FOUNDER_ID = `${SITE_URL}/equipe#myriam-douillet`;

export const legalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  '@id': ORG_ID,
  name: 'Ezer Avocats',
  url: SITE_URL,
  logo: LOGO_URL,
  image: DEFAULT_OG,
  description:
    "Cabinet d'avocats à Paris spécialisé en contentieux des affaires : droit commercial, droit des sociétés, droit du numérique, droit de la construction.",
  telephone: '+33144053290',
  email: 'myriam.douillet@ezeravocats.com',
  priceRange: '€€',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '15 rue de Lübeck',
    addressLocality: 'Paris',
    postalCode: '75116',
    addressRegion: 'Île-de-France',
    addressCountry: 'FR',
  },
  areaServed: { '@type': 'Country', name: 'France' },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '19:00',
    },
  ],
  sameAs: ['https://www.linkedin.com/in/myriam-douillet-2387b2100/'],
};

export const founderSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': FOUNDER_ID,
  name: 'Myriam Douillet Benaroch',
  givenName: 'Myriam',
  familyName: 'Douillet Benaroch',
  jobTitle: 'Avocate au Barreau de Paris',
  worksFor: { '@id': ORG_ID },
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'Université Paris I – Panthéon Sorbonne' },
    { '@type': 'CollegeOrUniversity', name: 'Université Paris V – Descartes' },
  ],
  url: `${SITE_URL}/equipe`,
  image: `${SITE_URL}/images/myriam-v2-800.webp`,
  sameAs: ['https://www.linkedin.com/in/myriam-douillet-2387b2100/'],
};

export function serviceSchema(opts: {
  name: string;
  description: string;
  slug: string;
  serviceType: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType,
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'Country', name: 'France' },
    url: `${SITE_URL}/expertises/${opts.slug}`,
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function articleSchema(opts: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified: string;
  section?: string | null;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    inLanguage: 'fr-FR',
    ...(opts.section ? { articleSection: opts.section } : {}),
    image: [DEFAULT_OG],
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    author: {
      '@type': 'Person',
      '@id': FOUNDER_ID,
      name: 'Myriam Douillet Benaroch',
      jobTitle: 'Avocate au Barreau de Paris',
      url: `${SITE_URL}/equipe`,
    },
    publisher: {
      '@type': 'LegalService',
      '@id': ORG_ID,
      name: 'Ezer Avocats',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: LOGO_URL },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/articles/${opts.slug}` },
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}
