import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NextTimerBlock from './NextTimerBlock';

describe('NextTimerBlock', () => {
  const mockTimer = { id: 'c1', name: 'Hamstring Stretch', duration: 120, position: 2, type: 'timed' as const, reps: null, sets: 1 };

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
});
