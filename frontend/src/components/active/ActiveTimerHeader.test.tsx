import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ActiveTimerHeader from './ActiveTimerHeader';

describe('ActiveTimerHeader', () => {
  it('renders the header text', () => {
    render(<ActiveTimerHeader headerText='Leg Flexibility Routine' />);
    expect(screen.getByText('Leg Flexibility Routine')).toBeInTheDocument();
  });

  it('renders the edit icon', () => {
    render(<ActiveTimerHeader headerText='Test' />);
    expect(screen.getByTestId('EditIcon')).toBeInTheDocument();
  });
});
