import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CurrentTimerBlock } from './CurrentTimerBlock';

vi.mock('use-sound', () => ({
  default: () => [vi.fn()],
}));

vi.mock('./clocks/CurrentClock', () => ({
  default: ({ initialSeconds }: { initialSeconds: number }) => (
    <div data-testid='current-clock'>{initialSeconds}s</div>
  ),
}));

describe('CurrentTimerBlock', () => {
  const mockSetTimers = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows "Timers Complete!" when no timer is provided', () => {
    render(<CurrentTimerBlock timer={undefined} setTimers={mockSetTimers} isPaused={true} />);
    expect(screen.getByText('Timers Complete!')).toBeInTheDocument();
  });

  it('renders the timer name and clock when a timer is provided', () => {
    const timer = { id: 'c1', name: 'Split Stretch', duration: 120, position: 1 };
    render(<CurrentTimerBlock timer={timer} setTimers={mockSetTimers} isPaused={true} />);
    expect(screen.getByText('Split Stretch')).toBeInTheDocument();
    expect(screen.getByTestId('current-clock')).toHaveTextContent('120s');
  });

  it('renders a Skip button', () => {
    const timer = { id: 'c1', name: 'Split Stretch', duration: 120, position: 1 };
    render(<CurrentTimerBlock timer={timer} setTimers={mockSetTimers} isPaused={true} />);
    expect(screen.getByText('Skip')).toBeInTheDocument();
  });

  it('calls setTimers to advance when Skip is clicked', async () => {
    const timer = { id: 'c1', name: 'Split Stretch', duration: 120, position: 1 };
    const user = userEvent.setup();
    render(<CurrentTimerBlock timer={timer} setTimers={mockSetTimers} isPaused={true} />);

    await user.click(screen.getByText('Skip'));
    expect(mockSetTimers).toHaveBeenCalledTimes(1);
  });
});
