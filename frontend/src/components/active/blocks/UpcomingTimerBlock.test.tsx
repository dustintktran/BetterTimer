import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import UpcomingTimerBlock from './UpcomingTimerBlock';

describe('UpcomingTimerBlock', () => {
  const mockTimer = { id: 'c3', name: 'Calf Stretch', duration: 90, position: 3 };

  it('renders the timer name', () => {
    render(<UpcomingTimerBlock timer={mockTimer} />);
    expect(screen.getByText('Calf Stretch')).toBeInTheDocument();
  });

  it('renders a StaticClock with the correct duration', () => {
    render(<UpcomingTimerBlock timer={mockTimer} />);
    expect(screen.getByText('00:01:30')).toBeInTheDocument();
  });
});
