import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import CurrentClock from './CurrentClock';

describe('CurrentClock Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('decrements the time every second when not paused', () => {
    render(<CurrentClock initialSeconds={60} isPaused={false} handleNextTimer={vi.fn()} />);

    expect(screen.getByText(/00:01:00/i)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.getByText(/00:00:59/i)).toBeInTheDocument();
  });

  it('stops counting when isPaused is true', () => {
    render(<CurrentClock initialSeconds={60} isPaused={true} handleNextTimer={vi.fn()} />);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(screen.getByText(/00:01:00/i)).toBeInTheDocument();
  });

  it('calls handleNextTimer when seconds reach zero', () => {
    const handleNextTimer = vi.fn();
    render(<CurrentClock initialSeconds={1} isPaused={false} handleNextTimer={handleNextTimer} />);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(handleNextTimer).toHaveBeenCalledTimes(1);
  });
});
