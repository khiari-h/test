import React from 'react';
import { render, screen } from '@testing-library/react';
import ConcertsDetailsPageTemplate from '../../component/templates/ConcertsDetailsPageTemplate';
import Text from '../../component/atoms/Text';

// Mocks
jest.mock('../../component/organisms/Header', () => jest.fn(() => <div data-testid="mock-header" />));
jest.mock('../../component/organisms/Footer', () => jest.fn(() => <div data-testid="mock-footer" />));
jest.mock('../../component/atoms/Text', () => jest.fn(({ content }) => (
  <h1 data-testid="mock-text">{content}</h1>
)));

describe('ConcertsDetailsPageTemplate', () => {
  const mockFilters = <div data-testid="mock-filters">Filters Content</div>;
  const mockConcerts = <div data-testid="mock-concerts">Concerts Content</div>;

  test('rend le header, le footer et les composants principaux', () => {
    render(
      <ConcertsDetailsPageTemplate 
        filters={mockFilters} 
        concerts={mockConcerts} 
      />
    );
    
    // Vérifie le header et le footer
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
    
    // Vérifie le titre
    expect(screen.getByTestId('mock-text')).toBeInTheDocument();
    expect(screen.getByText('Tous les Concerts et leur Planning')).toBeInTheDocument();
    
    // Vérifie les contenus des composants enfants
    expect(screen.getByTestId('mock-filters')).toBeInTheDocument();
    expect(screen.getByTestId('mock-concerts')).toBeInTheDocument();
  });

  test('applique les classes CSS appropriées', () => {
    render(
      <ConcertsDetailsPageTemplate 
        filters={mockFilters} 
        concerts={mockConcerts} 
      />
    );
    
    // Vérifie les classes CSS du conteneur principal
    const mainContainer = screen.getByTestId('mock-header').parentElement;
    expect(mainContainer).toHaveClass('bg-global');
    expect(mainContainer).toHaveClass('text-concert-text');
    expect(mainContainer).toHaveClass('min-h-screen');
    
    // Vérifie que Text est appelé avec les bonnes classes
    expect(Text).toHaveBeenCalledWith(
      expect.objectContaining({
        content: 'Tous les Concerts et leur Planning',
        type: 'h1',
        className: 'h1-class text-center mb-6'
      }),
      expect.anything()
    );
  });
});