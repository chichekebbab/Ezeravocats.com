import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SeoHead from '../components/SeoHead';

export default function NotFound() {
  return (
    <>
      <SeoHead
        title="Page introuvable | Ezer Avocats"
        description="La page que vous cherchez n'existe pas ou a été déplacée."
        canonical="/404"
      />
      <section className="min-h-[70vh] flex items-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <p className="text-sm tracking-[0.2em] uppercase text-gray-400 mb-6">
            Erreur 404
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-light text-gray-900 leading-tight mb-6">
            Cette page n'existe pas.
          </h1>
          <p className="text-lg text-gray-600 font-light leading-relaxed max-w-xl mb-12">
            Le lien que vous avez suivi est peut-être obsolète, ou la page a été
            déplacée. Vous pouvez revenir à l'accueil ou consulter directement les
            sections du cabinet.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm tracking-wider font-light text-white bg-gray-900 hover:bg-gray-700 transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Retour à l'accueil
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm tracking-wider font-light text-gray-900 border border-gray-300 hover:border-gray-900 transition-colors duration-200"
            >
              Nous contacter
            </Link>
          </div>

          <nav aria-label="Liens utiles" className="mt-16 pt-8 border-t border-gray-100">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">
              Liens utiles
            </p>
            <ul className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-gray-600">
              <li>
                <Link to="/cabinet" className="hover:text-gray-900 transition-colors">
                  Le Cabinet
                </Link>
              </li>
              <li>
                <Link to="/equipe" className="hover:text-gray-900 transition-colors">
                  Qui sommes-nous
                </Link>
              </li>
              <li>
                <Link to="/expertises" className="hover:text-gray-900 transition-colors">
                  Expertises
                </Link>
              </li>
              <li>
                <Link to="/articles" className="hover:text-gray-900 transition-colors">
                  Articles
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    </>
  );
}
