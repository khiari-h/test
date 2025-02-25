import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ConcertsProgramming from '../../../component/organisms/ProgrammingOrganisms/ConcertProgramming';
import { useEventFiltering } from '../../../hooks/useEventFiltering';
import { useResponsiveItemsPerPage } from '../../../hooks/useResponsiveItemPerPage';

// Mocks
jest.mock('../../../hooks/useEventFiltering');
jest.mock('../../../hooks/useResponsiveItemPerPage');
jest.mock('../../../utils/formatUtilis', () => ({
  formatDate: jest.fn(date => `${date}`),
  formatTime: jest.fn(time => `${time}`)
}));
jest.mock('../../../component/molecules/InfoCard', () => jest.fn(() => <div data-testid="mock-info-card" />));
jest.mock('../../../component/atoms/Text', () => jest.fn(() => <div data-testid="mock-text" />));
jest.mock('../../../component/atoms/Filter', () => jest.fn(() => <div data-testid="mock-filter" />));
jest.mock('../../../component/atoms/Button', () => jest.fn(props => (
  <button data-testid="mock-button" onClick={props.onClick} disabled={props.disabled}>
    {props.label}
  </button>
)));

describe('Composant ConcertsProgramming', () => {
  const mockConcerts = [
    { id: 1, name: 'Concert 1', image_url: 'image1.jpg' },
    { id: 2, name: 'Concert 2', image_url: 'image2.jpg' }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    useEventFiltering.mockReturnValue({
      events: mockConcerts,
      loading: false,
      filters: {},
      updateFilter: jest.fn(),
      resetFilters: jest.fn()
    });
    useResponsiveItemsPerPage.mockReturnValue({
      paginatedItems: mockConcerts,
      pagination: { 
        currentPage: 1, 
        totalPages: 1,
        onNext: jest.fn(),
        onPrevious: jest.fn(),
        onPageSelect: jest.fn()
      }
    });
  });

  // Tests essentiels
  test('rend le contenu correctement quand les données sont chargées', () => {
    render(<ConcertsProgramming />);
    
    // Vérifie les éléments principaux
    expect(screen.getByTestId('mock-text')).toBeInTheDocument();
    expect(screen.getByTestId('mock-filter')).toBeInTheDocument();
    expect(screen.getAllByTestId('mock-info-card')).toHaveLength(2);
  });

  test('affiche un message de chargement', () => {
    useEventFiltering.mockReturnValueOnce({
      events: [],
      loading: true,
      filters: {}
    });
    
    render(<ConcertsProgramming />);
    
    expect(screen.getByText('Chargement des concerts...')).toBeInTheDocument();
  });

  test('gère la pagination', () => {
    const mockOnPageSelect = jest.fn();
    
    useResponsiveItemsPerPage.mockReturnValueOnce({
      paginatedItems: mockConcerts,
      pagination: { 
        currentPage: 1, 
        totalPages: 3,
        hasNext: true,
        hasPrevious: false,
        onNext: jest.fn(),
        onPrevious: jest.fn(),
        onPageSelect: mockOnPageSelect
      }
    });
    
    render(<ConcertsProgramming />);
    
    // Test de clic sur un bouton de page
    fireEvent.click(screen.getByText('2'));
    expect(mockOnPageSelect).toHaveBeenCalledWith(2);
  });

  test('utilise l\'endpoint API personnalisé', () => {
    const customEndpoint = '/api/custom-concerts';
    render(<ConcertsProgramming apiEndpoint={customEndpoint} />);
    
    expect(useEventFiltering).toHaveBeenCalledWith(
      customEndpoint,
      expect.anything()
    );
  });
});
