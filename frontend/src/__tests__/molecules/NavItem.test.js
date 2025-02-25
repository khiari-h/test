import React from 'react';
import { render, screen } from '@testing-library/react';
import NavItem from '../../component/molecules/NavItem';

describe('Composant NavItem', () => {
  // Définir les props de test de base
  const baseProps = {
    label: 'Accueil',
    href: '/accueil',
    className: 'custom-nav-class'
  };

  // Test du rendu de base avec toutes les props
  test('rend correctement avec toutes les props', () => {
    render(<NavItem {...baseProps} />);
    
    // Vérifier que le lien est rendu avec le bon texte et attributs
    const linkElement = screen.getByText(baseProps.label);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.tagName).toBe('A');
    expect(linkElement).toHaveAttribute('href', baseProps.href);
  });

  // Test des classes CSS
  test('applique les classes CSS de base et personnalisées', () => {
    render(<NavItem {...baseProps} />);
    
    const linkElement = screen.getByText(baseProps.label);
    
    // Vérifier les classes CSS de base
    expect(linkElement).toHaveClass('font-concert-subtitle');
    expect(linkElement).toHaveClass('text-concert-text');
    expect(linkElement).toHaveClass('hover:text-custom-yellow-500');
    expect(linkElement).toHaveClass('transition');
    
    // Vérifier la classe personnalisée
    expect(linkElement).toHaveClass(baseProps.className);
  });

  // Test avec la classe personnalisée par défaut (vide)
  test('fonctionne avec la classe personnalisée par défaut (vide)', () => {
    const propsWithoutClassName = {
      label: baseProps.label,
      href: baseProps.href
    };
    
    render(<NavItem {...propsWithoutClassName} />);
    
    const linkElement = screen.getByText(baseProps.label);
    
    // Vérifier que les classes de base sont toujours présentes
    expect(linkElement).toHaveClass('font-concert-subtitle');
    expect(linkElement).toHaveClass('text-concert-text');
  });

  // Test avec un href différent
  test('applique correctement le href', () => {
    const differentHref = '/contact';
    render(<NavItem label={baseProps.label} href={differentHref} />);
    
    const linkElement = screen.getByText(baseProps.label);
    expect(linkElement).toHaveAttribute('href', differentHref);
  });

  // Test avec un label différent
  test('affiche correctement le label', () => {
    const differentLabel = 'Contact';
    render(<NavItem label={differentLabel} href={baseProps.href} />);
    
    expect(screen.getByText(differentLabel)).toBeInTheDocument();
    expect(screen.queryByText(baseProps.label)).not.toBeInTheDocument();
  });


  // Test avec un href vide
  test('fonctionne avec un href vide', () => {
    render(<NavItem label={baseProps.label} href="" />);
    
    const linkElement = screen.getByText(baseProps.label);
    expect(linkElement).toHaveAttribute('href', '');
  });

  // Test d'interactions (bien que le composant n'ait pas de comportement interactif particulier)
  test('a la structure HTML correcte', () => {
    render(<NavItem {...baseProps} />);
    
    const linkElement = screen.getByText(baseProps.label);
    
    // Vérifier que c'est un lien
    expect(linkElement.tagName).toBe('A');
    
    // Vérifier qu'il n'y a pas d'éléments enfants supplémentaires
    expect(linkElement.children.length).toBe(0);
    
    // Vérifier que le texte du lien est exactement le label
    expect(linkElement.textContent).toBe(baseProps.label);
  });
});