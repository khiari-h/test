import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PartnersPage from '../../component/pages/PartnersPage';
import { useEventFiltering } from '../../hooks/useEventFiltering';
import { useResponsiveItemsPerPage } from '../../hooks/useResponsiveItemPerPage';


// Mocks
jest.mock('../../hooks/useEventFiltering');
jest.mock('../../hooks/useResponsiveItemPerPage');
jest.mock('../../component/templates/PartnersPageTemplate', () => jest.fn(
  ({ partners, cta, message, filters }) => (
    <div data-testid="mock-partners-template">
      <div data-testid="filters-container">{filters}</div>
      <div data-testid="partners-container">{partners}</div>
      <div data-testid="cta-container">{cta}</div>
      <div data-testid="message-container">{message}</div>
    </div>
  )
));
jest.mock('../../component/molecules/PartnersCard', () => jest.fn(() => <div data-testid="mock-partner-card" />));
jest.mock('../../component/atoms/Button', () => jest.fn(props => (
  <button 
    data-testid="mock-button" 
    onClick={props.onClick}
    data-label={props.label}
  >
    {props.label}
  </button>
)));
jest.mock('../../component/atoms/Text', () => jest.fn(props => (
  <div data-testid="mock-text" data-type={props.type}>{props.content}</div>
)));

describe('PartnersPage', () => {
  const mockPartners = [
    { id: 1, name: 'Partner 1', logo_url: 'logo1.jpg', website_url: 'site1.com', description: 'Desc 1', category: 'Sponsors' },
    { id: 2, name: 'Partner 2', logo_url: 'logo2.jpg', website_url: 'site2.com', description: 'Desc 2', category: 'Media' }
  ];

  const mockUpdateFilter = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    
    useEventFiltering.mockReturnValue({
      events: mockPartners,
      loading: false,
      filters: { category: '' },
      updateFilter: mockUpdateFilter,
      resetFilters: jest.fn()
    });
    
    useResponsiveItemsPerPage.mockReturnValue({
      paginatedItems: mockPartners,
      pagination: {
        currentPage: 1,
        totalPages: 1,
        hasPrevious: false,
        hasNext: false,
        onPrevious: jest.fn(),
        onNext: jest.fn(),
        onPageSelect: jest.fn()
      }
    });
  });

  test('rend le template avec les filtres, partenaires, CTA et message', () => {
    render(<PartnersPage />);
    
    expect(screen.getByTestId('mock-partners-template')).toBeInTheDocument();
    expect(screen.getByTestId('filters-container')).toBeInTheDocument();
    expect(screen.getByTestId('partners-container')).toBeInTheDocument();
    expect(screen.getByTestId('cta-container')).toBeInTheDocument();
    expect(screen.getByTestId('message-container')).toBeInTheDocument();
  });

  test('affiche un message de chargement', () => {
    useEventFiltering.mockReturnValueOnce({
      events: [],
      loading: true,
      filters: { category: '' }
    });
    
    render(<PartnersPage />);
    
    expect(screen.getByText('Chargement...')).toBeInTheDocument();
  });

  test('affiche les partenaires quand ils sont chargés', () => {
    render(<PartnersPage />);
    
    expect(screen.getAllByTestId('mock-partner-card')).toHaveLength(2);
  });

  test('affiche un message quand aucun partenaire n\'est disponible', () => {
    useEventFiltering.mockReturnValueOnce({
      events: [],
      loading: false,
      filters: { category: '' }
    });
    
    render(<PartnersPage />);
    
    expect(screen.getByText('Aucun partenaire disponible.')).toBeInTheDocument();
  });

  test('génère des boutons de filtre par catégorie', () => {
    render(<PartnersPage />);
    
    // Vérifie que les boutons de catégorie sont rendus
    expect(screen.getByText('Tous')).toBeInTheDocument();
    expect(screen.getByText('Sponsors')).toBeInTheDocument();
    expect(screen.getByText('Media')).toBeInTheDocument();
  });

  test('rend la section CTA avec le texte et le bouton appropriés', () => {
    render(<PartnersPage />);
    
    expect(screen.getByText('Vous souhaitez devenir partenaire ?')).toBeInTheDocument();
    expect(screen.getByText('Envoyez-nous un email')).toBeInTheDocument();
  });

  test('rend la section message avec le texte approprié', () => {
    render(<PartnersPage />);
    
    expect(screen.getByText('Profitez de réductions chez nos partenaires !')).toBeInTheDocument();
  });
});