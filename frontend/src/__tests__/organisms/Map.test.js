import React from 'react';
import { render, screen } from '@testing-library/react';
import Map from '../../component/organisms/Map';
import Text from '../../component/atoms/Text';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';

// Mocks pour les composants
jest.mock('../../component/atoms/Text', () => jest.fn(() => <div data-testid="mock-text" />));
jest.mock('react-leaflet', () => ({
  MapContainer: jest.fn(({ children }) => (
    <div data-testid="mock-map-container">{children}</div>
  )),
  TileLayer: jest.fn(() => <div data-testid="mock-tile-layer" />),
  Marker: jest.fn(({ children }) => (
    <div data-testid="mock-marker">{children}</div>
  )),
  Popup: jest.fn(({ children }) => (
    <div data-testid="mock-popup">{children}</div>
  ))
}));

// Mock pour leaflet Icon
jest.mock('leaflet', () => ({
  Icon: jest.fn(() => ({}))
}));

describe('Composant Map', () => {
  beforeEach(() => {
    // Réinitialiser les mocks
    jest.clearAllMocks();
  });

  // Test de rendu de base
  test('rend correctement la carte avec son titre', () => {
    render(<Map />);
    
    // Vérifie que le composant Text est appelé avec les bonnes props
    expect(Text).toHaveBeenCalledWith(
      expect.objectContaining({
        content: 'Voici la localisation du concert',
        type: 'h2',
        className: 'h2-class mb-8 text-center'
      }),
      expect.anything()
    );
    
    // Vérifie que MapContainer est rendu
    expect(MapContainer).toHaveBeenCalled();
    expect(screen.getByTestId('mock-map-container')).toBeInTheDocument();
  });

  // Test des propriétés de la carte
  test('configure correctement les propriétés de MapContainer', () => {
    render(<Map />);
    
    // Vérifie les props de MapContainer
    expect(MapContainer).toHaveBeenCalledWith(
      expect.objectContaining({
        center: [48.8937, 2.3930], // CONCERT_POSITION
        zoom: 15,
        className: 'h-full w-full'
      }),
      expect.anything()
    );
  });

  // Test du TileLayer
  test('configure correctement le TileLayer', () => {
    render(<Map />);
    
    // Vérifie que TileLayer est appelé avec les bonnes props
    expect(TileLayer).toHaveBeenCalledWith(
      expect.objectContaining({
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: expect.stringContaining('OpenStreetMap')
      }),
      expect.anything()
    );
  });

  // Test du Marker et du Popup
  test('ajoute un marker avec un popup contenant les informations du concert', () => {
    render(<Map />);
    
    // Vérifie que Marker est appelé avec les bonnes props
    expect(Marker).toHaveBeenCalledWith(
      expect.objectContaining({
        position: [48.8937, 2.3930], // CONCERT_POSITION
        icon: expect.anything()
      }),
      expect.anything()
    );
    
    // Vérifie que Popup est appelé
    expect(Popup).toHaveBeenCalled();
    
    // Vérifie que le contenu du Popup est rendu
    const popupContent = screen.getByTestId('mock-popup');
    expect(popupContent).toBeInTheDocument();
  });


  // Test des classes CSS du conteneur
  test('applique les bonnes classes CSS au conteneur de la carte', () => {
    render(<Map />);
    
    // Vérifie les classes CSS du conteneur de la carte
    const mapWrapper = screen.getByTestId('mock-map-container').parentElement;
    expect(mapWrapper).toHaveClass('w-full');
    expect(mapWrapper).toHaveClass('h-96');
    expect(mapWrapper).toHaveClass('rounded-lg');
    expect(mapWrapper).toHaveClass('overflow-hidden');
    expect(mapWrapper).toHaveClass('shadow-lg');
  });

  // Test du conteneur principal
  test('le conteneur principal a le bon padding', () => {
    render(<Map />);
    
    // Vérifie la classe p-4 sur le conteneur principal
    const mainContainer = screen.getByTestId('mock-text').parentElement;
    expect(mainContainer).toHaveClass('p-4');
  });

  // Test d'intégration avec les données du concert
  test('affiche les bonnes informations de concert dans le popup', () => {
    // Modifier l'implémentation du mock Popup pour permettre le test du contenu
    Popup.mockImplementation(({ children }) => (
      <div data-testid="mock-popup">{children}</div>
    ));
    
    const { container } = render(<Map />);
    
    // Chercher les éléments dans le contenu du popup
    // Note: cela fonctionne parce que nous avons modifié l'implémentation du mock pour rendre les enfants
    expect(container.querySelector('.p-2')).toBeInTheDocument();
    expect(container.querySelector('h3')).toHaveTextContent('Music & People');
    expect(container.querySelectorAll('p')[0]).toHaveTextContent('Music & People Paris');
    expect(container.querySelectorAll('p')[1]).toHaveTextContent('211 Avenue Jean Jaurès, 75019 Paris');
    expect(container.querySelectorAll('p')[2]).toHaveTextContent('Date : 15 Mars 2025');
    expect(container.querySelectorAll('p')[3]).toHaveTextContent('Heure : 20:00');
  });
});