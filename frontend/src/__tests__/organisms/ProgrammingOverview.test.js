import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ProgrammingOverview from '../../component/organisms/ProgrammingOverview';
import { useResponsiveDisplay } from '../../hooks/useResponsiveDisplay';
import { useEventFiltering } from '../../hooks/useEventFiltering';
import InfoCard from '../../component/molecules/InfoCard';
import Text from '../../component/atoms/Text';
import Button from '../../component/atoms/Button';
import { formatDate, formatTime } from '../../utils/formatUtilis';

// Mocks pour les hooks et composants
jest.mock('../../hooks/useResponsiveDisplay');
jest.mock('../../hooks/useEventFiltering');
jest.mock('../../component/molecules/InfoCard', () => jest.fn(() => <div data-testid="mock-info-card" />));
jest.mock('../../component/atoms/Text', () => jest.fn(() => <div data-testid="mock-text" />));
jest.mock('../../component/atoms/Button', () => jest.fn(() => <div data-testid="mock-button" />));
jest.mock('../../utils/formatUtilis', () => ({
  formatDate: jest.fn(date => `Date formatée: ${date}`),
  formatTime: jest.fn(time => `Heure formatée: ${time}`)
}));

describe('Composant ProgrammingOverview', () => {
  // Données de test
  const mockMeetings = [
    {
      id: 1,
      title: 'Rencontre 1',
      description: 'Description rencontre 1',
      artist: {
        image_url: 'https://example.com/image1.jpg'
      },
      date: '2024-07-01',
      start_time: '19:00',
      end_time: '22:00',
      venue: 'Salle 1'
    },
    {
      id: 2,
      title: 'Rencontre 2',
      description: 'Description rencontre 2',
      artist: {
        image_url: 'https://example.com/image2.jpg'
      },
      date: '2024-07-02',
      start_time: '20:00',
      end_time: '23:00',
      venue: 'Salle 2'
    },
    {
      id: 3,
      title: 'Rencontre 3',
      description: 'Description rencontre 3',
      artist: {
        image_url: 'https://example.com/image3.jpg'
      },
      date: '2024-07-03',
      start_time: '18:00',
      end_time: '21:00',
      venue: 'Salle 3'
    }
  ];

  // Réinitialisation des mocks avant chaque test
  beforeEach(() => {
    useResponsiveDisplay.mockClear();
    useEventFiltering.mockClear();
    InfoCard.mockClear();
    Text.mockClear();
    Button.mockClear();
    formatDate.mockClear();
    formatTime.mockClear();
  });

  // Test affichage pendant le chargement
  test('affiche un message de chargement', () => {
    useResponsiveDisplay.mockReturnValue(3);
    useEventFiltering.mockReturnValue({
      events: [],
      loading: true,
      error: null
    });

    render(<ProgrammingOverview />);

    expect(screen.getByText('Chargement de la programmation...')).toBeInTheDocument();
  });

  // Test affichage en cas d'erreur
  test('affiche un message d\'erreur si le chargement échoue', () => {
    useResponsiveDisplay.mockReturnValue(3);
    useEventFiltering.mockReturnValue({
      events: [],
      loading: false,
      error: 'Erreur de chargement'
    });

    render(<ProgrammingOverview />);

    expect(screen.getByText('Erreur de chargement')).toBeInTheDocument();
    expect(screen.getByText('Erreur de chargement')).toHaveClass('text-red-500');
  });

  // Test affichage normal avec 2 rencontres (mode responsive 2 colonnes)
  test('affiche les rencontres avec 2 colonnes en responsive mode 2', () => {
    useResponsiveDisplay.mockReturnValue(2);
    useEventFiltering.mockReturnValue({
      events: mockMeetings,
      loading: false,
      error: null
    });

    render(<ProgrammingOverview />);

    // Vérifie l'appel au Text pour le titre
    expect(Text).toHaveBeenCalledWith(
      expect.objectContaining({
        content: 'Programmation',
        type: 'h2',
        className: 'text-2xl font-bold mb-6 text-center'
      }),
      expect.anything()
    );

    // Vérifie que InfoCard est appelé pour chaque rencontre (limité à 2 en mode responsive 2)
    expect(InfoCard).toHaveBeenCalledTimes(2);
    
    // Vérifie les classes de grille pour 2 colonnes
    const gridElement = screen.getAllByTestId('mock-info-card')[0].parentElement;
    expect(gridElement).toHaveClass('grid');
    expect(gridElement).toHaveClass('grid-cols-1');
    expect(gridElement).toHaveClass('md:grid-cols-2');
    expect(gridElement).not.toHaveClass('lg:grid-cols-3');

    // Vérifie le bouton "Voir la Programmation Complète"
    expect(Button).toHaveBeenCalledWith(
      expect.objectContaining({
        label: 'Voir la Programmation Complète',
        href: '/programmation'
      }),
      expect.anything()
    );
  });

  // Test affichage normal avec 3 rencontres (mode responsive 3 colonnes)
  test('affiche les rencontres avec 3 colonnes en responsive mode 3', () => {
    useResponsiveDisplay.mockReturnValue(3);
    useEventFiltering.mockReturnValue({
      events: mockMeetings,
      loading: false,
      error: null
    });

    render(<ProgrammingOverview />);

    // Vérifie que InfoCard est appelé pour chaque rencontre
    expect(InfoCard).toHaveBeenCalledTimes(3);
    
    // Vérifie les classes de grille pour 3 colonnes
    const gridElement = screen.getAllByTestId('mock-info-card')[0].parentElement;
    expect(gridElement).toHaveClass('grid');
    expect(gridElement).toHaveClass('grid-cols-1');
    expect(gridElement).toHaveClass('lg:grid-cols-3');
  });

  // Test de formatage des informations additionnelles
  test('formate correctement les informations additionnelles de chaque rencontre', () => {
    useResponsiveDisplay.mockReturnValue(1);
    useEventFiltering.mockReturnValue({
      events: [mockMeetings[0]],
      loading: false,
      error: null
    });

    render(<ProgrammingOverview />);

    // Vérifie que formatDate et formatTime sont appelés avec les bonnes valeurs
    expect(formatDate).toHaveBeenCalledWith(mockMeetings[0].date);
    expect(formatTime).toHaveBeenCalledWith(mockMeetings[0].start_time);
    expect(formatTime).toHaveBeenCalledWith(mockMeetings[0].end_time);

    // Vérifie que InfoCard est appelé avec les informations correctement formatées
    expect(InfoCard).toHaveBeenCalledWith(
      expect.objectContaining({
        title: mockMeetings[0].title,
        description: mockMeetings[0].description,
        image: mockMeetings[0].artist.image_url,
        additionalInfo: expect.stringContaining('Date formatée'),
        type: 'meeting'
      }),
      expect.anything()
    );
  });

  // Test de l'utilisation du hook useEventFiltering
  test('utilise le hook useEventFiltering avec le bon endpoint', () => {
    useResponsiveDisplay.mockReturnValue(3);
    useEventFiltering.mockReturnValue({
      events: mockMeetings,
      loading: false,
      error: null
    });

    render(<ProgrammingOverview />);

    expect(useEventFiltering).toHaveBeenCalledWith('/api/meetings');
  });

  // Test avec un artiste sans image
  test('gère correctement un artiste sans image', () => {
    // Crée une copie de la rencontre sans image d'artiste
    const meetingWithoutImage = {
      ...mockMeetings[0],
      artist: null
    };

    useResponsiveDisplay.mockReturnValue(1);
    useEventFiltering.mockReturnValue({
      events: [meetingWithoutImage],
      loading: false,
      error: null
    });

    render(<ProgrammingOverview />);

    // Vérifie que InfoCard est appelé avec image undefined
    expect(InfoCard).toHaveBeenCalledWith(
      expect.objectContaining({
        title: meetingWithoutImage.title,
        image: undefined
      }),
      expect.anything()
    );
  });

  // Test de l'utilisation du hook useResponsiveDisplay
  test('utilise le hook useResponsiveDisplay pour déterminer le nombre de rencontres à afficher', () => {
    useResponsiveDisplay.mockReturnValue(2);
    useEventFiltering.mockReturnValue({
      events: mockMeetings,
      loading: false,
      error: null
    });

    render(<ProgrammingOverview />);

    // Vérifie que le hook useResponsiveDisplay a été appelé
    expect(useResponsiveDisplay).toHaveBeenCalled();
    
    // Vérifie que le nombre de rencontres affichées correspond à la valeur renvoyée par le hook
    expect(InfoCard).toHaveBeenCalledTimes(2);
  });


  // Test avec un tableau de rencontres vide
  test('ne rend pas de cartes si le tableau de rencontres est vide', () => {
    useResponsiveDisplay.mockReturnValue(3);
    useEventFiltering.mockReturnValue({
      events: [],
      loading: false,
      error: null
    });

    render(<ProgrammingOverview />);

    // Vérifie que InfoCard n'est pas appelé
    expect(InfoCard).not.toHaveBeenCalled();
    
    // Mais le titre et le bouton doivent toujours être rendus
    expect(Text).toHaveBeenCalled();
    expect(Button).toHaveBeenCalled();
  });
});