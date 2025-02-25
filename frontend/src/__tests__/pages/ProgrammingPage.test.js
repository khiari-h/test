import React from 'react';
import { render, screen, act } from '@testing-library/react';
import ProgrammingPage from '../../component/pages/ProgrammingPage';


// Mocks
jest.mock('../../component/templates/ProgrammingPageTemplate', () => jest.fn(
  ({ children, currentSection, onSectionChange }) => (
    <div data-testid="mock-programming-template" data-current-section={currentSection}>
      <button onClick={() => onSectionChange('concerts')}>Concerts</button>
      <button onClick={() => onSectionChange('artistMeetings')}>Artist Meetings</button>
      <div data-testid="content-container">{children}</div>
    </div>
  )
));

// Mocks pour les composants lazy-loadés
jest.mock('../../component/organisms/ProgrammingOrganisms/ConcertProgramming', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-concerts-programming" />
}));

jest.mock('../../component/organisms/ProgrammingOrganisms/ArtistMeeting', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-artist-meeting" />
}));

describe('ProgrammingPage', () => {
  test('rend le template avec la section par défaut (concerts)', async () => {
    await act(async () => {
      render(<ProgrammingPage />);
    });
    
    expect(screen.getByTestId('mock-programming-template')).toBeInTheDocument();
    expect(screen.getByTestId('mock-programming-template')).toHaveAttribute('data-current-section', 'concerts');
    expect(screen.getByTestId('mock-concerts-programming')).toBeInTheDocument();
  });

  test('change de section lorsque le template déclenche onSectionChange', async () => {
    await act(async () => {
      render(<ProgrammingPage />);
    });
    
    // Change la section vers artistMeetings
    await act(async () => {
      screen.getByText('Artist Meetings').click();
    });
    
    expect(screen.getByTestId('mock-programming-template')).toHaveAttribute('data-current-section', 'artistMeetings');
    expect(screen.getByTestId('mock-artist-meeting')).toBeInTheDocument();
    
    // Change la section de retour vers concerts
    await act(async () => {
      screen.getByText('Concerts').click();
    });
    
    expect(screen.getByTestId('mock-programming-template')).toHaveAttribute('data-current-section', 'concerts');
    expect(screen.getByTestId('mock-concerts-programming')).toBeInTheDocument();
  });


});