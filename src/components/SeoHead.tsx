import { Head } from 'vite-react-ssg';

interface SeoHeadProps {
  title: string;
  description?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  noindex?: boolean;
  schema?: object | object[];
  /**
   * Base path of a ResponsiveImage to preload as the LCP image (e.g. "/images/homepage").
   * Emits a <link rel="preload" as="image"> with srcset matching the 400/800/1600 widths.
   */
  preloadImage?: string;
}

const BASE_TITLE = 'Ezer Avocats';
const BASE_URL = 'https://www.ezeravocats.com';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-default.jpg`;

export default function SeoHead({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  noindex,
  schema,
  preloadImage,
}: SeoHeadProps) {
  const fullTitle = title === BASE_TITLE ? title : `${title} | ${BASE_TITLE}`;
  const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : undefined;
  const finalOgTitle = ogTitle ?? fullTitle;
  const finalOgDescription = ogDescription ?? description;
  const finalOgImage = ogImage ?? DEFAULT_OG_IMAGE;
  const schemas = schema ? (Array.isArray(schema) ? schema : [schema]) : [];

  return (
    <Head>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow'} />

      <meta property="og:locale" content="fr_FR" />
      <meta property="og:title" content={finalOgTitle} />
      {finalOgDescription && <meta property="og:description" content={finalOgDescription} />}
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:image" content={finalOgImage} />
      <meta name="twitter:title" content={finalOgTitle} />
      {finalOgDescription && <meta name="twitter:description" content={finalOgDescription} />}
      <meta name="twitter:image" content={finalOgImage} />

      {preloadImage && (
        <link
          rel="preload"
          as="image"
          href={`${preloadImage}-800.webp`}
          // @ts-ignore - lowercase HTML attribute names for image preload
          imagesrcset={`${preloadImage}-400.webp 400w, ${preloadImage}-800.webp 800w, ${preloadImage}-1600.webp 1600w`}
          // @ts-ignore
          imagesizes="100vw"
          type="image/webp"
          // @ts-ignore - fetchpriority lowercase is the correct HTML attribute
          fetchpriority="high"
        />
      )}

      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Head>
  );
}
