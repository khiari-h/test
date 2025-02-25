import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Footer from '../../component/organisms/Footer';
import axios from '../../config/axiosConfig';
import Text from '../../component/atoms/Text';
import NavItem from '../../component/molecules/NavItem';
import { act } from 'react-dom/test-utils';

// Mocks
jest.mock('../../config/axiosConfig');
jest.mock('../../component/atoms/Text', () => jest.fn(() => <div data-testid="mock-text" />));
jest.mock('../../component/molecules/NavItem', () => jest.fn(() => <div data-testid="mock-nav-item" />));
jest.mock('../../component/atoms/Button', () => {
  return jest.fn(props => (
    <button 
      data-testid="mock-button" 
      onClick={props.onClick}
      type={props.type}
      disabled={props.disabled}
    >
      {props.label}
    </button>
  ));
});

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: jest.fn(() => <div data-testid="mock-icon" />)
}));

// Mock de setTimeout et clearTimeout
jest.useFakeTimers();

describe('Composant Footer', () => {
  beforeEach(() => {
    // Réinitialisation des mocks
    jest.clearAllMocks();
    axios.post.mockReset();
  });

  // Test de rendu de base
  test('rend correctement tous les éléments du footer', () => {
    render(<Footer />);
    
    // Vérifie les sections principales
    expect(screen.getByText('À Propos de Nation Sounds')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Newsletter')).toBeInTheDocument();
    expect(screen.getByText('Informations légales')).toBeInTheDocument();
    expect(screen.getByText('Réseaux sociaux')).toBeInTheDocument();
    
    // Vérifie les champs du formulaire
    expect(screen.getByPlaceholderText('Votre prénom')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Votre nom')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Votre email')).toBeInTheDocument();
    
    // Vérifie le bouton d'inscription
    expect(screen.getByTestId('mock-button')).toBeInTheDocument();
    expect(screen.getByText("S'inscrire")).toBeInTheDocument();
    
    // Vérifie les réseaux sociaux
    expect(screen.getAllByTestId('mock-icon')).toHaveLength(6); // 6 icônes de réseaux sociaux
    
    // Vérifie le copyright
    expect(Text).toHaveBeenCalledWith(
      expect.objectContaining({
        content: '© 2024 Nation Sounds Festival. Tous droits réservés.',
        type: 'p',
        className: 'text-white'
      }),
      expect.anything()
    );
  });

  // Test des liens de navigation
  test('rend correctement les liens de navigation dans la section informations légales', () => {
    render(<Footer />);
    
    // Vérifie que NavItem est appelé pour chaque lien
    expect(NavItem).toHaveBeenCalledTimes(5);
    
    // Vérifie les paramètres pour le premier NavItem
    expect(NavItem).toHaveBeenCalledWith(
      expect.objectContaining({
        label: 'Mentions légales',
        href: '/legal',
        className: 'text-white hover:text-gray-400'
      }),
      expect.anything()
    );
  });

  // Test de soumission du formulaire avec succès
  test('soumet le formulaire avec succès', async () => {
    // Configuration du mock axios pour simuler une réponse réussie
    axios.post.mockResolvedValueOnce({});
    
    render(<Footer />);
    
    // Remplir le formulaire
    fireEvent.change(screen.getByPlaceholderText('Votre prénom'), {
      target: { value: 'John' }
    });
    fireEvent.change(screen.getByPlaceholderText('Votre nom'), {
      target: { value: 'Doe' }
    });
    fireEvent.change(screen.getByPlaceholderText('Votre email'), {
      target: { value: 'john.doe@example.com' }
    });
    
    // Soumettre le formulaire
    fireEvent.click(screen.getByText("S'inscrire"));
    
    // Vérifier que axios.post a été appelé avec les bons paramètres
    expect(axios.post).toHaveBeenCalledWith('/api/newsletter/subscribe', {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com'
    });
    
    // Attendre que le statut soit mis à jour
    await waitFor(() => {
      expect(screen.getByText('Inscription réussie!')).toBeInTheDocument();
    });
    
    // Vérifier que le formulaire est réinitialisé
    expect(screen.getByPlaceholderText('Votre prénom').value).toBe('');
    expect(screen.getByPlaceholderText('Votre nom').value).toBe('');
    expect(screen.getByPlaceholderText('Votre email').value).toBe('');
  });

  // Test de soumission du formulaire avec erreur
  test('affiche une erreur si la soumission échoue', async () => {
    // Configuration du mock axios pour simuler une erreur
    axios.post.mockRejectedValueOnce(new Error('Erreur de serveur'));
    
    render(<Footer />);
    
    // Remplir le formulaire
    fireEvent.change(screen.getByPlaceholderText('Votre prénom'), {
      target: { value: 'John' }
    });
    fireEvent.change(screen.getByPlaceholderText('Votre nom'), {
      target: { value: 'Doe' }
    });
    fireEvent.change(screen.getByPlaceholderText('Votre email'), {
      target: { value: 'john.doe@example.com' }
    });
    
    // Soumettre le formulaire
    fireEvent.click(screen.getByText("S'inscrire"));
    
    // Attendre que le statut d'erreur soit affiché
    await waitFor(() => {
      expect(screen.getByText("Erreur lors de l'inscription.")).toBeInTheDocument();
    });
    
    // Les valeurs du formulaire ne doivent pas être réinitialisées en cas d'erreur
    expect(screen.getByPlaceholderText('Votre prénom').value).toBe('John');
    expect(screen.getByPlaceholderText('Votre nom').value).toBe('Doe');
    expect(screen.getByPlaceholderText('Votre email').value).toBe('john.doe@example.com');
  });

  // Test de désactivation du bouton pendant la soumission
  test('désactive le bouton pendant la soumission du formulaire', async () => {
    // Ralentir la résolution de la promesse pour voir l'état "En cours..."
    axios.post.mockImplementation(() => {
      return new Promise(resolve => {
        setTimeout(() => resolve({}), 1000);
      });
    });
    
    render(<Footer />);
    
    // Soumettre le formulaire
    fireEvent.click(screen.getByText("S'inscrire"));
    
    // Vérifier que le bouton est désactivé et affiche "En cours..."
    expect(screen.getByText("En cours...")).toBeInTheDocument();
    expect(screen.getByTestId('mock-button')).toHaveAttribute('disabled');
    
    // Résoudre la promesse
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    // Attendre que le formulaire soit réinitialisé
    await waitFor(() => {
      expect(screen.getByText("S'inscrire")).toBeInTheDocument();
      expect(screen.getByTestId('mock-button')).not.toHaveAttribute('disabled');
    });
  });

  // Test de disparition du message de statut après un délai
  test('le message de statut disparaît après 3 secondes', async () => {
    axios.post.mockResolvedValueOnce({});
    
    render(<Footer />);
    
    // Soumettre le formulaire
    fireEvent.click(screen.getByText("S'inscrire"));
    
    // Attendre que le statut soit affiché
    await waitFor(() => {
      expect(screen.getByText('Inscription réussie!')).toBeInTheDocument();
    });
    
    // Avancer le temps de 3 secondes
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    
    // Vérifier que le message a disparu
    expect(screen.queryByText('Inscription réussie!')).not.toBeInTheDocument();
  });

  // Test de validation du formulaire
  test('requiert que tous les champs soient remplis avant soumission', () => {
    render(<Footer />);
    
    // Vérifier que les champs sont requis
    expect(screen.getByPlaceholderText('Votre prénom')).toHaveAttribute('required');
    expect(screen.getByPlaceholderText('Votre nom')).toHaveAttribute('required');
    expect(screen.getByPlaceholderText('Votre email')).toHaveAttribute('required');
    
    // Vérifier que le champ email a le type email
    expect(screen.getByPlaceholderText('Votre email')).toHaveAttribute('type', 'email');
  });


});