import { useMeta } from '../hooks/useMeta';

interface SeoHeadProps {
  title: string;
  description?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  schema?: object;
}

export default function SeoHead({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  schema,
}: SeoHeadProps) {
  useMeta({ title, description, canonical, ogTitle, ogDescription, schema });
  return null;
}
