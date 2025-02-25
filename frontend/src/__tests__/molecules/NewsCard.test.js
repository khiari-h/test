import React from 'react';
import { render, screen } from '@testing-library/react';
import NewsCard from '../../component/molecules/NewsCard';
import Text from '../../component/atoms/Text';

// Mock du composant Text
jest.mock('../../component/atoms/Text', () => {
  return jest.fn(({ content, type, className }) => (
    <div data-testid="mock-text" data-type={type} className={className}>
      {content}
    </div>
  ));
});

describe('Composant NewsCard', () => {
  const baseProps = {
    title: 'Titre de l\'actualité',
    description: 'Description de l\'actualité',
    className: 'custom-news-class'
  };

  beforeEach(() => {
    // Réinitialiser le mock avant chaque test
    Text.mockClear();
  });

  // Test du rendu de base
  test('rend correctement avec toutes les props', () => {
    render(<NewsCard {...baseProps} />);
    
    // Vérifie que le composant Text est appelé deux fois (titre et description)
    expect(Text).toHaveBeenCalledTimes(2);
    
    // Vérifie le titre
    expect(Text).toHaveBeenCalledWith(
      expect.objectContaining({
        content: baseProps.title,
        type: 'h3',
        className: 'mb-2 h3-class'
      }),
      expect.anything()
    );
    
    // Vérifie la description
    expect(Text).toHaveBeenCalledWith(
      expect.objectContaining({
        content: baseProps.description,
        type: 'p',
        className: 'mb-4 p-class'
      }),
      expect.anything()
    );
  });

  // Test avec un titre et une description différents
  test('affiche correctement différents titres et descriptions', () => {
    const differentProps = {
      title: 'Nouveau titre',
      description: 'Nouvelle description'
    };
    
    render(<NewsCard {...differentProps} />);
    
    // Vérifie le titre
    expect(Text).toHaveBeenCalledWith(
      expect.objectContaining({
        content: differentProps.title,
        type: 'h3',
        className: 'mb-2 h3-class'
      }),
      expect.anything()
    );
    
    // Vérifie la description
    expect(Text).toHaveBeenCalledWith(
      expect.objectContaining({
        content: differentProps.description,
        type: 'p',
        className: 'mb-4 p-class'
      }),
      expect.anything()
    );
  });

  // Test avec une description longue
  test('gère correctement une description longue', () => {
    const longDescription = 'a'.repeat(500); // Description de 500 caractères
    render(<NewsCard title={baseProps.title} description={longDescription} />);
    
    // Vérifie que la description longue est passée correctement
    expect(Text).toHaveBeenCalledWith(
      expect.objectContaining({
        content: longDescription,
        type: 'p',
        className: 'mb-4 p-class'
      }),
      expect.anything()
    );
  });
});
