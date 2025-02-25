import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NewsPage from '../../component/pages/NewsPage';
import { useEventFiltering } from '../../hooks/useEventFiltering';
import { useResponsiveItemsPerPage } from '../../hooks/useResponsiveItemPerPage';


// Mocks
jest.mock('../../hooks/useEventFiltering');
jest.mock('../../hooks/useResponsiveItemPerPage');
jest.mock('../../component/templates/NewsPageTemplate', () => jest.fn(
  ({ title, filters, newsItems, pagination }) => (
    <div data-testid="mock-news-template">
      <h1>{title}</h1>
      <div data-testid="filters-container">{filters}</div>
      <div data-testid="news-container">{newsItems}</div>
      <div data-testid="pagination-container">{pagination}</div>
    </div>
  )
));
jest.mock('../../component/molecules/NewsCard', () => jest.fn(() => <div data-testid="mock-news-card" />));
jest.mock('../../component/atoms/Button', () => jest.fn(props => (
  <button 
    data-testid="mock-button" 
    onClick={props.onClick}
    data-label={props.label}
    data-selected={props.isSelected}
  >
    {props.label}
  </button>
)));

describe('NewsPage', () => {
  const mockNews = [
    { id: 1, title: 'News 1', description: 'Description 1', category: 'Event' },
    { id: 2, title: 'News 2', description: 'Description 2', category: 'Announcement' }
  ];

  const mockUpdateFilter = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    
    useEventFiltering.mockReturnValue({
      events: mockNews,
      loading: false,
      filters: { category: '' },
      updateFilter: mockUpdateFilter
    });
    
    useResponsiveItemsPerPage.mockReturnValue({
      paginatedItems: mockNews,
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

  test('rend le template avec le titre, les filtres et les actualités', () => {
    render(<NewsPage />);
    
    expect(screen.getByText('Actualités')).toBeInTheDocument();
    expect(screen.getByTestId('filters-container')).toBeInTheDocument();
    expect(screen.getByTestId('news-container')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-container')).toBeInTheDocument();
  });

  test('affiche un message de chargement', () => {
    useEventFiltering.mockReturnValueOnce({
      events: [],
      loading: true,
      filters: { category: '' }
    });
    
    render(<NewsPage />);
    
    expect(screen.getByText('Chargement...')).toBeInTheDocument();
  });

  test('génère des boutons de filtre par catégorie', () => {
    render(<NewsPage />);
    
    // Vérifie que les boutons de catégorie sont rendus
    expect(screen.getByText('Tous')).toBeInTheDocument();
    expect(screen.getByText('Event')).toBeInTheDocument();
    expect(screen.getByText('Announcement')).toBeInTheDocument();
  });

  test('appelle updateFilter avec la bonne catégorie lors du clic', () => {
    render(<NewsPage />);
    
    // Clique sur un bouton de catégorie
    fireEvent.click(screen.getByText('Event'));
    
    // Vérifie que updateFilter est appelé avec les bons paramètres
    expect(mockUpdateFilter).toHaveBeenCalledWith('category', 'Event');
    
    // Clique sur le bouton "Tous"
    fireEvent.click(screen.getByText('Tous'));
    
    // Vérifie que updateFilter est appelé avec une catégorie vide
    expect(mockUpdateFilter).toHaveBeenCalledWith('category', '');
  });
});