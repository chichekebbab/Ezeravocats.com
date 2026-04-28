import React, { useEffect, useRef, useState } from 'react';
import { Calendar } from 'lucide-react';

interface ZcalEmbedProps {
  src: string;
  height?: number;
  title?: string;
}

/**
 * Iframe avec skeleton de chargement (évite un trou blanc de 800px en mobile
 * pendant que zcal charge).
 *
 * - L'iframe est chargée au scroll (IntersectionObserver) plutôt que par
 *   loading="lazy" qui ne déclenche pas toujours.
 * - Le skeleton montre une silhouette de calendrier pendant le fetch.
 */
export default function ZcalEmbed({
  src,
  height = 800,
  title = 'Prendre rendez-vous',
}: ZcalEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const node = containerRef.current;
    if (!node) return;

    // Si IntersectionObserver n'est pas dispo (vieux navigateurs), on charge direct
    if (typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }, // Précharge 200px avant que ce soit visible
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-gray-50 overflow-hidden"
      style={{ minHeight: height }}
    >
      {/* Skeleton — visible jusqu'à ce que l'iframe ait chargé */}
      {!isLoaded && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          aria-hidden="true"
        >
          <Calendar className="h-10 w-10 text-gray-300 mb-4 animate-pulse" />
          <p className="text-sm text-gray-400 font-light tracking-wide">
            Chargement du calendrier…
          </p>
        </div>
      )}

      {shouldLoad && (
        <iframe
          src={src}
          title={title}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          style={{
            border: 'none',
            minWidth: '320px',
            height,
            width: '100%',
            display: 'block',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        />
      )}
    </div>
  );
}
