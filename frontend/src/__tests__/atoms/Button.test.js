import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Button from '../../component/atoms/Button';

describe('Composant Button', () => {
  
  // Test du rendu de base
  test('affiche correctement le label', () => {
    render(<Button label="Cliquer ici" />);
    expect(screen.getByText('Cliquer ici')).toBeInTheDocument();
  });

  // Test avec un label numérique
  test('accepte un nombre comme label', () => {
    render(<Button label={42} />);
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  // Test de la fonction onClick
  test('appelle la fonction onClick lorsqu\'il est cliqué', () => {
    const handleClick = jest.fn();
    render(<Button label="Cliquer ici" onClick={handleClick} />);
    
    fireEvent.click(screen.getByText('Cliquer ici'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Test du comportement par défaut sans onClick
  test('affiche un avertissement console quand cliqué sans gestionnaire onClick', () => {
    const originalWarn = console.warn;
    console.warn = jest.fn();
    
    render(<Button label="Sans onClick" />);
    fireEvent.click(screen.getByText('Sans onClick'));
    
    expect(console.warn).toHaveBeenCalledWith("Button cliqué sans gestionnaire onClick");
    console.warn = originalWarn;
  });

  // Test du rendu en tant que lien
  test('rendu en tant que lien lorsqu\'un href est fourni', () => {
    render(<Button label="Aller ici" href="https://exemple.com" />);
    
    const linkElement = screen.getByText('Aller ici');
    expect(linkElement.tagName).toBe('A');
    expect(linkElement).toHaveAttribute('href', 'https://exemple.com');
    expect(linkElement).toHaveAttribute('target', '_blank');
    expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
  });

  // Test quand href est une chaîne vide
  test('rendu en tant que bouton lorsque href est une chaîne vide', () => {
    render(<Button label="Bouton" href="" />);
    
    const buttonElement = screen.getByText('Bouton');
    expect(buttonElement.tagName).toBe('BUTTON');
  });

  // Test des classes CSS par défaut
  test('applique les classes par défaut correctement', () => {
    render(<Button label="Cliquer ici" />);
    
    const buttonElement = screen.getByText('Cliquer ici');
    expect(buttonElement).toHaveClass('bg-light-blue');
    expect(buttonElement).toHaveClass('text-white');
    expect(buttonElement).toHaveClass('hover:bg-white');
    expect(buttonElement).toHaveClass('hover:text-light-blue');
  });

  // Test des classes pour l'état sélectionné
  test('applique les classes pour l\'état sélectionné', () => {
    render(<Button label="Sélectionné" isSelected={true} />);
    
    const buttonElement = screen.getByText('Sélectionné');
    expect(buttonElement).toHaveClass('bg-light-blue');
    expect(buttonElement).not.toHaveClass('hover:bg-white');
  });

  // Test des classes CSS personnalisées
  test('applique les classes CSS personnalisées', () => {
    render(<Button label="Personnalisé" className="custom-class" />);
    
    const buttonElement = screen.getByText('Personnalisé');
    expect(buttonElement).toHaveClass('custom-class');
  });

  // Test d'accessibilité
  test('a un attribut aria-label qui correspond au label', () => {
    render(<Button label="Accessible" />);
    
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveAttribute('aria-label', 'Accessible');
  });
});