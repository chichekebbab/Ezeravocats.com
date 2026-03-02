import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <Logo color="white" className="mb-6" />
            <p className="text-gray-400 font-light">
              Cabinet d'avocats spécialisé en droit des affaires, droit social et contentieux.
            </p>
          </div>
          
          <div>
            <h3 className="text-white text-sm tracking-wider mb-6">CONTACT</h3>
            <div className="space-y-4">
              <p className="flex items-center text-gray-400 font-light">
                <MapPin className="h-5 w-5 mr-3 text-white/50" />
                15 rue de Lübeck, 75116 Paris
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-white text-sm tracking-wider mb-6">HORAIRES</h3>
            <div className="flex items-start space-x-3 text-gray-400 font-light">
              <Clock className="h-5 w-5 text-white/50" />
              <div>
                <p>Lundi - Vendredi : 9h - 19h</p>
                <p className="mt-1">Sur rendez-vous uniquement</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/10 text-center">
          <p className="text-gray-500 font-light text-sm">
            © {new Date().getFullYear()} Ezer Avocats. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
