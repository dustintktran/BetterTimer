import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, type Mock } from 'vitest';
import PageManager from './PageManager';
import { TIMER_PAGE_VIEW } from '../../constants';

vi.mock('../create/CreateTimer', () => ({
  default: () => <div data-testid='create-timer-mock'>Create Timer View</div>,
}));

vi.mock('../active/ActiveTimer', () => ({
  default: () => <div data-testid='active-timer-mock'>Active Timer View</div>,
}));

describe('PageManager', () => {
  const mockSetCurrentView: Mock = vi.fn();
  const mockSetActiveTimer: Mock = vi.fn();

  it('renders the CreateTimer component when view is CREATE', () => {
    render(
      <PageManager
        currentView={TIMER_PAGE_VIEW.CREATE}
        activeTimer=''
        setCurrentView={mockSetCurrentView}
        setActiveTimer={mockSetActiveTimer}
      />
    );

    expect(screen.getByTestId('create-timer-mock')).toBeInTheDocument();
    expect(screen.queryByTestId('active-timer-mock')).not.toBeInTheDocument();
  });

  it('renders the ActiveTimer component when view is ACTIVE', () => {
    render(
      <PageManager
        currentView={TIMER_PAGE_VIEW.ACTIVE}
        activeTimer=''
        setCurrentView={mockSetCurrentView}
        setActiveTimer={mockSetActiveTimer}
      />
    );

    expect(screen.getByTestId('active-timer-mock')).toBeInTheDocument();
    expect(screen.queryByTestId('create-timer-mock')).not.toBeInTheDocument();
  });
});
