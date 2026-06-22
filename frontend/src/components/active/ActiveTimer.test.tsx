import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ActiveTimer from './ActiveTimer';

vi.mock('../../api/apiClient', () => ({
  default: {
    get: vi.fn(),
  },
}));

vi.mock('./ActiveTimerHeader', () => ({
  default: ({ headerText }: { headerText: string }) => (
    <div data-testid='timer-header'>{headerText}</div>
  ),
}));

vi.mock('./ActiveTimerBody', () => ({
  default: () => <div data-testid='timer-body'>Timer Body</div>,
}));

import apiClient from '../../api/apiClient';

describe('ActiveTimer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows prompt to select a timer when no activeTimer is provided', () => {
    render(<ActiveTimer activeTimer={undefined} />);
    expect(screen.getByText('Select a timer to get started.')).toBeInTheDocument();
  });

  it('shows loading state while fetching timer', () => {
    (apiClient.get as ReturnType<typeof vi.fn>).mockReturnValue(new Promise(() => {}));
    render(<ActiveTimer activeTimer='timer-123' />);
    expect(screen.getByText('Loading timer...')).toBeInTheDocument();
  });

  it('renders timer header and body on successful fetch', async () => {
    const mockTimer = {
      id: 'timer-123',
      title: 'Test Routine',
      clocks: [{ id: 'c1', name: 'Stretch', duration: 60, position: 1 }],
    };
    (apiClient.get as ReturnType<typeof vi.fn>).mockResolvedValue({ data: mockTimer });

    render(<ActiveTimer activeTimer='timer-123' />);

    await waitFor(() => {
      expect(screen.getByTestId('timer-header')).toHaveTextContent('Test Routine');
    });
    expect(screen.getByTestId('timer-body')).toBeInTheDocument();
  });

  it('displays error message when fetch fails', async () => {
    (apiClient.get as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Network error'));

    render(<ActiveTimer activeTimer='timer-123' />);

    await waitFor(() => {
      expect(screen.getByText('Error: Network error')).toBeInTheDocument();
    });
  });

  it('calls the correct API endpoint with timer id', () => {
    (apiClient.get as ReturnType<typeof vi.fn>).mockReturnValue(new Promise(() => {}));
    render(<ActiveTimer activeTimer='abc-456' />);
    expect(apiClient.get).toHaveBeenCalledWith('/timers/abc-456');
  });
});
