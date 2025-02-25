import React from 'react';
import { render, screen } from '@testing-library/react';
import Image from '../../component/atoms/Image';


describe('Composant Image', () => {
  
  // Test de rendu de base
  test('rend une image avec les attributs src et alt corrects', () => {
    const testSrc = 'https://example.com/image.jpg';
    const testAlt = 'Image de test';
    
    render(<Image src={testSrc} alt={testAlt} />);
    
    const imgElement = screen.getByAltText(testAlt);
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', testSrc);
  });
  
  // Test des classes CSS par défaut
  test('applique la classe object-contain par défaut', () => {
    render(<Image src="https://example.com/image.jpg" alt="Image de test" />);
    
    const imgElement = screen.getByAltText('Image de test');
    expect(imgElement).toHaveClass('object-contain');
  });
  
  // Test des classes CSS personnalisées
  test('applique la classe CSS personnalisée en plus de object-contain', () => {
    const customClass = 'rounded-lg w-full h-64';
    
    render(
      <Image 
        src="https://example.com/image.jpg" 
        alt="Image de test" 
        className={customClass} 
      />
    );
    
    const imgElement = screen.getByAltText('Image de test');
    expect(imgElement).toHaveClass('object-contain');
    expect(imgElement).toHaveClass('rounded-lg');
    expect(imgElement).toHaveClass('w-full');
    expect(imgElement).toHaveClass('h-64');
  });
  

  
  // Test de la syntaxe JSX
  test('rend un élément img valide', () => {
    render(<Image src="https://example.com/image.jpg" alt="Image de test" />);
    
    const imgElement = screen.getByAltText('Image de test');
    expect(imgElement.tagName).toBe('IMG');
  });
  
  // Test de traitement des espaces dans className
  
  // Test avec une classe vide
  test('fonctionne correctement avec une classe vide', () => {
    render(<Image src="https://example.com/image.jpg" alt="Image de test" className="" />);
    
    const imgElement = screen.getByAltText('Image de test');
    expect(imgElement).toHaveClass('object-contain');
    expect(imgElement.className).toBe('object-contain ');
  });
});