import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProgrammingPageTemplate from '../../component/templates/ProgrammingPageTemplate';
import Text from '../../component/atoms/Text';
import Button from '../../component/atoms/Button';

// Mocks
jest.mock('../../component/organisms/Header', () => jest.fn(() => <div data-testid="mock-header" />));
jest.mock('../../component/organisms/Footer', () => jest.fn(() => <div data-testid="mock-footer" />));
jest.mock('../../component/atoms/Text', () => jest.fn(({ content }) => (
  <h1 data-testid="mock-text">{content}</h1>
)));
jest.mock('../../component/atoms/Button', () => {
  return jest.fn(props => (
    <button 
      data-testid="mock-button" 
      onClick={props.onClick}
      className={props.className}
    >
      {props.label}
    </button>
  ));
});

describe('ProgrammingPageTemplate', () => {
  const mockOnSectionChange = jest.fn();
  const mockProps = {
    currentSection: 'concerts',
    onSectionChange: mockOnSectionChange,
    children: <div data-testid="mock-children">Content</div>
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('rend le header, le footer et le contenu principal', () => {
    render(<ProgrammingPageTemplate {...mockProps} />);
    
    // Vérifie le header et le footer
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
    
    // Vérifie le titre
    expect(screen.getByTestId('mock-text')).toBeInTheDocument();
    expect(screen.getByText('Programmation du Festival')).toBeInTheDocument();
    
    // Vérifie que les boutons de navigation sont rendus
    expect(screen.getAllByTestId('mock-button')).toHaveLength(2);
    expect(screen.getByText('Concerts')).toBeInTheDocument();
    expect(screen.getByText('Rencontres avec les Artistes')).toBeInTheDocument();
    
    // Vérifie le contenu enfant
    expect(screen.getByTestId('mock-children')).toBeInTheDocument();
  });

  test('appelle onSectionChange avec la bonne section lors du clic sur un bouton', () => {
    render(<ProgrammingPageTemplate {...mockProps} />);
    
    // Clique sur le bouton "Rencontres avec les Artistes"
    fireEvent.click(screen.getByText('Rencontres avec les Artistes'));
    
    // Vérifie que onSectionChange est appelé avec la bonne section
    expect(mockOnSectionChange).toHaveBeenCalledWith('artistMeetings');
    
    // Clique sur le bouton "Concerts"
    fireEvent.click(screen.getByText('Concerts'));
    
    // Vérifie que onSectionChange est appelé avec la bonne section
    expect(mockOnSectionChange).toHaveBeenCalledWith('concerts');
  });

  test('applique la classe "active" au bouton de la section actuelle', () => {
    render(<ProgrammingPageTemplate {...mockProps} />);
    
    // Vérifie que Button est appelé avec la classe 'active' pour la section actuelle
    expect(Button).toHaveBeenCalledWith(
      expect.objectContaining({
        label: 'Concerts',
        className: 'active'
      }),
      expect.anything()
    );
    
    // Vérifie que l'autre bouton n'a pas la classe 'active'
    expect(Button).toHaveBeenCalledWith(
      expect.objectContaining({
        label: 'Rencontres avec les Artistes',
        className: ''
      }),
      expect.anything()
    );
  });

  test('applique les classes CSS appropriées', () => {
    render(<ProgrammingPageTemplate {...mockProps} />);
    
    // Vérifie les classes CSS du conteneur principal
    const mainContainer = screen.getByTestId('mock-header').parentElement;
    expect(mainContainer).toHaveClass('bg-global');
    expect(mainContainer).toHaveClass('text-concert-text');
    expect(mainContainer).toHaveClass('min-h-screen');
    
    // Vérifie que Text est appelé avec les bonnes classes
    expect(Text).toHaveBeenCalledWith(
      expect.objectContaining({
        content: 'Programmation du Festival',
        type: 'h1',
        className: 'text-2xl font-bold mb-6 text-center'
      }),
      expect.anything()
    );
    
    // Vérifie que le conteneur des boutons de navigation a les bonnes classes
    const buttonsContainer = screen.getAllByTestId('mock-button')[0].parentElement;
    expect(buttonsContainer).toHaveClass('flex');
    expect(buttonsContainer).toHaveClass('justify-center');
    expect(buttonsContainer).toHaveClass('mt-6');
    expect(buttonsContainer).toHaveClass('space-x-4');
    expect(buttonsContainer).toHaveClass('mb-6');
  });
});