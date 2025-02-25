import React from 'react';
import { render, screen } from '@testing-library/react';
import CTASection from '../../component/molecules/CTASection';
import Text from '../../component/atoms/Text';
import Button from '../../component/atoms/Button';


// Mock des composants enfants
jest.mock('../../component/atoms/Text', () => {
  return jest.fn(({ content, type, className }) => (
    <div data-testid="mock-text" data-type={type} className={className}>
      {content}
    </div>
  ));
});

jest.mock('../../component/atoms/Button', () => {
  return jest.fn(({ label, href, className }) => (
    <a data-testid="mock-button" href={href} className={className}>
      {label}
    </a>
  ));
});

describe('Composant CTASection', () => {
  // Données de test
  const testTitle = 'Titre CTA';
  const testCTAs = [
    {
      label: 'Premier CTA',
      href: '/premier-lien',
      className: 'custom-class-1'
    },
    {
      label: 'Second CTA',
      href: '/second-lien',
      className: 'custom-class-2'
    }
  ];
  const testCustomClass = 'section-custom-class';

  beforeEach(() => {
    // Réinitialiser les mocks avant chaque test
    Text.mockClear();
    Button.mockClear();
  });

  // Test de rendu de base
  test('rend correctement le titre et les boutons CTA', () => {
    render(
      <CTASection 
        title={testTitle} 
        ctas={testCTAs} 
        customClass={testCustomClass} 
      />
    );
    
    // Vérifie que le composant Text est appelé avec les bonnes props pour le titre
    expect(Text).toHaveBeenCalledWith(
      expect.objectContaining({
        content: testTitle,
        type: 'h1',
        className: 'mb-4'
      }),
      expect.anything()
    );
    
    // Vérifie que le composant Button est appelé pour chaque CTA
    expect(Button).toHaveBeenCalledTimes(2);
    
    // Vérifie le premier bouton
    expect(Button).toHaveBeenCalledWith(
      expect.objectContaining({
        label: testCTAs[0].label,
        href: testCTAs[0].href,
        className: testCTAs[0].className
      }),
      expect.anything()
    );
    
    // Vérifie le second bouton
    expect(Button).toHaveBeenCalledWith(
      expect.objectContaining({
        label: testCTAs[1].label,
        href: testCTAs[1].href,
        className: testCTAs[1].className
      }),
      expect.anything()
    );
  });

  // Test de la classe personnalisée
  test('applique la classe personnalisée à la section', () => {
    render(
      <CTASection 
        title={testTitle} 
        ctas={testCTAs} 
        customClass={testCustomClass} 
      />
    );
    
    // Trouve l'élément de section et vérifie qu'il a la classe personnalisée
    const sectionElement = screen.getByText(testTitle).closest('section');
    expect(sectionElement).toHaveClass(testCustomClass);
    expect(sectionElement).toHaveClass('bg-concert-bg-beige');
  });

  // Test avec une classe personnalisée par défaut
  test('fonctionne avec la classe personnalisée par défaut (vide)', () => {
    render(
      <CTASection 
        title={testTitle} 
        ctas={testCTAs}
      />
    );
    
    // Trouve l'élément de section
    const sectionElement = screen.getByText(testTitle).closest('section');
    
    // Vérifie que les classes de base sont toujours appliquées
    expect(sectionElement).toHaveClass('text-center');
    expect(sectionElement).toHaveClass('py-8');
    expect(sectionElement).toHaveClass('bg-concert-bg-beige');
  });

  // Test avec un seul CTA
  test('fonctionne avec un seul CTA', () => {
    const singleCTA = [testCTAs[0]];
    
    render(
      <CTASection 
        title={testTitle} 
        ctas={singleCTA}
      />
    );
    
    // Vérifie que le composant Button n'est appelé qu'une seule fois
    expect(Button).toHaveBeenCalledTimes(1);
    
    // Vérifie que le bouton a les bonnes props
    expect(Button).toHaveBeenCalledWith(
      expect.objectContaining({
        label: singleCTA[0].label,
        href: singleCTA[0].href,
        className: singleCTA[0].className
      }),
      expect.anything()
    );
  });

  // Test avec un tableau de CTA vide
  test('fonctionne avec un tableau de CTA vide', () => {
    render(
      <CTASection 
        title={testTitle} 
        ctas={[]}
      />
    );
    
    // Vérifie que le composant Button n'est pas appelé
    expect(Button).not.toHaveBeenCalled();
    
    // Vérifie que le titre est toujours affiché
    expect(Text).toHaveBeenCalledWith(
      expect.objectContaining({
        content: testTitle
      }),
      expect.anything()
    );
  });


});