import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ResponsiveImage from './ResponsiveImage';
import ezerLogo from '../assets/images/Ezer Logo/Ezer Inverted Color Transparent bg (1).svg';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Only animate logo + CTA — h1/tagline are visible immediately for LCP
    const els = containerRef.current?.querySelectorAll('.hero-reveal');
    if (!els) return;

    if (prefersReducedMotion) {
      els.forEach((el) => el.classList.add('revealed'));
      return;
    }

    els.forEach((el, i) => {
      setTimeout(() => el.classList.add('revealed'), 200 + i * 200);
    });
  }, []);

  return (
    <section className="relative min-h-[calc(100dvh-5rem)] bg-primary overflow-hidden">
      <ResponsiveImage
        src="/images/homepage"
        alt=""
        priority
        sizes="100vw"
        width={1600}
        height={1067}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-slate-900/55"></div>
      <div ref={containerRef} className="relative min-h-[calc(100dvh-5rem)] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center py-8 md:py-12">
        <div className="max-w-3xl">
          <img
            src={ezerLogo}
            alt="Logo Ezer Avocats - Cabinet spécialisé en droit des affaires"
            // @ts-ignore - React expects lowercase HTML attributes
            fetchpriority="high"
            className="hero-reveal mb-6 md:mb-8 w-[200px] md:w-[280px]"
          />
          <p className="text-gray-300 text-xs md:text-sm mb-3 md:mb-4 tracking-[0.25em] uppercase">Rigueur. Stratégie. Conviction.</p>
          <h1 className="text-3xl md:text-6xl font-extralight text-white mb-6 md:mb-8 leading-tight">
            Cabinet d'avocats à Paris dédié au contentieux des affaires
          </h1>
          <Link
            to="/contact"
            className="hero-reveal inline-flex items-center px-8 py-4 text-sm tracking-wider font-light text-white border border-white hover:bg-white hover:text-primary transition-all duration-300"
          >
            PRENDRE RENDEZ-VOUS
            <ArrowRight className="ml-3 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
