import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { UpcomingTimersContainer } from './UpcomingTimersBlock';

describe('UpcomingTimersContainer', () => {
  it('renders the "Upcoming Timers" header', () => {
    render(<UpcomingTimersContainer timers={[]} />);
    expect(screen.getByText('Upcoming Timers')).toBeInTheDocument();
  });

  it('renders nothing when timers array is empty', () => {
    render(<UpcomingTimersContainer timers={[]} />);
    expect(screen.getByText('Upcoming Timers')).toBeInTheDocument();
    expect(screen.queryByText('00:')).not.toBeInTheDocument();
  });

  it('renders multiple upcoming timer blocks', () => {
    const timers = [
      { id: 'c3', name: 'Quad Stretch', duration: 60, position: 3 },
      { id: 'c4', name: 'Hip Opener', duration: 90, position: 4 },
    ];
    render(<UpcomingTimersContainer timers={timers} />);
    expect(screen.getByText('Quad Stretch')).toBeInTheDocument();
    expect(screen.getByText('Hip Opener')).toBeInTheDocument();
    expect(screen.getByText('00:01:00')).toBeInTheDocument();
    expect(screen.getByText('00:01:30')).toBeInTheDocument();
  });
});
