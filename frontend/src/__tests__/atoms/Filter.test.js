import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import Filter from '../../component/atoms/Filter';
import Button from '../../component/atoms/Button';

// Mock du composant Button
jest.mock('../../component/atoms/Button', () => {
  return jest.fn(props => (
    <button data-testid="mock-button" onClick={props.onClick}>
      {props.label}
    </button>
  ));
});

describe('Composant Filter', () => {
  const mockData = [
    { date: '2024-09-01', heuredebut: '20:00', lieu: 'Stade de France', type: 'Concert', group: 'Coldplay' },
    { date: '2024-09-02', heuredebut: '21:00', lieu: 'Bercy', type: 'Concert', group: 'U2' },
    { date: '2024-08-15', heuredebut: '19:30', lieu: 'Stade de France', type: 'Festival', group: 'Various' },
  ];
  const filterKeys = ['group', 'date', 'heuredebut', 'lieu', 'type'];
  const mockHandleFilterChange = jest.fn();
  const mockResetFilters = jest.fn();
  const initialFilters = {};

  beforeEach(() => {
    jest.clearAllMocks();
    Button.mockClear();
  });

  test('Rend correctement tous les éléments du formulaire', () => {
    render(
      <Filter
        data={mockData}
        filters={initialFilters}
        filterKeys={filterKeys}
        handleFilterChange={mockHandleFilterChange}
        resetFilters={mockResetFilters}
      />
    );

    // 5 selects pour 5 filterKeys
    const selects = screen.getAllByRole('combobox');
    expect(selects).toHaveLength(5);

    // Vérifie que le bouton de réinitialisation est rendu
    expect(screen.getByTestId('mock-button')).toBeInTheDocument();
    expect(screen.getByText('Réinitialiser les filtres')).toBeInTheDocument();
  });

  test('Affiche les bonnes étiquettes pour chaque filtre', () => {
    render(
      <Filter
        data={mockData}
        filters={initialFilters}
        filterKeys={filterKeys}
        handleFilterChange={mockHandleFilterChange}
        resetFilters={mockResetFilters}
      />
    );

    // Chaque select doit avoir une option par défaut avec le libellé attendu
    expect(within(document.getElementById('group')).getByText('Groupes')).toBeInTheDocument();
    expect(within(document.getElementById('date')).getByText('Dates')).toBeInTheDocument();
    expect(within(document.getElementById('heuredebut')).getByText('Heures')).toBeInTheDocument();
    expect(within(document.getElementById('lieu')).getByText('Lieux')).toBeInTheDocument();
    expect(within(document.getElementById('type')).getByText('Types')).toBeInTheDocument();
  });

  test('Génère des options uniques pour chaque filtre', () => {
    render(
      <Filter
        data={mockData}
        filters={initialFilters}
        filterKeys={filterKeys}
        handleFilterChange={mockHandleFilterChange}
        resetFilters={mockResetFilters}
      />
    );

    // Pour le filtre "group"
    const groupSelect = document.getElementById('group');
    expect(within(groupSelect).getByText('Coldplay')).toBeInTheDocument();
    expect(within(groupSelect).getByText('U2')).toBeInTheDocument();
    expect(within(groupSelect).getByText('Various')).toBeInTheDocument();

    // Pour le filtre "lieu"
    const lieuSelect = document.getElementById('lieu');
    expect(within(lieuSelect).getByText('Bercy')).toBeInTheDocument();
    expect(within(lieuSelect).getByText('Stade de France')).toBeInTheDocument();
    // On s'attend à : option par défaut + 2 valeurs uniques = 3 options
    expect(within(lieuSelect).getAllByRole('option')).toHaveLength(3);
  });

  test('Trie les dates correctement', () => {
    render(
      <Filter
        data={mockData}
        filters={initialFilters}
        filterKeys={filterKeys}
        handleFilterChange={mockHandleFilterChange}
        resetFilters={mockResetFilters}
      />
    );

    const dateSelect = document.getElementById('date');
    const dateOptions = within(dateSelect).getAllByRole('option');
    // L'option par défaut est à l'index 0
    expect(dateOptions[1]).toHaveTextContent('2024-08-15');
    expect(dateOptions[2]).toHaveTextContent('2024-09-01');
    expect(dateOptions[3]).toHaveTextContent('2024-09-02');
  });

  test('Appelle handleFilterChange avec les bons paramètres', () => {
    render(
      <Filter
        data={mockData}
        filters={initialFilters}
        filterKeys={filterKeys}
        handleFilterChange={mockHandleFilterChange}
        resetFilters={mockResetFilters}
      />
    );

    const groupSelect = document.getElementById('group');
    fireEvent.change(groupSelect, { target: { value: 'Coldplay' } });
    expect(mockHandleFilterChange).toHaveBeenCalledWith('group', 'Coldplay');
  });

  test('Appelle resetFilters lors du clic sur le bouton de réinitialisation', () => {
    render(
      <Filter
        data={mockData}
        filters={{ group: 'Coldplay' }}
        filterKeys={filterKeys}
        handleFilterChange={mockHandleFilterChange}
        resetFilters={mockResetFilters}
      />
    );

    fireEvent.click(screen.getByText('Réinitialiser les filtres'));
    expect(mockResetFilters).toHaveBeenCalledTimes(1);
  });

  test('Affiche les valeurs de filtre préexistantes', () => {
    const existingFilters = { group: 'Coldplay', lieu: 'Stade de France' };
    render(
      <Filter
        data={mockData}
        filters={existingFilters}
        filterKeys={filterKeys}
        handleFilterChange={mockHandleFilterChange}
        resetFilters={mockResetFilters}
      />
    );

    const groupSelect = document.getElementById('group');
    const lieuSelect = document.getElementById('lieu');
    expect(groupSelect.value).toBe('Coldplay');
    expect(lieuSelect.value).toBe('Stade de France');
  });

  test('Accepte des étiquettes personnalisées', () => {
    const customLabels = {
      group: 'Artistes',
      date: 'Jour',
      heuredebut: 'Heure',
      lieu: 'Venue',
      type: 'Catégorie'
    };

    render(
      <Filter
        data={mockData}
        filters={initialFilters}
        filterKeys={filterKeys}
        handleFilterChange={mockHandleFilterChange}
        resetFilters={mockResetFilters}
        filterLabels={customLabels}
      />
    );

    expect(within(document.getElementById('group')).getByText('Artistes')).toBeInTheDocument();
    expect(within(document.getElementById('date')).getByText('Jour')).toBeInTheDocument();
    expect(within(document.getElementById('heuredebut')).getByText('Heure')).toBeInTheDocument();
    expect(within(document.getElementById('lieu')).getByText('Venue')).toBeInTheDocument();
    expect(within(document.getElementById('type')).getByText('Catégorie')).toBeInTheDocument();
  });
});
