import React, { useState } from 'react';
import NavItem from '../molecules/NavItem';
import Image from '../atoms/Image';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white shadow-md relative">
      <div className="container mx-auto flex justify-between items-center py-4 px-4 sm:px-8 relative">
        <div className="flex items-center transform transition duration-500 hover:scale-110">
          <a href="/">
            <Image 
            src={`${process.env.PUBLIC_URL}/logo.png`} 
              alt="Festival Logo" 
              className="h-12 w-auto" 
            />
          </a>
        </div>
        <button
          className="block md:hidden"
          onClick={toggleMenu}
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
        {isOpen && (
          <div
            id="mobile-menu"
            className="md:hidden absolute top-full left-0 right-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 mt-2 py-4 shadow-lg z-10 w-full transition-transform transform duration-300 ease-in-out"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="mobile-menu-button"
          >
            <nav className="flex flex-col items-center space-y-4">
              <NavItem label="Accueil" href="/" className="text-lg font-semibold" />
              <NavItem label="Actualités" href="/news" className="text-lg font-semibold" />
              <NavItem label="Concerts" href="/concerts" className="text-lg font-semibold" />
              <NavItem label="Programmation" href="/programmation" className="text-lg font-semibold" />
              <NavItem label="Partenaires" href="/partenaires" className="text-lg font-semibold" />
            </nav>
          </div>
        )}
        <nav className="hidden md:flex md:items-center md:space-x-4">
          <NavItem label="Accueil" href="/" />
          <NavItem label="Actualités" href="/news" />
          <NavItem label="Concerts" href="/concerts" />
          <NavItem label="Programmation" href="/programmation" />
          <NavItem label="Partenaires" href="/partenaires" />
        </nav>
      </div>
    </header>
  );
};

export default Header;
