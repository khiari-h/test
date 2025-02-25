import React from 'react';
import { render, screen } from '@testing-library/react';
import InfoCard from '../../component/molecules/InfoCard';
import Image from '../../component/atoms/Image';

// Mock du composant Image
jest.mock('../../component/atoms/Image', () => {
  return jest.fn(props => (
    <img
      src={props.src}
      alt={props.alt}
      className={props.className}
      srcSet={props.srcSet}
      sizes={props.sizes}
      loading={props.loading}
      data-testid="mock-image"
    />
  ));
});

describe('Composant InfoCard', () => {
  // Définir les props de test de base
  const baseProps = {
    title: 'Titre de la carte',
    description: 'Description de la carte',
    image: 'https://example.com/image.jpg',
    additionalInfo: 'Informations supplémentaires',
    type: 'schedule'
  };

  beforeEach(() => {
    // Réinitialiser le mock avant chaque test
    Image.mockClear();
  });

  // Test du rendu de base avec toutes les props
  test('rend correctement avec toutes les props', () => {
    render(<InfoCard {...baseProps} />);
    
    // Vérifie que l'image est rendue avec les bonnes props
    expect(Image).toHaveBeenCalledWith(
      expect.objectContaining({
        src: baseProps.image,
        alt: baseProps.title,
        className: 'w-full h-48 object-cover',
        srcSet: expect.stringContaining(baseProps.image),
        sizes: expect.any(String),
        loading: 'lazy'
      }),
      expect.anything()
    );
    
    // Vérifie que le titre, la description et les infos supplémentaires sont rendus
    expect(screen.getByText(baseProps.title)).toBeInTheDocument();
    expect(screen.getByText(baseProps.description)).toBeInTheDocument();
    expect(screen.getByText(baseProps.additionalInfo)).toBeInTheDocument();
  });

  // Test avec image manquante (utilisation de l'image placeholder)
  test('utilise l\'image placeholder quand aucune image n\'est fournie', () => {
    const propsWithoutImage = { ...baseProps, image: null };
    render(<InfoCard {...propsWithoutImage} />);
    
    // Vérifie que l'image placeholder est utilisée
    expect(Image).toHaveBeenCalledWith(
      expect.objectContaining({
        src: '/Noimage.jpg',
        alt: baseProps.title
      }),
      expect.anything()
    );
  });

  // Test sans informations supplémentaires
  test('rend correctement sans informations supplémentaires', () => {
    const propsWithoutAdditionalInfo = { 
      ...baseProps, 
      additionalInfo: null 
    };
    
    render(<InfoCard {...propsWithoutAdditionalInfo} />);
    
    // Vérifie que le titre et la description sont rendus
    expect(screen.getByText(baseProps.title)).toBeInTheDocument();
    expect(screen.getByText(baseProps.description)).toBeInTheDocument();
    
    // Vérifie que les informations supplémentaires ne sont pas rendues
    expect(screen.queryByText('Informations supplémentaires')).not.toBeInTheDocument();
  });


  // Test de génération de srcSet
  test('génère correctement le srcSet pour les images responsives', () => {
    render(<InfoCard {...baseProps} />);
    
    // Vérifie que le srcSet contient les dimensions pour le responsive
    expect(Image).toHaveBeenCalledWith(
      expect.objectContaining({
        srcSet: expect.stringContaining('?w=400 400w'),
        srcSet: expect.stringContaining('?w=800 800w'),
        srcSet: expect.stringContaining('?w=1200 1200w')
      }),
      expect.anything()
    );
  });



});