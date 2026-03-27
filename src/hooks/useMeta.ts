import { useEffect } from 'react';

interface MetaOptions {
  title: string;
  description?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  schema?: object;
}

const BASE_TITLE = 'Ezer Avocats';
const BASE_URL = 'https://www.ezeravocats.com';

export function useMeta({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  schema,
}: MetaOptions) {
  useEffect(() => {
    const fullTitle = title === BASE_TITLE ? title : `${title} | ${BASE_TITLE}`;

    // Title
    document.title = fullTitle;

    // Helper to upsert a meta tag
    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement('meta');
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    if (description) {
      setMeta('meta[name="description"]', 'content', description);
      setMeta('meta[property="og:description"]', 'content', ogDescription ?? description);
    }

    setMeta('meta[property="og:title"]', 'content', ogTitle ?? fullTitle);

    // Canonical
    const canonicalUrl = canonical
      ? `${BASE_URL}${canonical}`
      : `${BASE_URL}${window.location.pathname}`;
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = canonicalUrl;

    // Schema.org JSON-LD
    const schemaId = 'schema-jsonld';
    let schemaEl = document.getElementById(schemaId);
    if (schema) {
      if (!schemaEl) {
        schemaEl = document.createElement('script');
        schemaEl.id = schemaId;
        (schemaEl as HTMLScriptElement).type = 'application/ld+json';
        document.head.appendChild(schemaEl);
      }
      schemaEl.textContent = JSON.stringify(schema);
    } else if (schemaEl) {
      schemaEl.remove();
    }

    // Cleanup on unmount
    return () => {
      document.title = BASE_TITLE;
    };
  }, [title, description, canonical, ogTitle, ogDescription, schema]);
}
