import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '../../component/pages/HomePage';


// Mocks
jest.mock('../../component/templates/HomePageTemplate', () => jest.fn(props => (
  <div data-testid="mock-home-template">
    {props.heroSection}
    {props.newsAndUpdates}
    {props.concertsOverview}
    {props.programmingOverview}
    {props.ctaBeforeMap}
    {props.practicalInfo}
    {props.map}
    {props.ctaAfterMap}
  </div>
)));
jest.mock('../../component/organisms/HeroSection', () => jest.fn(() => <div data-testid="mock-hero-section" />));
jest.mock('../../component/organisms/NewsAndUpdates', () => jest.fn(() => <div data-testid="mock-news-updates" />));
jest.mock('../../component/organisms/ConcertsOverview', () => jest.fn(() => <div data-testid="mock-concerts-overview" />));
jest.mock('../../component/organisms/ProgrammingOverview', () => jest.fn(() => <div data-testid="mock-programming-overview" />));
jest.mock('../../component/molecules/CTASection', () => jest.fn(props => (
  <div data-testid="mock-cta-section" data-title={props.title}>{props.ctas?.map(cta => cta.label).join(', ')}</div>
)));
jest.mock('../../component/organisms/PracticalInfo', () => jest.fn(() => <div data-testid="mock-practical-info" />));
jest.mock('../../component/organisms/Map', () => jest.fn(() => <div data-testid="mock-map" />));

describe('HomePage', () => {
  test('rend le template avec tous les composants nécessaires', () => {
    render(<HomePage />);
    
    // Vérifie que le template est rendu
    expect(screen.getByTestId('mock-home-template')).toBeInTheDocument();
    
    // Vérifie que tous les sections sont rendues
    expect(screen.getByTestId('mock-hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('mock-news-updates')).toBeInTheDocument();
    expect(screen.getByTestId('mock-concerts-overview')).toBeInTheDocument();
    expect(screen.getByTestId('mock-programming-overview')).toBeInTheDocument();
    expect(screen.getAllByTestId('mock-cta-section')).toHaveLength(2);
    expect(screen.getByTestId('mock-practical-info')).toBeInTheDocument();
    expect(screen.getByTestId('mock-map')).toBeInTheDocument();
  });

  test('configure correctement les sections CTA', () => {
    render(<HomePage />);
    
    const ctaSections = screen.getAllByTestId('mock-cta-section');
    
    // Vérifie le CTA avant la carte
    expect(ctaSections[0]).toHaveAttribute('data-title', 'Réservez vos billets pour une expérience inoubliable!');
    expect(ctaSections[0]).toHaveTextContent('Acheter des billets');
    
    // Vérifie le CTA après la carte
    expect(ctaSections[1]).toHaveAttribute('data-title', 'Découvrez nos partenaires');
    expect(ctaSections[1]).toHaveTextContent('Nos Partenaires');
  });
});