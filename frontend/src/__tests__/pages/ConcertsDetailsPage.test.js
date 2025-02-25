import React from 'react';
import { render, screen } from '@testing-library/react';
import ConcertsDetailsPage from '../../component/pages/ConcertsDetailsPage';
import { useEventFiltering } from '../../hooks/useEventFiltering';
import { useResponsiveItemsPerPage } from '../../hooks/useResponsiveItemPerPage';
import ConcertsDetailsPageTemplate from '../../component/templates/ConcertsDetailsPageTemplate';

// Mocks
jest.mock('../../hooks/useEventFiltering');
jest.mock('../../hooks/useResponsiveItemPerPage');
jest.mock('../../component/templates/ConcertsDetailsPageTemplate', () => jest.fn(
  ({ filters, concerts }) => (
    <div data-testid="mock-template">
      <div data-testid="filters-container">{filters}</div>
      <div data-testid="concerts-container">{concerts}</div>
    </div>
  )
));
jest.mock('../../component/atoms/Filter', () => jest.fn(() => <div data-testid="mock-filter" />));
jest.mock('../../component/molecules/InfoCard', () => jest.fn(() => <div data-testid="mock-info-card" />));
jest.mock('../../component/atoms/Button', () => jest.fn(props => (
  <button data-testid="mock-button" onClick={props.onClick}>{props.label}</button>
)));

describe('ConcertsDetailsPage', () => {
  const mockConcerts = [
    { id: 1, name: 'Concert 1' },
    { id: 2, name: 'Concert 2' }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    
    useEventFiltering.mockReturnValue({
      events: mockConcerts,
      loading: false,
      filters: {},
      updateFilter: jest.fn(),
      resetFilters: jest.fn(),
      uniqueFilterValues: {}
    });
    
    useResponsiveItemsPerPage.mockReturnValue({
      paginatedItems: mockConcerts,
      pagination: {
        currentPage: 1,
        totalPages: 1,
        hasPrevious: false,
        hasNext: false
      }
    });
  });

  test('rend le template avec les filtres et les concerts', () => {
    render(<ConcertsDetailsPage />);
    
    expect(ConcertsDetailsPageTemplate).toHaveBeenCalled();
    expect(screen.getByTestId('mock-template')).toBeInTheDocument();
    expect(screen.getByTestId('filters-container')).toBeInTheDocument();
    expect(screen.getByTestId('concerts-container')).toBeInTheDocument();
  });

  test('affiche un message de chargement', () => {
    useEventFiltering.mockReturnValueOnce({
      events: [],
      loading: true,
      filters: {}
    });
    
    render(<ConcertsDetailsPage />);
    
    expect(screen.getByText('Chargement des concerts...')).toBeInTheDocument();
  });

  test('affiche les cartes de concerts quand les données sont chargées', () => {
    render(<ConcertsDetailsPage />);
    
    expect(screen.getAllByTestId('mock-info-card')).toHaveLength(2);
  });
});