import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import StaticClock from './StaticClock';
import { TIMER_BLOCK_TYPE } from '../../../../constants';

// 1. Mock the formatTime utility so we have predictable output
vi.mock('./utils/formatTime', () => ({
  formatTime: vi.fn((s) => `formatted-${s}`),
}));

describe('StaticClock Component', () => {
  it('renders the formatted time correctly for hours', () => {
    render(<StaticClock type={TIMER_BLOCK_TYPE.NEXT} seconds={18000} />);

    expect(screen.getByText('05:00:00')).toBeInTheDocument();
  });

  it('renders the formatted time correctly', () => {
    render(<StaticClock type={TIMER_BLOCK_TYPE.NEXT} seconds={300} />);

    expect(screen.getByText('00:05:00')).toBeInTheDocument();
  });

  it('renders the formatted time correctly', () => {
    render(<StaticClock type={TIMER_BLOCK_TYPE.NEXT} seconds={5} />);

    expect(screen.getByText('00:00:05')).toBeInTheDocument();
  });

  it('applies "next" styles when type is NEXT', () => {
    render(<StaticClock type={TIMER_BLOCK_TYPE.NEXT} seconds={60} />);

    const testDiv = screen.getByTestId('STATIC_CLOCK_NEXT');
    expect(testDiv).toBeInTheDocument();
  });

  it('applies "upcoming" styles when type is UPCOMING', () => {
    render(<StaticClock type={TIMER_BLOCK_TYPE.UPCOMING} seconds={60} />);

    const testDiv = screen.getByTestId('STATIC_CLOCK_UPCOMING');

    expect(testDiv).toBeInTheDocument();
  });
});
