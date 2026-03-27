import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../Logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'Expertises', href: '/expertises' },
    { name: 'Le Cabinet', href: '/cabinet' },
    { name: 'Qui sommes-nous ?', href: '/equipe' },
    { name: 'Articles', href: '/articles' },
    { name: 'Contact', href: '/contact' },
    { name: 'Prendre Rendez-vous', href: 'https://zcal.co/myriambenaroch/premiercontact' },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-28">
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navigation.slice(0, -1).map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`whitespace-nowrap ${
                  (location.pathname.startsWith(item.href) && item.href !== '/') || location.pathname === item.href
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-500 hover:text-primary'
                } px-2 py-2 text-base font-medium transition-colors duration-200`}
              >
                {item.name}
              </Link>
            ))}
            <a
              href={navigation[navigation.length - 1].href}
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap ml-2 px-5 py-2.5 bg-[rgb(113,145,170)] text-white text-base font-semibold rounded-md hover:bg-[rgb(113,145,170)]/90 transition-colors duration-200"
            >
              {navigation[navigation.length - 1].name}
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-primary"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50" 
            onClick={() => setIsOpen(false)}
          />
          {/* Menu */}
          <div className="relative bg-white px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              item.name === 'Prendre Rendez-vous' ? (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-primary hover:bg-primary/5 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    (location.pathname.startsWith(item.href) && item.href !== '/') || location.pathname === item.href
                      ? 'text-primary bg-primary/5'
                      : 'text-gray-500 hover:text-primary hover:bg-primary/5'
                  } block px-3 py-2 rounded-md text-base font-medium`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
