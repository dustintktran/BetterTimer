import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ActiveTimer from './ActiveTimer';

vi.mock('../../api/apiClient', () => ({
  default: {
    get: vi.fn(),
  },
}));

vi.mock('use-sound', () => ({
  default: () => [vi.fn()],
}));

import apiClient from '../../api/apiClient';

describe('ActiveTimer Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders full component tree from API data without mocked children', async () => {
    const mockTimer = {
      id: 'timer-abc',
      title: 'Leg Flexibility Routine',
      clocks: [
        { id: 'c1', name: 'Split Stretch', duration: 120, position: 1, type: 'timed', reps: null, sets: 1 },
        { id: 'c2', name: 'Hamstring Hold', duration: 90, position: 2, type: 'timed', reps: null, sets: 1 },
        { id: 'c3', name: 'Quad Stretch', duration: 60, position: 3, type: 'timed', reps: null, sets: 1 },
      ],
    };
    (apiClient.get as ReturnType<typeof vi.fn>).mockResolvedValue({ data: mockTimer });

    render(<ActiveTimer activeTimer='timer-abc' />);

    await waitFor(() => {
      expect(screen.getByText('Leg Flexibility Routine')).toBeInTheDocument();
    });

    expect(screen.getByText('Split Stretch')).toBeInTheDocument();
    expect(screen.getByText('00:02:00')).toBeInTheDocument();

    expect(screen.getByText('Up Next:')).toBeInTheDocument();
    expect(screen.getByText('Hamstring Hold')).toBeInTheDocument();
    expect(screen.getByText('00:01:30')).toBeInTheDocument();

    expect(screen.getByText('Upcoming Timers')).toBeInTheDocument();
    expect(screen.getByText('Quad Stretch')).toBeInTheDocument();
    expect(screen.getByText('00:01:00')).toBeInTheDocument();

    expect(screen.getByText('START')).toBeInTheDocument();
    expect(screen.getByText('Skip')).toBeInTheDocument();
  });
});
