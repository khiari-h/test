import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AdminSidebar from '../../../../component/pages/admin/components/AdminSidebar';

// Mock react-router-dom hooks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  Link: jest.fn(({ to, className, children }) => (
    <a href={to} className={className} data-testid="mock-link">
      {children}
    </a>
  )),
}));

describe('AdminSidebar', () => {
  beforeEach(() => {
    // Mock localStorage
    Storage.prototype.removeItem = jest.fn();

    // Mock window.location
    delete window.location;
    window.location = { href: '' };

    // Mock react-router-dom's useLocation
    jest.spyOn(require('react-router-dom'), 'useLocation').mockReturnValue({
      pathname: '/admin/dashboard', // Default location
    });
  });

  test('renders the sidebar with all navigation items', () => {
    render(
      <BrowserRouter>
        <AdminSidebar />
      </BrowserRouter>
    );

    // Check title
    expect(screen.getByText('Admin Panel')).toBeInTheDocument();

    // Check all menu items
    expect(screen.getByText('Tableau de bord')).toBeInTheDocument();
    expect(screen.getByText('Concerts')).toBeInTheDocument();
    expect(screen.getByText('Rencontres Artistes')).toBeInTheDocument();
    expect(screen.getByText('Actualités')).toBeInTheDocument();
    expect(screen.getByText('Déconnexion')).toBeInTheDocument();

    // Check icons are rendered
    const icons = screen.getAllByText(/[📊🎵🤝📰🚪]/);
    expect(icons).toHaveLength(5);
  });

  test('has links with correct routes', () => {
    render(
      <BrowserRouter>
        <AdminSidebar />
      </BrowserRouter>
    );

    const links = screen.getAllByTestId('mock-link');

    // Check all links except logout
    expect(links[0]).toHaveAttribute('href', '/admin/dashboard');
    expect(links[1]).toHaveAttribute('href', '/admin/concerts');
    expect(links[2]).toHaveAttribute('href', '/admin/meetings');
    expect(links[3]).toHaveAttribute('href', '/admin/news');
  });

  test('handles logout correctly', () => {
    render(
      <BrowserRouter>
        <AdminSidebar />
      </BrowserRouter>
    );

    // Find and click the logout button
    const logoutButton = screen.getByText('Déconnexion');
    fireEvent.click(logoutButton);

    // Check if localStorage.removeItem was called with the right key
    expect(localStorage.removeItem).toHaveBeenCalledWith('admin_token');

    // Check if redirect occurred (you can spy on window.location.href)
    expect(window.location.href).toBe('/admin/login');
  });
});
