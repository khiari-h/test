import React from 'react';
import { render, screen } from '@testing-library/react';
import PartnerCard from '../../component/molecules/PartnersCard';
import Text from '../../component/atoms/Text';

// Mock du composant Text
jest.mock('../../component/atoms/Text', () => {
  return jest.fn(({ content, type, className }) => (
    <div data-testid="mock-text" data-type={type} className={className}>
      {content}
    </div>
  ));
});

describe('Composant PartnerCard', () => {
  // Définir les props de test de base
  const baseProps = {
    name: 'Nom du partenaire',
    logo: 'https://example.com/logo.png',
    link: 'https://example.com',
    description: 'Description du partenaire',
    className: 'custom-partner-class'
  };

  beforeEach(() => {
    // Réinitialiser le mock avant chaque test
    Text.mockClear();
  });

  // Test du rendu de base
  test('rend correctement avec toutes les props', () => {
    render(<PartnerCard {...baseProps} />);
    
    // Vérifie que le logo est rendu avec les attributs corrects
    const logoElement = screen.getByRole('img');
    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveAttribute('src', baseProps.logo);
    expect(logoElement).toHaveAttribute('alt', baseProps.name);
    expect(logoElement).toHaveClass('w-32');
    expect(logoElement).toHaveClass('h-32');
    expect(logoElement).toHaveClass('object-contain');
    
    // Vérifie que le composant Text est appelé deux fois (nom et description)
    expect(Text).toHaveBeenCalledTimes(2);
    
    // Vérifie l'appel pour le nom
    expect(Text).toHaveBeenCalledWith(
      expect.objectContaining({
        content: baseProps.name,
        type: 'h3',
        className: 'text-xl font-semibold h3-class'
      }),
      expect.anything()
    );
    
    // Vérifie l'appel pour la description
    expect(Text).toHaveBeenCalledWith(
      expect.objectContaining({
        content: baseProps.description,
        type: 'p',
        className: 'mt-2 p-class'
      }),
      expect.anything()
    );
    
    // Vérifie que le lien est rendu avec les attributs corrects
    const linkElement = screen.getByText('Visiter le site');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', baseProps.link);
    expect(linkElement).toHaveAttribute('target', '_blank');
    expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
    expect(linkElement).toHaveClass('text-pure-blue');
    expect(linkElement).toHaveClass('hover:text-pure-blue');
  });

  // Test du logo manquant (utilisation de l'image placeholder)
  test('utilise l\'image placeholder quand aucun logo n\'est fourni', () => {
    const propsWithoutLogo = { ...baseProps, logo: null };
    render(<PartnerCard {...propsWithoutLogo} />);
    
    // Vérifie que l'image placeholder est utilisée
    const logoElement = screen.getByRole('img');
    expect(logoElement).toHaveAttribute('src', '/Noimage.jpg');
  });

  // Test des classes CSS
  test('applique les classes CSS de base et personnalisées', () => {
    render(<PartnerCard {...baseProps} />);
    
    // Trouve le div principal et vérifie qu'il a les bonnes classes
    const cardElement = screen.getByText('Visiter le site').closest('div');
    
    // Vérifie les classes CSS de base
    expect(cardElement).toHaveClass('partner-card');
    expect(cardElement).toHaveClass('bg-white');
    expect(cardElement).toHaveClass('rounded-lg');
    expect(cardElement).toHaveClass('shadow-lg');
    expect(cardElement).toHaveClass('overflow-hidden');
    expect(cardElement).toHaveClass('hover:shadow-2xl');
    expect(cardElement).toHaveClass('transition-shadow');
    expect(cardElement).toHaveClass('p-6');
    expect(cardElement).toHaveClass('text-center');
    
    // Vérifie la classe personnalisée
    expect(cardElement).toHaveClass(baseProps.className);
  });

  // Test avec classe personnalisée par défaut (vide)
  test('fonctionne avec la classe personnalisée par défaut (vide)', () => {
    const propsWithoutClassName = {
      name: baseProps.name,
      logo: baseProps.logo,
      link: baseProps.link,
      description: baseProps.description
    };
    
    render(<PartnerCard {...propsWithoutClassName} />);
    
    // Trouve le div principal
    const cardElement = screen.getByText('Visiter le site').closest('div');
    
    // Vérifie que les classes de base sont toujours présentes
    expect(cardElement).toHaveClass('partner-card');
    expect(cardElement).toHaveClass('bg-white');
    expect(cardElement).toHaveClass('rounded-lg');
  });

  // Test des éléments responsives du logo
  test('le logo a les bonnes classes pour le responsive', () => {
    render(<PartnerCard {...baseProps} />);
    
    const logoElement = screen.getByRole('img');
    expect(logoElement).toHaveClass('w-32');
    expect(logoElement).toHaveClass('h-32');
    expect(logoElement).toHaveClass('object-contain');
    expect(logoElement).toHaveAttribute('loading', 'lazy');
  });

  // Test avec un nom, une description, un logo et un lien différents
  test('affiche correctement différentes informations', () => {
    const differentProps = {
      name: 'Autre partenaire',
      logo: 'https://example.com/other-logo.png',
      link: 'https://other-example.com',
      description: 'Autre description'
    };
    
    render(<PartnerCard {...differentProps} />);
    
    // Vérifie le nom
    expect(Text).toHaveBeenCalledWith(
      expect.objectContaining({
        content: differentProps.name,
        type: 'h3'
      }),
      expect.anything()
    );
    
    // Vérifie la description
    expect(Text).toHaveBeenCalledWith(
      expect.objectContaining({
        content: differentProps.description,
        type: 'p'
      }),
      expect.anything()
    );
    
    // Vérifie le logo
    const logoElement = screen.getByRole('img');
    expect(logoElement).toHaveAttribute('src', differentProps.logo);
    expect(logoElement).toHaveAttribute('alt', differentProps.name);
    
    // Vérifie le lien
    const linkElement = screen.getByText('Visiter le site');
    expect(linkElement).toHaveAttribute('href', differentProps.link);
  });

  // Test des attributs d'accessibilité et de sécurité
  test('a les bons attributs d\'accessibilité et de sécurité', () => {
    render(<PartnerCard {...baseProps} />);
    
    const logoElement = screen.getByRole('img');
    expect(logoElement).toHaveAttribute('alt', baseProps.name);
    
    const linkElement = screen.getByText('Visiter le site');
    expect(linkElement).toHaveAttribute('target', '_blank');
    expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
  });


  // Test de la structure du composant
  test('a une structure correcte avec un conteneur flex', () => {
    render(<PartnerCard {...baseProps} />);
    
    // Vérifie que le logo est dans un conteneur flex
    const logoContainer = screen.getByRole('img').parentElement;
    expect(logoContainer).toHaveClass('flex');
    expect(logoContainer).toHaveClass('justify-center');
    expect(logoContainer).toHaveClass('mb-4');
  });
});