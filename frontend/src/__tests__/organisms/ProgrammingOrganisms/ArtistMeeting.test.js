import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ArtistMeeting from '../../../component/organisms/ProgrammingOrganisms/ArtistMeeting';
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

describe('Composant ArtistMeeting', () => {
  const mockMeetings = [
    { id: 1, title: 'Rencontre 1', artist: { name: 'Artiste 1', image_url: 'image1.jpg' } },
    { id: 2, title: 'Rencontre 2', artist: { name: 'Artiste 2', image_url: 'image2.jpg' } }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    useEventFiltering.mockReturnValue({
      events: mockMeetings,
      loading: false,
      filters: {},
      updateFilter: jest.fn(),
      resetFilters: jest.fn()
    });
    useResponsiveItemsPerPage.mockReturnValue({
      paginatedItems: mockMeetings,
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
    render(<ArtistMeeting />);
    
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
    
    render(<ArtistMeeting />);
    
    expect(screen.getByText('Chargement des rencontres...')).toBeInTheDocument();
  });

  test('gère la pagination', () => {
    const mockOnNext = jest.fn();
    
    useResponsiveItemsPerPage.mockReturnValueOnce({
      paginatedItems: mockMeetings,
      pagination: { 
        currentPage: 1, 
        totalPages: 2,
        hasNext: true,
        hasPrevious: false,
        onNext: mockOnNext,
        onPrevious: jest.fn(),
        onPageSelect: jest.fn()
      }
    });
    
    render(<ArtistMeeting />);
    
    // Test de clic sur le bouton suivant
    fireEvent.click(screen.getByText('Suivant'));
    expect(mockOnNext).toHaveBeenCalled();
  });

  test('utilise l\'endpoint API personnalisé', () => {
    const customEndpoint = '/api/custom-meetings';
    render(<ArtistMeeting apiEndpoint={customEndpoint} />);
    
    expect(useEventFiltering).toHaveBeenCalledWith(
      customEndpoint,
      expect.anything()
    );
  });
});