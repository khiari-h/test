import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import NewsAndUpdates from '../../component/organisms/NewsAndUpdates';
import axios from '../../config/axiosConfig';
import { useResponsiveDisplay } from '../../hooks/useResponsiveDisplay';
import Button from '../../component/atoms/Button';
import NewsCard from '../../component/molecules/NewsCard';
import Text from '../../component/atoms/Text';
import { act } from 'react-dom/test-utils';

// Mocks pour les dépendances
jest.mock('../../config/axiosConfig');
jest.mock('../../hooks/useResponsiveDisplay');
jest.mock('../../component/atoms/Button', () => jest.fn(() => <div data-testid="mock-button" />));
jest.mock('../../component/molecules/NewsCard', () => jest.fn(() => <div data-testid="mock-news-card" />));
jest.mock('../../component/atoms/Text', () => jest.fn(({ content, type, className }) => (
  <div data-testid="mock-text" data-content={content} data-type={type} className={className}>
    {content}
  </div>
)));

describe('Composant NewsAndUpdates', () => {
  // Données de test
  const mockNews = [
    {
      id: 1,
      title: 'Nouvelle 1',
      description: 'Description de la nouvelle 1'
    },
    {
      id: 2,
      title: 'Nouvelle 2',
      description: 'Description de la nouvelle 2'
    },
    {
      id: 3,
      title: 'Nouvelle 3',
      description: 'Description de la nouvelle 3'
    }
  ];

  beforeEach(() => {
    // Réinitialisation des mocks
    jest.clearAllMocks();
    
    // Mock par défaut pour useResponsiveDisplay
    useResponsiveDisplay.mockReturnValue(3);
  });

  // Test de chargement
  test('affiche le message de chargement', async () => {
    // Configuration du mock axios pour qu'il ne se résolve pas immédiatement
    axios.get.mockImplementation(() => new Promise(() => {}));
    
    render(<NewsAndUpdates />);
    
    // Vérifie que le composant Text est appelé avec le message de chargement
    expect(Text).toHaveBeenCalledWith(
      expect.objectContaining({
        content: 'Chargement...',
        type: 'p'
      }),
      expect.anything()
    );
  });

  // Test d'erreur
  test('affiche un message d\'erreur si la requête échoue', async () => {
    // Configuration du mock axios pour simuler une erreur
    axios.get.mockRejectedValueOnce(new Error('Erreur réseau'));
    
    await act(async () => {
      render(<NewsAndUpdates />);
    });
    
    // Attendre que le composant se mette à jour après la résolution de la promesse
    await waitFor(() => {
      expect(Text).toHaveBeenCalledWith(
        expect.objectContaining({
          content: 'Erreur lors de la récupération des données.',
          type: 'p',
          className: 'text-error-red'
        }),
        expect.anything()
      );
    });
  });

  // Test de rendu des actualités
  test('rend les actualités correctement après chargement réussi', async () => {
    // Configuration du mock axios pour simuler une réponse réussie
    axios.get.mockResolvedValueOnce({ data: mockNews });
    
    await act(async () => {
      render(<NewsAndUpdates />);
    });
    
    // Attendre que le composant se mette à jour après la résolution de la promesse
    await waitFor(() => {
      // Vérifie que NewsCard est appelé pour chaque actualité
      expect(NewsCard).toHaveBeenCalledTimes(3);
      
      // Vérifie le premier appel à NewsCard
      expect(NewsCard).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Nouvelle 1',
          description: 'Description de la nouvelle 1'
        }),
        expect.anything()
      );
      
      // Vérifie le bouton "Voir toutes les actualités"
      expect(Button).toHaveBeenCalledWith(
        expect.objectContaining({
          href: '/news',
          label: 'Voir toutes les actualités'
        }),
        expect.anything()
      );
    });
  });

  // Test du comportement responsive avec 2 cartes
  test('affiche le bon nombre de cartes en fonction du hook useResponsiveDisplay', async () => {
    // Configuration du hook pour retourner 2
    useResponsiveDisplay.mockReturnValue(2);
    
    // Configuration du mock axios
    axios.get.mockResolvedValueOnce({ data: mockNews });
    
    await act(async () => {
      render(<NewsAndUpdates />);
    });
    
    // Attendre que le composant se mette à jour
    await waitFor(() => {
      // Vérifie que seulement 2 NewsCard sont rendus
      expect(NewsCard).toHaveBeenCalledTimes(2);
    });
    
    // Vérifie les classes de grille pour 2 colonnes
    await waitFor(() => {
      const gridElement = screen.getAllByTestId('mock-news-card')[0].parentElement;
      expect(gridElement).toHaveClass('grid');
      expect(gridElement).toHaveClass('grid-cols-1');
      expect(gridElement).toHaveClass('md:grid-cols-2');
      expect(gridElement).not.toHaveClass('lg:grid-cols-3');
    });
  });

  // Test du comportement responsive avec 3 cartes
  test('applique les classes de grille correctes pour 3 cartes', async () => {
    // Configuration du mock axios
    axios.get.mockResolvedValueOnce({ data: mockNews });
    
    await act(async () => {
      render(<NewsAndUpdates />);
    });
    
    // Attendre que le composant se mette à jour
    await waitFor(() => {
      const gridElement = screen.getAllByTestId('mock-news-card')[0].parentElement;
      expect(gridElement).toHaveClass('grid');
      expect(gridElement).toHaveClass('grid-cols-1');
      expect(gridElement).toHaveClass('lg:grid-cols-3');
    });
  });

  // Test du titre de la section
  test('affiche le titre de la section correctement', async () => {
    axios.get.mockResolvedValueOnce({ data: mockNews });
    
    render(<NewsAndUpdates />);
    
    // Vérifie que le titre est rendu
    expect(Text).toHaveBeenCalledWith(
      expect.objectContaining({
        content: 'Actualités',
        type: 'h2',
        className: 'mb-8 text-center',
        id: 'news-updates-heading'
      }),
      expect.anything()
    );
  });

  // Test d'accessibilité
  test('applique les attributs d\'accessibilité appropriés', () => {
    axios.get.mockResolvedValueOnce({ data: mockNews });
    
    render(<NewsAndUpdates />);
    
    // Vérifie que la section a l'attribut aria-labelledby
    const sectionElement = screen.getByRole('region');
    expect(sectionElement).toHaveAttribute('aria-labelledby', 'news-updates-heading');
  });

  // Test de la logique de slice des actualités
  test('limite le nombre d\'actualités affichées en fonction de displayCount', async () => {
    // Configuration du mock pour retourner plus d'actualités que displayCount
    const extendedMockNews = [
      ...mockNews,
      { id: 4, title: 'Nouvelle 4', description: 'Description de la nouvelle 4' },
      { id: 5, title: 'Nouvelle 5', description: 'Description de la nouvelle 5' }
    ];
    
    // Configuration pour afficher 2 actualités maximum
    useResponsiveDisplay.mockReturnValue(2);
    axios.get.mockResolvedValueOnce({ data: extendedMockNews });
    
    await act(async () => {
      render(<NewsAndUpdates />);
    });
    
    // Attendre que le composant se mette à jour
    await waitFor(() => {
      // Vérifie que seulement 2 actualités sont affichées malgré les 5 disponibles
      expect(NewsCard).toHaveBeenCalledTimes(2);
    });
  });

  // Test de l'appel API
  test('effectue l\'appel API vers le bon endpoint', async () => {
    axios.get.mockResolvedValueOnce({ data: mockNews });
    
    render(<NewsAndUpdates />);
    
    // Vérifie que axios.get a été appelé avec le bon endpoint
    expect(axios.get).toHaveBeenCalledWith('/api/news');
  });

  // Test du message d'erreur console
  test('affiche une erreur dans la console en cas d\'échec de la requête', async () => {
    // Espionner console.error
    const originalConsoleError = console.error;
    console.error = jest.fn();
    
    // Simuler une erreur
    const errorMessage = 'Erreur réseau';
    axios.get.mockRejectedValueOnce(new Error(errorMessage));
    
    await act(async () => {
      render(<NewsAndUpdates />);
    });
    
    // Attendre que le composant se mette à jour
    await waitFor(() => {
      // Vérifie que console.error a été appelé
      expect(console.error).toHaveBeenCalledWith(
        "Erreur lors de la récupération des actualités!",
        expect.any(Error)
      );
    });
    
    // Restaurer console.error
    console.error = originalConsoleError;
  });
});