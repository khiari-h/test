import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../../component/organisms/Header';
import NavItem from '../../component/molecules/NavItem';
import Image from '../../component/atoms/Image';

// Mocks
jest.mock('../../component/molecules/NavItem', () => {
  return jest.fn(({ label, href, className }) => (
    <a 
      href={href} 
      className={className} 
      data-testid="mock-nav-item"
      data-label={label}
    >
      {label}
    </a>
  ));
});

jest.mock('../../component/atoms/Image', () => {
  return jest.fn(({ src, alt, className }) => (
    <img 
      src={src} 
      alt={alt} 
      className={className} 
      data-testid="mock-image" 
    />
  ));
});

describe('Composant Header', () => {
  beforeEach(() => {
    // Réinitialisation des mocks
    NavItem.mockClear();
    Image.mockClear();
    
    // Mock de process.env.PUBLIC_URL
    process.env.PUBLIC_URL = '/public';
  });

  // Test de rendu de base
  test('rend correctement avec le logo et les liens de navigation', () => {
    render(<Header />);
    
    // Vérifie que le logo est rendu
    expect(Image).toHaveBeenCalledWith(
      expect.objectContaining({
        src: '/public/logo.png',
        alt: 'Festival Logo',
        className: 'h-12 w-auto'
      }),
      expect.anything()
    );
    
    // Vérifie que les liens de navigation pour desktop sont rendus
    expect(NavItem).toHaveBeenCalledTimes(5);
    
    // Vérifie les appels pour chaque lien
    expect(NavItem).toHaveBeenCalledWith(
      expect.objectContaining({ label: 'Accueil', href: '/' }),
      expect.anything()
    );
    
    expect(NavItem).toHaveBeenCalledWith(
      expect.objectContaining({ label: 'Actualités', href: '/news' }),
      expect.anything()
    );
    
    expect(NavItem).toHaveBeenCalledWith(
      expect.objectContaining({ label: 'Concerts', href: '/concerts' }),
      expect.anything()
    );
    
    expect(NavItem).toHaveBeenCalledWith(
      expect.objectContaining({ label: 'Programmation', href: '/programmation' }),
      expect.anything()
    );
    
    expect(NavItem).toHaveBeenCalledWith(
      expect.objectContaining({ label: 'Partenaires', href: '/partenaires' }),
      expect.anything()
    );
  });

  // Test du menu mobile fermé par défaut
  test('le menu mobile est fermé par défaut', () => {
    render(<Header />);
    
    // Vérifie que le bouton de menu mobile est affiché
    const menuButton = screen.getByRole('button');
    expect(menuButton).toBeInTheDocument();
    
    // Vérifie que l'attribut aria-expanded est à false
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    
    // Vérifie que le menu mobile n'est pas affiché
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  // Test d'ouverture du menu mobile
  test('ouvre le menu mobile lorsqu\'on clique sur le bouton', () => {
    render(<Header />);
    
    // Clique sur le bouton de menu mobile
    const menuButton = screen.getByRole('button');
    fireEvent.click(menuButton);
    
    // Vérifie que l'attribut aria-expanded est à true
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    
    // Vérifie que le menu mobile est affiché
    const mobileMenu = screen.getByRole('menu');
    expect(mobileMenu).toBeInTheDocument();
    
    // Vérifie que tous les liens de navigation sont présents dans le menu mobile
    const mobileNavItems = screen.getAllByTestId('mock-nav-item');
    expect(mobileNavItems.length).toBeGreaterThanOrEqual(5);
    
    // Vérifie les attributs du menu mobile
    expect(mobileMenu).toHaveAttribute('id', 'mobile-menu');
    expect(mobileMenu).toHaveAttribute('aria-orientation', 'vertical');
    expect(mobileMenu).toHaveAttribute('aria-labelledby', 'mobile-menu-button');
  });

  // Test de fermeture du menu mobile
  test('ferme le menu mobile lorsqu\'on clique à nouveau sur le bouton', () => {
    render(<Header />);
    
    // Clique sur le bouton de menu mobile pour l'ouvrir
    const menuButton = screen.getByRole('button');
    fireEvent.click(menuButton);
    
    // Vérifie que le menu est ouvert
    expect(screen.getByRole('menu')).toBeInTheDocument();
    
    // Clique à nouveau sur le bouton pour fermer le menu
    fireEvent.click(menuButton);
    
    // Vérifie que l'attribut aria-expanded est à false
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    
    // Vérifie que le menu mobile n'est plus affiché
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  // Test des classes CSS pour la version mobile
  test('applique les bonnes classes CSS pour la version mobile', () => {
    render(<Header />);
    
    // Clique sur le bouton de menu mobile pour l'ouvrir
    fireEvent.click(screen.getByRole('button'));
    
    // Vérifie que le menu mobile a les bonnes classes
    const mobileMenu = screen.getByRole('menu');
    expect(mobileMenu).toHaveClass('md:hidden');
    expect(mobileMenu).toHaveClass('absolute');
    expect(mobileMenu).toHaveClass('top-full');
    expect(mobileMenu).toHaveClass('left-0');
    expect(mobileMenu).toHaveClass('right-0');
    expect(mobileMenu).toHaveClass('bg-gradient-to-r');
    expect(mobileMenu).toHaveClass('from-purple-500');
    expect(mobileMenu).toHaveClass('via-pink-500');
    expect(mobileMenu).toHaveClass('to-red-500');
    
    // Vérifie que la navigation mobile a les bonnes classes
    const mobileNav = mobileMenu.querySelector('nav');
    expect(mobileNav).toHaveClass('flex');
    expect(mobileNav).toHaveClass('flex-col');
    expect(mobileNav).toHaveClass('items-center');
    expect(mobileNav).toHaveClass('space-y-4');
  });

  // Test des classes CSS pour la version desktop
  test('applique les bonnes classes CSS pour la version desktop', () => {
    render(<Header />);
    
    // Vérifie que la navigation desktop a les bonnes classes
    const desktopNav = screen.getByRole('navigation');
    expect(desktopNav).toHaveClass('hidden');
    expect(desktopNav).toHaveClass('md:flex');
    expect(desktopNav).toHaveClass('md:items-center');
    expect(desktopNav).toHaveClass('md:space-x-4');
  });

  // Test de l'icône du bouton de menu
  test('change l\'icône du bouton de menu selon l\'état', () => {
    render(<Header />);
    
    const menuButton = screen.getByRole('button');
    
    // Vérifie l'icône initiale (menu fermé)
    const initialPathElement = menuButton.querySelector('path');
    expect(initialPathElement).toHaveAttribute('d', 'M4 6h16M4 12h16M4 18h16');
    
    // Clique sur le bouton pour ouvrir le menu
    fireEvent.click(menuButton);
    
    // Vérifie que l'icône a changé (menu ouvert)
    const updatedPathElement = menuButton.querySelector('path');
    expect(updatedPathElement).toHaveAttribute('d', 'M6 18L18 6M6 6l12 12');
  });

  // Test des styles du header
  test('applique les styles de base pour le header', () => {
    render(<Header />);
    
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toHaveClass('bg-gradient-to-r');
    expect(headerElement).toHaveClass('from-purple-500');
    expect(headerElement).toHaveClass('via-pink-500');
    expect(headerElement).toHaveClass('to-red-500');
    expect(headerElement).toHaveClass('text-white');
    expect(headerElement).toHaveClass('shadow-md');
    expect(headerElement).toHaveClass('relative');
  });

  // Test des NavItems dans la version mobile
  test('les NavItems dans la version mobile ont des classes spécifiques', () => {
    render(<Header />);
    
    // Ouvre le menu mobile
    fireEvent.click(screen.getByRole('button'));
    
    // Vérifie que les NavItems dans le menu mobile ont la classe 'text-lg' et 'font-semibold'
    expect(NavItem).toHaveBeenCalledWith(
      expect.objectContaining({ 
        label: 'Accueil', 
        href: '/', 
        className: 'text-lg font-semibold' 
      }),
      expect.anything()
    );
  });
});