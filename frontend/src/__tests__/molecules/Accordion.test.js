import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Accordion from '../../component/molecules/Accordion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

// Mock des icônes React
jest.mock('react-icons/fa', () => ({
  FaChevronDown: () => <div data-testid="chevron-down">ChevronDown</div>,
  FaChevronUp: () => <div data-testid="chevron-up">ChevronUp</div>
}));

describe('Composant Accordion', () => {
  const testTitle = 'Titre de l\'accordéon';
  const testContent = 'Contenu de l\'accordéon';

  // Test de rendu initial
  test('rend correctement avec le titre spécifié et contenu fermé par défaut', () => {
    render(
      <Accordion title={testTitle}>
        <p>{testContent}</p>
      </Accordion>
    );
    
    // Vérifie que le titre est affiché
    expect(screen.getByText(testTitle)).toBeInTheDocument();
    
    // Vérifie que l'icône de flèche vers le bas est affichée (fermé)
    expect(screen.getByTestId('chevron-down')).toBeInTheDocument();
    
    // Vérifie que le contenu n'est pas affiché initialement
    expect(screen.queryByText(testContent)).not.toBeInTheDocument();
  });

  // Test d'ouverture de l'accordéon
  test('affiche le contenu lorsqu\'on clique sur le titre', () => {
    render(
      <Accordion title={testTitle}>
        <p>{testContent}</p>
      </Accordion>
    );
    
    // Clique sur le bouton de titre
    fireEvent.click(screen.getByText(testTitle));
    
    // Vérifie que le contenu est maintenant affiché
    expect(screen.getByText(testContent)).toBeInTheDocument();
    
    // Vérifie que l'icône est maintenant une flèche vers le haut (ouvert)
    expect(screen.getByTestId('chevron-up')).toBeInTheDocument();
  });

  // Test de fermeture de l'accordéon
  test('cache le contenu lorsqu\'on clique à nouveau sur le titre', () => {
    render(
      <Accordion title={testTitle}>
        <p>{testContent}</p>
      </Accordion>
    );
    
    // Ouvre l'accordéon
    fireEvent.click(screen.getByText(testTitle));
    
    // Vérifie que le contenu est affiché
    expect(screen.getByText(testContent)).toBeInTheDocument();
    
    // Ferme l'accordéon
    fireEvent.click(screen.getByText(testTitle));
    
    // Vérifie que le contenu n'est plus affiché
    expect(screen.queryByText(testContent)).not.toBeInTheDocument();
    
    // Vérifie que l'icône est à nouveau une flèche vers le bas (fermé)
    expect(screen.getByTestId('chevron-down')).toBeInTheDocument();
  });

  // Test d'accessibilité
  test('a l\'attribut aria-expanded correct', () => {
    render(
      <Accordion title={testTitle}>
        <p>{testContent}</p>
      </Accordion>
    );
    
    // Vérifie que l'attribut aria-expanded est initialement à false
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    
    // Ouvre l'accordéon
    fireEvent.click(button);
    
    // Vérifie que l'attribut aria-expanded est maintenant à true
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  // Test de contenu complexe
  test('peut contenir des éléments complexes', () => {
    render(
      <Accordion title={testTitle}>
        <div>
          <h3>Sous-titre</h3>
          <p>Paragraphe 1</p>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
        </div>
      </Accordion>
    );
    
    // Ouvre l'accordéon
    fireEvent.click(screen.getByText(testTitle));
    
    // Vérifie que tous les éléments complexes sont rendus
    expect(screen.getByText('Sous-titre')).toBeInTheDocument();
    expect(screen.getByText('Paragraphe 1')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });


  // Test des classes CSS
  test('applique les classes CSS correctes', () => {
    render(
      <Accordion title={testTitle}>
        <p>{testContent}</p>
      </Accordion>
    );
    
    // Vérifie les classes sur le conteneur principal
    const container = screen.getByRole('button').parentElement;
    expect(container).toHaveClass('bg-white');
    expect(container).toHaveClass('rounded-lg');
    expect(container).toHaveClass('shadow-md');
    
    // Vérifie les classes sur le bouton
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-custom-gray');
    expect(button).toHaveClass('rounded-t-lg');
    
    // Ouvre l'accordéon pour vérifier les classes du contenu
    fireEvent.click(button);
    
    // Vérifie les classes sur le conteneur de contenu
    const contentContainer = screen.getByText(testContent).closest('div').parentElement;
    expect(contentContainer).toHaveClass('bg-custom-gray');
    expect(contentContainer).toHaveClass('rounded-b-lg');
  });
});