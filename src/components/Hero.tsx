import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import homepageImage from '../assets/images/homepage.jpg';
import ezerLogo from '../assets/images/Ezer Logo/Ezer Inverted Color Transparent bg (1).svg';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const els = containerRef.current?.querySelectorAll('.hero-reveal');
    if (!els) return;

    if (prefersReducedMotion) {
      els.forEach((el) => el.classList.add('revealed'));
      return;
    }

    els.forEach((el, i) => {
      setTimeout(() => el.classList.add('revealed'), 300 + i * 180);
    });
  }, []);

  return (
    <section className="relative h-screen bg-primary bg-cover bg-center" style={{ backgroundImage: `url(${homepageImage})` }}>
      <div className="absolute inset-0 bg-black/50"></div>
      <div ref={containerRef} className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-3xl">
          <img
            src={ezerLogo}
            alt="Logo Ezer Avocats - Cabinet spécialisé en droit des affaires"
            // @ts-ignore - React expects lowercase HTML attributes
            fetchpriority="high"
            className="hero-reveal mb-8 w-[280px]"
          />
          <p className="hero-reveal text-gray-300 text-xl mb-4 tracking-wider">VOS ENJEUX, NOTRE EXPERTISE</p>
          <h1 className="hero-reveal text-4xl md:text-6xl font-extralight text-white mb-8 leading-tight">
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
