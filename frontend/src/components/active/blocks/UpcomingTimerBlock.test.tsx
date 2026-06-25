import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import UpcomingTimerBlock from './UpcomingTimerBlock';

describe('UpcomingTimerBlock', () => {
  const mockTimer = {
    id: 'c3',
    name: 'Calf Stretch',
    duration: 90,
    position: 3,
    type: 'timed' as const,
    reps: null,
    sets: 1,
  };

  it('renders the timer name', () => {
    render(<UpcomingTimerBlock timer={mockTimer} />);
    expect(screen.getByText('Calf Stretch')).toBeInTheDocument();
  });

  it('renders a StaticClock with the correct duration', () => {
    render(<UpcomingTimerBlock timer={mockTimer} />);
    expect(screen.getByText('00:01:30')).toBeInTheDocument();
  });

  it('renders reps label for rep-type clocks', () => {
    const repTimer = { ...mockTimer, type: 'reps' as const, reps: 20, duration: 0 };
    render(<UpcomingTimerBlock timer={repTimer} />);
    expect(screen.getByText('20 reps')).toBeInTheDocument();
    expect(screen.queryByText('00:01:30')).not.toBeInTheDocument();
  });

  it('shows sets badge when sets > 1', () => {
    const multiSetTimer = { ...mockTimer, sets: 2 };
    render(<UpcomingTimerBlock timer={multiSetTimer} />);
    expect(screen.getByText('×2 sets')).toBeInTheDocument();
  });

  it('does not show sets badge when sets is 1', () => {
    render(<UpcomingTimerBlock timer={mockTimer} />);
    expect(screen.queryByText(/sets/)).not.toBeInTheDocument();
  });
});
