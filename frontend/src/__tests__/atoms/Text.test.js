import React from 'react';
import { render, screen } from '@testing-library/react';
import Text from '../../component/atoms/Text';

describe('Composant Text', () => {
  
  // Test de rendu de base
  test('rend le contenu textuel correctement', () => {
    const testContent = 'Contenu de test';
    render(<Text content={testContent} type="p" />);
    
    expect(screen.getByText(testContent)).toBeInTheDocument();
  });
  
  // Test des différents types de balises
  test.each([
    ['h1', 'Titre principal'], 
    ['h2', 'Sous-titre'], 
    ['h3', 'Titre de section'], 
    ['p', 'Paragraphe'], 
    ['a', 'Lien']
  ])('rend correctement un élément %s', (type, content) => {
    render(<Text content={content} type={type} />);
    
    const element = screen.getByText(content);
    expect(element.tagName.toLowerCase()).toBe(type);
  });
  
  // Test des classes CSS de base pour chaque type
  test.each([
    ['h1', 'font-concert-title text-black text-2xl font-bold'],
    ['h2', 'font-concert-subtitle text-black text-xl font-bold'],
    ['h3', 'font-concert-subtitle text-black text-lg font-bold'],
    ['p', 'font-concert-description text-black'],
    ['a', 'text-royal-blue hover:text-black']
  ])('applique les classes de base pour le type %s', (type, expectedClasses) => {
    render(<Text content={`Test ${type}`} type={type} />);
    
    const element = screen.getByText(`Test ${type}`);
    
    // Divise les classes attendues et vérifie chacune individuellement
    expectedClasses.split(' ').forEach(className => {
      expect(element).toHaveClass(className);
    });
  });
  
  // Test des classes CSS personnalisées
  test('applique les classes CSS personnalisées', () => {
    const customClass = 'text-center my-4';
    render(
      <Text 
        content="Texte personnalisé" 
        type="p" 
        className={customClass} 
      />
    );
    
    const element = screen.getByText('Texte personnalisé');
    expect(element).toHaveClass('text-center');
    expect(element).toHaveClass('my-4');
    expect(element).toHaveClass('font-concert-description'); // classe de base
  });
  
  // Test avec un type non reconnu
  test('gère correctement un type non reconnu dans baseClasses', () => {
    render(<Text content="Type inconnu" type="span" />);
    
    const element = screen.getByText('Type inconnu');
    expect(element.tagName.toLowerCase()).toBe('span');
    // Ne devrait avoir que la classe personnalisée, car 'span' n'est pas dans baseClasses
    expect(element.className).toBe(' ');
  });
  
  // Test avec un type non reconnu mais avec classe personnalisée
  test('applique la classe personnalisée même avec un type non reconnu', () => {
    render(
      <Text 
        content="Type inconnu avec classe" 
        type="span" 
        className="text-red-500" 
      />
    );
    
    const element = screen.getByText('Type inconnu avec classe');
    expect(element).toHaveClass('text-red-500');
  });
  
  
  // Test de longue chaîne de texte
  test('gère correctement les longues chaînes de texte', () => {
    const longText = 'a'.repeat(1000);
    render(<Text content={longText} type="p" />);
    
    const element = screen.getByText(longText);
    expect(element).toBeInTheDocument();
  });
  
});