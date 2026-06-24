import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TimerSelector from './TimerSelector';
import { TIMER_PAGE_VIEW } from '../../constants';

vi.mock('../../api/apiClient', () => ({
  default: {
    get: vi.fn(),
  },
}));

import apiClient from '../../api/apiClient';

describe('TimerSelector', () => {
  const mockSetCurrentView = vi.fn();
  const mockSetActiveTimer = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the Select Timer button', async () => {
    (apiClient.get as ReturnType<typeof vi.fn>).mockResolvedValue({ data: [] });
    render(
      <TimerSelector setCurrentView={mockSetCurrentView} setActiveTimer={mockSetActiveTimer} />
    );
    expect(screen.getByText('Select Timer')).toBeInTheDocument();
    await waitFor(() => {
      expect(apiClient.get).toHaveBeenCalled();
    });
  });

  it('shows loading state while fetching timers', async () => {
    (apiClient.get as ReturnType<typeof vi.fn>).mockReturnValue(new Promise(() => {}));
    const user = userEvent.setup();

    render(
      <TimerSelector setCurrentView={mockSetCurrentView} setActiveTimer={mockSetActiveTimer} />
    );

    await user.click(screen.getByText('Select Timer'));
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays fetched timers as menu items', async () => {
    const mockTimers = [
      { id: 't1', title: 'Leg Routine', userId: 1 },
      { id: 't2', title: 'Upper Body', userId: 1 },
    ];
    (apiClient.get as ReturnType<typeof vi.fn>).mockResolvedValue({ data: mockTimers });
    const user = userEvent.setup();

    render(
      <TimerSelector setCurrentView={mockSetCurrentView} setActiveTimer={mockSetActiveTimer} />
    );

    await user.click(screen.getByText('Select Timer'));

    await waitFor(() => {
      expect(screen.getByText('Leg Routine')).toBeInTheDocument();
      expect(screen.getByText('Upper Body')).toBeInTheDocument();
    });
  });

  it('calls setActiveTimer and setCurrentView when a timer is selected', async () => {
    const mockTimers = [{ id: 't1', title: 'Leg Routine', userId: 1 }];
    (apiClient.get as ReturnType<typeof vi.fn>).mockResolvedValue({ data: mockTimers });
    const user = userEvent.setup();

    render(
      <TimerSelector setCurrentView={mockSetCurrentView} setActiveTimer={mockSetActiveTimer} />
    );

    await user.click(screen.getByText('Select Timer'));

    await waitFor(() => {
      expect(screen.getByText('Leg Routine')).toBeInTheDocument();
    });

    await user.click(screen.getByText('Leg Routine'));

    expect(mockSetActiveTimer).toHaveBeenCalledWith('t1');
    expect(mockSetCurrentView).toHaveBeenCalledWith(TIMER_PAGE_VIEW.ACTIVE);
  });

  it('displays error message when fetch fails', async () => {
    (apiClient.get as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error('Could not connect to the server')
    );
    const user = userEvent.setup();

    render(
      <TimerSelector setCurrentView={mockSetCurrentView} setActiveTimer={mockSetActiveTimer} />
    );

    await user.click(screen.getByText('Select Timer'));

    await waitFor(() => {
      expect(screen.getByText('Could not connect to the server')).toBeInTheDocument();
    });
  });
});
