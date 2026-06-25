import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ActiveTimerBody from './ActiveTimerBody';

vi.mock('./blocks/CurrentTimerBlock', () => ({
  default: ({ timer, isPaused }: { timer: { name: string }; isPaused: boolean }) => (
    <div data-testid='current-timer-block'>
      {timer?.name} - {isPaused ? 'paused' : 'running'}
    </div>
  ),
}));

vi.mock('./blocks/NextTimerBlock', () => ({
  default: ({ timer }: { timer: { name: string } }) => (
    <div data-testid='next-timer-block'>{timer.name}</div>
  ),
}));

vi.mock('./blocks/UpcomingTimersBlock', () => ({
  UpcomingTimersContainer: ({ timers }: { timers: { name: string }[] }) => (
    <div data-testid='upcoming-timers'>
      {timers.map((t, i) => (
        <span key={i}>{t.name}</span>
      ))}
    </div>
  ),
}));

describe('ActiveTimerBody', () => {
  const mockClocks = [
    {
      id: 'c1',
      name: 'Stretch A',
      duration: 60,
      position: 1,
      type: 'timed' as const,
      reps: null,
      sets: 1,
    },
    {
      id: 'c2',
      name: 'Stretch B',
      duration: 90,
      position: 2,
      type: 'timed' as const,
      reps: null,
      sets: 1,
    },
    {
      id: 'c3',
      name: 'Stretch C',
      duration: 120,
      position: 3,
      type: 'timed' as const,
      reps: null,
      sets: 1,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the current timer block with the first clock', () => {
    render(<ActiveTimerBody initialTimers={mockClocks} />);
    expect(screen.getByTestId('current-timer-block')).toHaveTextContent('Stretch A');
  });

  it('renders the next timer block with the second clock', () => {
    render(<ActiveTimerBody initialTimers={mockClocks} />);
    expect(screen.getByTestId('next-timer-block')).toHaveTextContent('Stretch B');
  });

  it('renders upcoming timers (3rd clock onwards)', () => {
    render(<ActiveTimerBody initialTimers={mockClocks} />);
    expect(screen.getByTestId('upcoming-timers')).toHaveTextContent('Stretch C');
  });

  it('does not render NextTimerBlock when there is only one clock', () => {
    render(<ActiveTimerBody initialTimers={[mockClocks[0]]} />);
    expect(screen.queryByTestId('next-timer-block')).not.toBeInTheDocument();
  });

  it('starts in paused state with START button', () => {
    render(<ActiveTimerBody initialTimers={mockClocks} />);
    expect(screen.getByText('START')).toBeInTheDocument();
    expect(screen.getByTestId('current-timer-block')).toHaveTextContent('paused');
  });

  it('toggles to PAUSE when START is clicked', async () => {
    const user = userEvent.setup();
    render(<ActiveTimerBody initialTimers={mockClocks} />);

    await user.click(screen.getByText('START'));

    expect(screen.getByText('PAUSE')).toBeInTheDocument();
    expect(screen.getByTestId('current-timer-block')).toHaveTextContent('running');
  });

  it('toggles pause/play with spacebar', () => {
    render(<ActiveTimerBody initialTimers={mockClocks} />);
    expect(screen.getByTestId('current-timer-block')).toHaveTextContent('paused');

    fireEvent.keyDown(window, { code: 'Space' });
    expect(screen.getByTestId('current-timer-block')).toHaveTextContent('running');

    fireEvent.keyDown(window, { code: 'Space' });
    expect(screen.getByTestId('current-timer-block')).toHaveTextContent('paused');
  });

  it('does not toggle when spacebar is pressed in an input', () => {
    render(
      <div>
        <input data-testid='text-input' />
        <ActiveTimerBody initialTimers={mockClocks} />
      </div>
    );

    const input = screen.getByTestId('text-input');
    input.focus();

    fireEvent.keyDown(window, { code: 'Space' });
    expect(screen.getByTestId('current-timer-block')).toHaveTextContent('paused');
  });

  it('shows elapsed timer after START is clicked and time passes', () => {
    vi.useFakeTimers();
    render(<ActiveTimerBody initialTimers={mockClocks} />);

    expect(screen.queryByText(/Total:/)).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('START'));

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.getByText('Total: 00:00:03')).toBeInTheDocument();
    vi.useRealTimers();
  });
});
