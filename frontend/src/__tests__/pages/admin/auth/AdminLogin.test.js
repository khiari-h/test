import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminLogin from '../../../../component/pages/admin/auth/AdminLogin';
import axios from '../../../../config/axiosConfig';

// Mocks
jest.mock('../../../../config/axiosConfig', () => ({
  get: jest.fn(),
  post: jest.fn()
}));

describe('AdminLogin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock localStorage
    Storage.prototype.setItem = jest.fn();
    
    // Mock window.location
    delete window.location;
    window.location = { href: '' };
    
    // Setup axios mocks for successful login
    axios.get.mockResolvedValue({});
    axios.post.mockResolvedValue({ data: { token: 'fake-token-123' } });
  });

  test('renders login form correctly', () => {
    render(<AdminLogin />);
    
    // Check title and form elements
    expect(screen.getByText('Espace Admin')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Mot de passe')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Connexion' })).toBeInTheDocument();
  });

  test('updates state on input change', () => {
    render(<AdminLogin />);
    
    // Get form inputs
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Mot de passe');
    
    // Change input values
    fireEvent.change(emailInput, { target: { value: 'admin@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    // Check if values were updated
    expect(emailInput.value).toBe('admin@test.com');
    expect(passwordInput.value).toBe('password123');
  });

  test('submits form and handles successful login', async () => {
    render(<AdminLogin />);
    
    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'admin@test.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('Mot de passe'), {
      target: { value: 'password123' }
    });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: 'Connexion' }));
    
    // Wait for axios calls to complete
    await waitFor(() => {
      // Check if CSRF cookie was requested
      expect(axios.get).toHaveBeenCalledWith('/sanctum/csrf-cookie');
      
      // Check if login API was called with correct credentials
      expect(axios.post).toHaveBeenCalledWith('/api/login', {
        email: 'admin@test.com',
        password: 'password123'
      });
      
      // Check if token was stored
      expect(localStorage.setItem).toHaveBeenCalledWith('admin_token', 'fake-token-123');
      
      // Check if redirect occurred
      expect(window.location.href).toBe('/admin/dashboard');
    });
  });

  test('handles login failure and shows error message', async () => {
    // Mock axios post to reject
    axios.post.mockRejectedValueOnce(new Error('Authentication failed'));
    
    render(<AdminLogin />);
    
    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'wrong@email.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('Mot de passe'), {
      target: { value: 'wrongpassword' }
    });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: 'Connexion' }));
    
    // Wait for error message to appear
    await waitFor(() => {
      expect(screen.getByText('Identifiants incorrects')).toBeInTheDocument();
    });
    
    // localStorage should not be called
    expect(localStorage.setItem).not.toHaveBeenCalled();
    
    // No redirect should happen
    expect(window.location.href).toBe('');
  });

  test('validates required fields', async () => {
    render(<AdminLogin />);
    
    // Get the form and submit button
    const form = screen.getByRole('button', { name: 'Connexion' }).closest('form');
    
    // Try to submit without filling inputs (browser validation)
    fireEvent.submit(form);
    
    // Axios should not be called
    expect(axios.post).not.toHaveBeenCalled();
  });

  test('applies correct styling to elements', () => {
    render(<AdminLogin />);
    
    // Check container styling
    const container = screen.getByText('Espace Admin').closest('div');
    expect(container).toHaveClass('max-w-md');
    expect(container).toHaveClass('bg-white');
    expect(container).toHaveClass('rounded-xl');
    expect(container).toHaveClass('shadow-md');
    
    // Check button styling
    const button = screen.getByRole('button', { name: 'Connexion' });
    expect(button).toHaveClass('bg-blue-500');
    expect(button).toHaveClass('text-white');
    expect(button).toHaveClass('hover:bg-blue-600');
  });
});