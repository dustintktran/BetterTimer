import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import RepCounter from './RepCounter';

describe('RepCounter', () => {
  it('displays the rep count when reps is provided', () => {
    render(<RepCounter reps={15} handleNextTimer={vi.fn()} />);
    expect(screen.getByText('15 reps')).toBeInTheDocument();
  });

  it('displays fallback text when reps is null', () => {
    render(<RepCounter reps={null} handleNextTimer={vi.fn()} />);
    expect(screen.getByText('Complete reps')).toBeInTheDocument();
  });

  it('renders a NEXT button', () => {
    render(<RepCounter reps={10} handleNextTimer={vi.fn()} />);
    expect(screen.getByText('NEXT')).toBeInTheDocument();
  });

  it('calls handleNextTimer when NEXT is clicked', async () => {
    const handleNext = vi.fn();
    const user = userEvent.setup();
    render(<RepCounter reps={10} handleNextTimer={handleNext} />);

    await user.click(screen.getByText('NEXT'));
    expect(handleNext).toHaveBeenCalledTimes(1);
  });
});
