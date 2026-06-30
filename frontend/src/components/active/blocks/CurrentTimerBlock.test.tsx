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

vi.mock('./RepCounter', () => ({
  default: ({ reps, handleNextTimer }: { reps: number; handleNextTimer: () => void }) => (
    <div data-testid='rep-counter' onClick={handleNextTimer}>
      {reps} reps
    </div>
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
    const timer = {
      id: 'c1',
      name: 'Split Stretch',
      duration: 120,
      position: 1,
      type: 'timed' as const,
      reps: null,
      sets: 1,
      restBetweenSets: 0,
    };
    render(<CurrentTimerBlock timer={timer} setTimers={mockSetTimers} isPaused={true} />);
    expect(screen.getByText('Split Stretch')).toBeInTheDocument();
    expect(screen.getByTestId('current-clock')).toHaveTextContent('120s');
  });

  it('renders a Skip button', () => {
    const timer = {
      id: 'c1',
      name: 'Split Stretch',
      duration: 120,
      position: 1,
      type: 'timed' as const,
      reps: null,
      sets: 1,
      restBetweenSets: 0,
    };
    render(<CurrentTimerBlock timer={timer} setTimers={mockSetTimers} isPaused={true} />);
    expect(screen.getByText('Skip')).toBeInTheDocument();
  });

  it('calls setTimers to advance when Skip is clicked', async () => {
    const timer = {
      id: 'c1',
      name: 'Split Stretch',
      duration: 120,
      position: 1,
      type: 'timed' as const,
      reps: null,
      sets: 1,
      restBetweenSets: 0,
    };
    const user = userEvent.setup();
    render(<CurrentTimerBlock timer={timer} setTimers={mockSetTimers} isPaused={true} />);

    await user.click(screen.getByText('Skip'));
    expect(mockSetTimers).toHaveBeenCalledTimes(1);
  });

  it('renders RepCounter for rep-type clocks', () => {
    const timer = {
      id: 'c1',
      name: 'Push-ups',
      duration: 0,
      position: 1,
      type: 'reps' as const,
      reps: 15,
      sets: 1,
      restBetweenSets: 0,
    };
    render(<CurrentTimerBlock timer={timer} setTimers={mockSetTimers} isPaused={true} />);
    expect(screen.getByTestId('rep-counter')).toHaveTextContent('15 reps');
    expect(screen.queryByTestId('current-clock')).not.toBeInTheDocument();
  });

  it('shows set indicator when sets > 1', () => {
    const timer = {
      id: 'c1',
      name: 'Push-ups',
      duration: 0,
      position: 1,
      type: 'reps' as const,
      reps: 15,
      sets: 3,
      restBetweenSets: 0,
    };
    render(<CurrentTimerBlock timer={timer} setTimers={mockSetTimers} isPaused={true} />);
    expect(screen.getByText('Set 1 of 3')).toBeInTheDocument();
  });

  it('does not show set indicator when sets is 1', () => {
    const timer = {
      id: 'c1',
      name: 'Push-ups',
      duration: 0,
      position: 1,
      type: 'reps' as const,
      reps: 15,
      sets: 1,
      restBetweenSets: 0,
    };
    render(<CurrentTimerBlock timer={timer} setTimers={mockSetTimers} isPaused={true} />);
    expect(screen.queryByText(/Set \d+ of/)).not.toBeInTheDocument();
  });

  it('increments set counter on NEXT click without advancing timer', async () => {
    const timer = {
      id: 'c1',
      name: 'Push-ups',
      duration: 0,
      position: 1,
      type: 'reps' as const,
      reps: 15,
      sets: 3,
      restBetweenSets: 0,
    };
    const user = userEvent.setup();
    render(<CurrentTimerBlock timer={timer} setTimers={mockSetTimers} isPaused={true} />);

    await user.click(screen.getByTestId('rep-counter'));
    expect(screen.getByText('Set 2 of 3')).toBeInTheDocument();
    expect(mockSetTimers).not.toHaveBeenCalled();
  });

  it('advances to next timer after final set', async () => {
    const timer = {
      id: 'c1',
      name: 'Push-ups',
      duration: 0,
      position: 1,
      type: 'reps' as const,
      reps: 15,
      sets: 2,
      restBetweenSets: 0,
    };
    const user = userEvent.setup();
    render(<CurrentTimerBlock timer={timer} setTimers={mockSetTimers} isPaused={true} />);

    await user.click(screen.getByTestId('rep-counter'));
    expect(screen.getByText('Set 2 of 2')).toBeInTheDocument();

    await user.click(screen.getByTestId('rep-counter'));
    expect(mockSetTimers).toHaveBeenCalledTimes(1);
  });

  it('skip always advances to next timer regardless of current set', async () => {
    const timer = {
      id: 'c1',
      name: 'Push-ups',
      duration: 0,
      position: 1,
      type: 'reps' as const,
      reps: 15,
      sets: 3,
      restBetweenSets: 0,
    };
    const user = userEvent.setup();
    render(<CurrentTimerBlock timer={timer} setTimers={mockSetTimers} isPaused={true} />);

    await user.click(screen.getByTestId('rep-counter'));
    expect(screen.getByText('Set 2 of 3')).toBeInTheDocument();

    await user.click(screen.getByText('Skip'));
    expect(mockSetTimers).toHaveBeenCalledTimes(1);
  });

  it('shows rest countdown between sets when restBetweenSets > 0', async () => {
    const timer = {
      id: 'c1',
      name: 'Push-ups',
      duration: 0,
      position: 1,
      type: 'reps' as const,
      reps: 15,
      sets: 3,
      restBetweenSets: 30,
    };
    const user = userEvent.setup();
    render(<CurrentTimerBlock timer={timer} setTimers={mockSetTimers} isPaused={true} />);

    await user.click(screen.getByTestId('rep-counter'));
    expect(screen.getByText('Rest')).toBeInTheDocument();
    expect(screen.getByText('Before set 2 of 3')).toBeInTheDocument();
    expect(screen.getByTestId('current-clock')).toHaveTextContent('30s');
  });

  it('Skip Rest skips rest and advances to next set', async () => {
    const timer = {
      id: 'c1',
      name: 'Push-ups',
      duration: 0,
      position: 1,
      type: 'reps' as const,
      reps: 15,
      sets: 3,
      restBetweenSets: 30,
    };
    const user = userEvent.setup();
    render(<CurrentTimerBlock timer={timer} setTimers={mockSetTimers} isPaused={true} />);

    await user.click(screen.getByTestId('rep-counter'));
    expect(screen.getByText('Rest')).toBeInTheDocument();
    expect(screen.getByText('Skip Rest')).toBeInTheDocument();

    await user.click(screen.getByText('Skip Rest'));
    expect(screen.getByText('Set 2 of 3')).toBeInTheDocument();
    expect(screen.getByText('Push-ups')).toBeInTheDocument();
    expect(mockSetTimers).not.toHaveBeenCalled();
  });
});
