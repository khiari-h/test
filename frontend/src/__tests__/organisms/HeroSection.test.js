import React from 'react';
import { render, screen } from '@testing-library/react';
import HeroSection from '../../component/organisms/HeroSection';
import Text from '../../component/atoms/Text';
import Button from '../../component/atoms/Button';

// Mocks
jest.mock('../../component/atoms/Text', () => {
  return jest.fn(({ content, type, className }) => (
    <div data-testid="mock-text" data-type={type} className={className}>
      {content}
    </div>
  ));
});

jest.mock('../../component/atoms/Button', () => {
  return jest.fn(({ label, href, className }) => (
    <a 
      data-testid="mock-button" 
      href={href} 
      className={className}
    >
      {label}
    </a>
  ));
});

describe('Composant HeroSection', () => {
  beforeEach(() => {
    // Réinitialisation des mocks
    Text.mockClear();
    Button.mockClear();
  });

  // Test de rendu de base
  test('rend correctement avec le titre, sous-titre et bouton', () => {
    render(<HeroSection />);
    
    // Vérifie que Text est appelé deux fois (titre et sous-titre)
    expect(Text).toHaveBeenCalledTimes(2);
    
    // Vérifie l'appel pour le titre
    expect(Text).toHaveBeenCalledWith(
      expect.objectContaining({
        content: 'Bienvenue au Festival Nation Sounds',
        type: 'h1',
        className: expect.stringContaining('text-3xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg font-concert-title')
      }),
      expect.anything()
    );
    
    // Vérifie l'appel pour le sous-titre
    expect(Text).toHaveBeenCalledWith(
      expect.objectContaining({
        content: 'Rejoignez-nous pour une expérience inoubliable',
        type: 'p',
        className: expect.stringContaining('text-lg md:text-2xl mb-8 text-white drop-shadow-lg font-concert-body')
      }),
      expect.anything()
    );
    
    // Vérifie l'appel pour le bouton
    expect(Button).toHaveBeenCalledWith(
      expect.objectContaining({
        label: 'Acheter des billets',
        href: 'https://www.site-de-billetterie.com',
        className: 'bg-concert-accent text-white hover:bg-white hover:text-concert-accent'
      }),
      expect.anything()
    );
  });

  // Test des attributs d'accessibilité
  test('a les attributs d\'accessibilité appropriés', () => {
    render(<HeroSection />);
    
    // Vérifie l'attribut aria-label sur la section
    const sectionElement = screen.getByRole('region');
    expect(sectionElement).toHaveAttribute(
      'aria-label', 
      "Hero section avec un message de bienvenue et un appel à l'action pour acheter des billets"
    );
  });

  // Test des classes CSS responsives
  test('applique les classes CSS responsives correctement', () => {
    render(<HeroSection />);
    
    // Vérifie les classes responsives sur la section
    const sectionElement = screen.getByRole('region');
    expect(sectionElement).toHaveClass('h-screen');
    expect(sectionElement).toHaveClass('md:h-2/3-screen');
    expect(sectionElement).toHaveClass('lg:h-3/4-screen');
    
    // Vérifie que Text est appelé avec des classes responsives pour le titre
    expect(Text).toHaveBeenCalledWith(
      expect.objectContaining({
        content: 'Bienvenue au Festival Nation Sounds',
        className: expect.stringContaining('text-3xl md:text-5xl')
      }),
      expect.anything()
    );
    
    // Vérifie que Text est appelé avec des classes responsives pour le sous-titre
    expect(Text).toHaveBeenCalledWith(
      expect.objectContaining({
        content: 'Rejoignez-nous pour une expérience inoubliable',
        className: expect.stringContaining('text-lg md:text-2xl')
      }),
      expect.anything()
    );
  });

  // Test des classes CSS pour l'arrière-plan
  test('applique les classes CSS pour l\'arrière-plan et l\'overlay', () => {
    render(<HeroSection />);
    
    // Vérifie les classes d'arrière-plan sur la section
    const sectionElement = screen.getByRole('region');
    expect(sectionElement).toHaveClass('bg-cover');
    expect(sectionElement).toHaveClass('bg-center');
    expect(sectionElement).toHaveClass('bg-hero-pattern');
    
    // Vérifie l'existence de l'overlay
    const overlayElement = sectionElement.firstChild;
    expect(overlayElement).toHaveClass('absolute');
    expect(overlayElement).toHaveClass('inset-0');
    expect(overlayElement).toHaveClass('bg-black');
    expect(overlayElement).toHaveClass('opacity-30');
  });

  // Test de la structure du conteneur de contenu

  // Test de l'appel à l'action (CTA)
  test('le bouton CTA a les bonnes propriétés', () => {
    render(<HeroSection />);
    
    // Vérifie les propriétés du bouton CTA
    expect(Button).toHaveBeenCalledWith(
      expect.objectContaining({
        label: 'Acheter des billets',
        href: 'https://www.site-de-billetterie.com'
      }),
      expect.anything()
    );
  });

  // Test des styles de texte
  test('applique les styles de texte appropriés', () => {
    render(<HeroSection />);
    
    // Vérifie les styles pour le titre
    expect(Text).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'h1',
        className: expect.stringContaining('font-bold')
      }),
      expect.anything()
    );
    
    // Vérifie les effets de style pour tous les textes
    expect(Text).toHaveBeenCalledWith(
      expect.objectContaining({
        className: expect.stringContaining('text-white')
      }),
      expect.anything()
    );
    
    expect(Text).toHaveBeenCalledWith(
      expect.objectContaining({
        className: expect.stringContaining('drop-shadow-lg')
      }),
      expect.anything()
    );
  });

  // Test des classes de mise en page
  test('utilise des classes flexbox pour le centrage', () => {
    render(<HeroSection />);
    
    const sectionElement = screen.getByRole('region');
    expect(sectionElement).toHaveClass('flex');
    expect(sectionElement).toHaveClass('items-center');
    expect(sectionElement).toHaveClass('justify-center');
  });
});