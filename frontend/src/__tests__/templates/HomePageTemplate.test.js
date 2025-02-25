import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePageTemplate from '../../component/templates/HomePageTemplate';


// Mocks
jest.mock('../../component/organisms/Header', () => jest.fn(() => <div data-testid="mock-header" />));
jest.mock('../../component/organisms/Footer', () => jest.fn(() => <div data-testid="mock-footer" />));

describe('HomePageTemplate', () => {
  // Mocks pour les composants enfants
  const mockProps = {
    heroSection: <div data-testid="mock-hero-section">Hero Section</div>,
    newsAndUpdates: <div data-testid="mock-news-updates">News Updates</div>,
    concertsOverview: <div data-testid="mock-concerts-overview">Concerts Overview</div>,
    programmingOverview: <div data-testid="mock-programming-overview">Programming Overview</div>,
    ctaBeforeMap: <div data-testid="mock-cta-before-map">CTA Before Map</div>,
    registerForm: <div data-testid="mock-register-form">Register Form</div>,
    practicalInfo: <div data-testid="mock-practical-info">Practical Info</div>,
    map: <div data-testid="mock-map">Map</div>,
    ctaAfterMap: <div data-testid="mock-cta-after-map">CTA After Map</div>
  };

  test('rend le header, le footer et toutes les sections', () => {
    render(<HomePageTemplate {...mockProps} />);
    
    // Vérifie le header et le footer
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
    
    // Vérifie que toutes les sections requises sont rendues
    expect(screen.getByTestId('mock-hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('mock-news-updates')).toBeInTheDocument();
    expect(screen.getByTestId('mock-concerts-overview')).toBeInTheDocument();
    expect(screen.getByTestId('mock-programming-overview')).toBeInTheDocument();
    expect(screen.getByTestId('mock-cta-before-map')).toBeInTheDocument();
    expect(screen.getByTestId('mock-practical-info')).toBeInTheDocument();
    expect(screen.getByTestId('mock-map')).toBeInTheDocument();
    expect(screen.getByTestId('mock-cta-after-map')).toBeInTheDocument();
    
    // Vérifie que la section registerForm facultative est rendue
    expect(screen.getByTestId('mock-register-form')).toBeInTheDocument();
  });

  test('applique les classes CSS appropriées', () => {
    render(<HomePageTemplate {...mockProps} />);
    
    // Vérifie les classes CSS du conteneur principal
    const mainContainer = screen.getByTestId('mock-header').parentElement;
    expect(mainContainer).toHaveClass('bg-global');
    expect(mainContainer).toHaveClass('text-concert-text');
    expect(mainContainer).toHaveClass('min-h-screen');
  });

  test('structure les sections avec les attributs d\'accessibilité appropriés', () => {
    render(<HomePageTemplate {...mockProps} />);
    
    // Récupère toutes les sections
    const sections = screen.getAllByRole('region');
    
    // Vérifie que chaque section a un attribut aria-labelledby
    expect(sections[0]).toHaveAttribute('aria-labelledby', 'actualites-mises-a-jour');
    expect(sections[1]).toHaveAttribute('aria-labelledby', 'aperçu-concerts');
    expect(sections[2]).toHaveAttribute('aria-labelledby', 'aperçu-programmation');
    expect(sections[3]).toHaveAttribute('aria-labelledby', 'reservation-billets');
    expect(sections[4]).toHaveAttribute('aria-labelledby', 'inscriptions');
    expect(sections[5]).toHaveAttribute('aria-labelledby', 'infos-pratiques');
    expect(sections[6]).toHaveAttribute('aria-labelledby', 'carte');
    expect(sections[7]).toHaveAttribute('aria-labelledby', 'partenaires');
  });
});