import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NextTimerBlock from './NextTimerBlock';

describe('NextTimerBlock', () => {
  const mockTimer = {
    id: 'c1',
    name: 'Hamstring Stretch',
    duration: 120,
    position: 2,
    type: 'timed' as const,
    reps: null,
    sets: 1,
    restBetweenSets: 0,
  };

  it('renders the "Up Next:" label', () => {
    render(<NextTimerBlock timer={mockTimer} />);
    expect(screen.getByText('Up Next:')).toBeInTheDocument();
  });

  it('renders the timer name', () => {
    render(<NextTimerBlock timer={mockTimer} />);
    expect(screen.getByText('Hamstring Stretch')).toBeInTheDocument();
  });

  it('renders a StaticClock with the correct duration', () => {
    render(<NextTimerBlock timer={mockTimer} />);
    expect(screen.getByText('00:02:00')).toBeInTheDocument();
  });

  it('renders reps label for rep-type clocks', () => {
    const repTimer = { ...mockTimer, type: 'reps' as const, reps: 12, duration: 0 };
    render(<NextTimerBlock timer={repTimer} />);
    expect(screen.getByText('12 reps')).toBeInTheDocument();
    expect(screen.queryByText('00:02:00')).not.toBeInTheDocument();
  });

  it('shows sets badge when sets > 1', () => {
    const multiSetTimer = { ...mockTimer, sets: 3 };
    render(<NextTimerBlock timer={multiSetTimer} />);
    expect(screen.getByText('×3 sets')).toBeInTheDocument();
  });

  it('does not show sets badge when sets is 1', () => {
    render(<NextTimerBlock timer={mockTimer} />);
    expect(screen.queryByText(/sets/)).not.toBeInTheDocument();
  });
});
