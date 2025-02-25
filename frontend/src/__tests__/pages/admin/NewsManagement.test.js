import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import NewsManagement from '../../../component/pages/admin/NewsManagement';
import axios from '../../../config/axiosConfig';

// Mocks
jest.mock('../../../component/pages/admin/components/AdminSidebar', () => 
  jest.fn(() => <div data-testid="mock-sidebar" />)
);
jest.mock('../../../config/axiosConfig', () => ({
  get: jest.fn(),
  post: jest.fn(),
  delete: jest.fn()
}));

describe('NewsManagement', () => {
  const mockNews = [
    {
      id: 1,
      title: 'Test News 1',
      description: 'Description 1',
      category: 'Festival',
      importance: 'Haute'
    },
    {
      id: 2,
      title: 'Test News 2',
      description: 'Description 2',
      category: 'Artiste',
      importance: 'Moyenne'
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    axios.get.mockResolvedValue({ data: mockNews });
  });

  test('renders loading message initially', () => {
    render(<NewsManagement />);
    expect(screen.getByText('Chargement...')).toBeInTheDocument();
  });

  test('renders news list after loading', async () => {
    render(<NewsManagement />);
    
    await waitFor(() => {
      expect(screen.getByText('Gestion des Actualités')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Test News 1')).toBeInTheDocument();
    expect(screen.getByText('Test News 2')).toBeInTheDocument();
    expect(screen.getByText('Festival')).toBeInTheDocument();
    expect(screen.getByText('Artiste')).toBeInTheDocument();
    expect(screen.getByText('Haute')).toBeInTheDocument();
    expect(screen.getByText('Moyenne')).toBeInTheDocument();
  });

  test('shows add news form when button is clicked', async () => {
    render(<NewsManagement />);
    
    await waitFor(() => {
      expect(screen.getByText('Ajouter une Actualité')).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByText('Ajouter une Actualité'));
    
    // Utilise l'input titre comme ancre pour restreindre la recherche au formulaire
    const titleInput = screen.getByPlaceholderText("Titre de l'actualité");
    expect(titleInput).toBeInTheDocument();
    const formContainer = titleInput.closest('form');
    expect(formContainer).toBeInTheDocument();
    
    // Rechercher les autres éléments à l'intérieur du formulaire
    expect(within(formContainer).getByPlaceholderText("Description de l'actualité")).toBeInTheDocument();
    expect(within(formContainer).getByText('Catégorie')).toBeInTheDocument();
    expect(within(formContainer).getByText('Importance')).toBeInTheDocument();
  });

  test('adds a new news item', async () => {
    axios.post.mockResolvedValue({ 
      data: { 
        id: 3, 
        title: 'New News', 
        category: 'Festival',
        importance: 'Haute'
      } 
    });
    
    render(<NewsManagement />);
    
    await waitFor(() => {
      expect(screen.getByText('Ajouter une Actualité')).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByText('Ajouter une Actualité'));
    
    // Remplit le formulaire
    fireEvent.change(screen.getByPlaceholderText("Titre de l'actualité"), {
      target: { value: 'New News' }
    });
    fireEvent.change(screen.getByPlaceholderText("Description de l'actualité"), {
      target: { value: 'New Description' }
    });
    
    // Suppose que les selects sont affichés dans le formulaire (ordre: catégorie, importance)
    const formSelects = within(screen.getByPlaceholderText("Titre de l'actualité").closest('form')).getAllByRole('combobox');
    fireEvent.change(formSelects[0], { target: { value: 'Festival' } });
    fireEvent.change(formSelects[1], { target: { value: 'Haute' } });
    
    fireEvent.click(screen.getByText('Enregistrer'));
    
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/api/news', expect.objectContaining({
        title: 'New News',
        category: 'Festival',
        importance: 'Haute'
      }));
    });
  });

  test('deletes a news item', async () => {
    axios.delete.mockResolvedValue({});
    
    render(<NewsManagement />);
    
    await waitFor(() => {
      expect(screen.getAllByText('Supprimer')[0]).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getAllByText('Supprimer')[0]);
    
    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith('/api/news/1');
    });
  });

  test('shows error message when API call fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('API Error'));
    
    render(<NewsManagement />);
    
    await waitFor(() => {
      expect(screen.getByText('Erreur lors du chargement des actualités')).toBeInTheDocument();
    });
  });

  test('cancels form when cancel button is clicked', async () => {
    render(<NewsManagement />);
    
    await waitFor(() => {
      expect(screen.getByText('Ajouter une Actualité')).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByText('Ajouter une Actualité'));
    
    expect(screen.getByPlaceholderText("Titre de l'actualité")).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Annuler'));
    
    expect(screen.queryByPlaceholderText("Titre de l'actualité")).not.toBeInTheDocument();
    expect(screen.getByText('Ajouter une Actualité')).toBeInTheDocument();
  });
});
