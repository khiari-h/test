import React from 'react';
import { render, screen } from '@testing-library/react';
import PartnersPageTemplate from '../../component/templates/PartnersPageTemplate';
import Text from '../../component/atoms/Text';

// Mocks
jest.mock('../../component/organisms/Header', () => jest.fn(() => <div data-testid="mock-header" />));
jest.mock('../../component/organisms/Footer', () => jest.fn(() => <div data-testid="mock-footer" />));
jest.mock('../../component/atoms/Text', () => jest.fn(({ content }) => (
  <h1 data-testid="mock-text">{content}</h1>
)));

describe('PartnersPageTemplate', () => {
  const mockProps = {
    filters: <div data-testid="mock-filters">Filters Content</div>,
    partners: <div data-testid="mock-partners">Partners Content</div>,
    cta: <div data-testid="mock-cta">CTA Content</div>,
    message: <div data-testid="mock-message">Message Content</div>
  };

  test('rend le header, le footer et les composants principaux', () => {
    render(<PartnersPageTemplate {...mockProps} />);
    
    // Vérifie le header et le footer
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
    
    // Vérifie le titre
    expect(screen.getByTestId('mock-text')).toBeInTheDocument();
    expect(screen.getByText('Nos Partenaires')).toBeInTheDocument();
    
    // Vérifie les contenus des composants enfants
    expect(screen.getByTestId('mock-filters')).toBeInTheDocument();
    expect(screen.getByTestId('mock-partners')).toBeInTheDocument();
    expect(screen.getByTestId('mock-cta')).toBeInTheDocument();
    expect(screen.getByTestId('mock-message')).toBeInTheDocument();
  });

  test('appelle Text avec les bonnes propriétés', () => {
    render(<PartnersPageTemplate {...mockProps} />);
    
    // Vérifie que Text est appelé avec les bonnes props
    expect(Text).toHaveBeenCalledWith(
      expect.objectContaining({
        content: 'Nos Partenaires',
        type: 'h1',
        className: 'h1-class text-center mb-6'
      }),
      expect.anything()
    );
  });

  test('fonctionne sans le composant message optionnel', () => {
    const propsWithoutMessage = {
      ...mockProps,
      message: undefined
    };
    
    render(<PartnersPageTemplate {...propsWithoutMessage} />);
    
    // Vérifie que les composants obligatoires sont toujours rendus
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-filters')).toBeInTheDocument();
    expect(screen.getByTestId('mock-partners')).toBeInTheDocument();
    expect(screen.getByTestId('mock-cta')).toBeInTheDocument();
    
    // Vérifie que le message n'est pas rendu
    expect(screen.queryByTestId('mock-message')).not.toBeInTheDocument();
  });

  test('applique les classes CSS appropriées', () => {
    render(<PartnersPageTemplate {...mockProps} />);
    
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