import React from 'react';
import { render, screen } from '@testing-library/react';
import AdminDashboard from '../../../component/pages/admin/AdminDashboard';


// Mock for dependencies
jest.mock('../../../component/pages/admin/components/AdminSidebar', () => jest.fn(() => <div data-testid="mock-sidebar" />));
jest.mock('react-router-dom', () => ({
  Link: jest.fn(({ to, children }) => <a href={to} data-testid="mock-link">{children}</a>)
}));

describe('AdminDashboard', () => {
  test('renders sidebar and dashboard content', () => {
    render(<AdminDashboard />);
    
    // Check if sidebar is rendered
    expect(screen.getByTestId('mock-sidebar')).toBeInTheDocument();
    
    // Check if the main heading is rendered
    expect(screen.getByText('Tableau de Bord Admin')).toBeInTheDocument();
    
    // Check if welcome message is rendered
    expect(screen.getByText('Bienvenue sur le tableau de bord d\'administration')).toBeInTheDocument();
    
    // Check if instruction text is rendered
    expect(screen.getByText('Utilisez la sidebar pour mettre à jour les evenements du concert')).toBeInTheDocument();
  });

  test('applies correct styling', () => {
    render(<AdminDashboard />);
    
    // Check main container styling
    const mainContainer = screen.getByText('Tableau de Bord Admin').closest('div');
    expect(mainContainer).toHaveClass('ml-64');
    expect(mainContainer).toHaveClass('flex-1');
    expect(mainContainer).toHaveClass('p-6');
    expect(mainContainer).toHaveClass('bg-gray-100');
    
    // Check inner container styling
    const innerContainer = screen.getByText('Bienvenue sur le tableau de bord d\'administration').closest('div');
    expect(innerContainer).toHaveClass('bg-white');
    expect(innerContainer).toHaveClass('p-8');
    expect(innerContainer).toHaveClass('rounded-lg');
    expect(innerContainer).toHaveClass('shadow-md');
  });
});