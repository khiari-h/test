import React from 'react';
import { render, screen } from '@testing-library/react';
import NewsPageTemplate from '../../component/templates/NewsPageTemplate';
import Text from '../../component/atoms/Text';

// Mocks
jest.mock('../../component/organisms/Header', () => jest.fn(() => <div data-testid="mock-header" />));
jest.mock('../../component/organisms/Footer', () => jest.fn(() => <div data-testid="mock-footer" />));
jest.mock('../../component/atoms/Text', () => jest.fn(({ content }) => (
  <h1 data-testid="mock-text">{content}</h1>
)));

describe('NewsPageTemplate', () => {
  const mockProps = {
    title: 'Actualités du Festival',
    filters: <div data-testid="mock-filters">Filters Content</div>,
    newsItems: <div data-testid="mock-news-items">News Items Content</div>,
    pagination: <div data-testid="mock-pagination">Pagination Content</div>
  };

  test('rend le header, le footer et les composants principaux', () => {
    render(<NewsPageTemplate {...mockProps} />);
    
    // Vérifie le header et le footer
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
    
    // Vérifie le titre
    expect(screen.getByTestId('mock-text')).toBeInTheDocument();
    expect(screen.getByText('Actualités du Festival')).toBeInTheDocument();
    
    // Vérifie les contenus des composants enfants
    expect(screen.getByTestId('mock-filters')).toBeInTheDocument();
    expect(screen.getByTestId('mock-news-items')).toBeInTheDocument();
    expect(screen.getByTestId('mock-pagination')).toBeInTheDocument();
  });

  test('appelle Text avec les bonnes propriétés', () => {
    render(<NewsPageTemplate {...mockProps} />);
    
    // Vérifie que Text est appelé avec les bonnes props
    expect(Text).toHaveBeenCalledWith(
      expect.objectContaining({
        content: 'Actualités du Festival',
        type: 'h1',
        className: 'h1-class text-center mb-8'
      }),
      expect.anything()
    );
  });

  test('applique les classes CSS appropriées', () => {
    render(<NewsPageTemplate {...mockProps} />);
    
    // Vérifie les classes CSS du conteneur principal
    const mainContainer = screen.getByTestId('mock-header').parentElement;
    expect(mainContainer).toHaveClass('bg-global');
    expect(mainContainer).toHaveClass('text-concert-text');
    expect(mainContainer).toHaveClass('min-h-screen');
    
    // Vérifie que le conteneur de contenu principal a les bonnes classes
    const contentContainer = screen.getByTestId('mock-text').parentElement;
    expect(contentContainer).toHaveClass('container');
    expect(contentContainer).toHaveClass('mx-auto');
    expect(contentContainer).toHaveClass('py-8');
  });
});