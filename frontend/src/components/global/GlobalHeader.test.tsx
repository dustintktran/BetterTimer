import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ThemeProvider } from '@mui/material';
import GlobalHeader from './GlobalHeader';
import { TIMER_PAGE_VIEW } from '../../constants';
import { desertTheme } from '../../theme';

vi.mock('./ThemeSelector', () => ({
  default: () => <div data-testid='theme-selector-mock'>Theme Selector</div>,
}));

vi.mock('./TimerSelector', () => ({
  default: () => <div data-testid='timer-selector-mock'>Timer Selector</div>,
}));

describe('GlobalHeader', () => {
  const mockSetCurrentView = vi.fn();
  const mockSetActiveTheme = vi.fn();
  const mockSetActiveTimer = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderHeader = () =>
    render(
      <ThemeProvider theme={desertTheme}>
        <GlobalHeader
          setCurrentView={mockSetCurrentView}
          setActiveTheme={mockSetActiveTheme}
          setActiveTimer={mockSetActiveTimer}
        />
      </ThemeProvider>
    );

  it('renders the app title', () => {
    renderHeader();
    expect(screen.getByText('Better Timer')).toBeInTheDocument();
  });

  it('renders ThemeSelector and TimerSelector', () => {
    renderHeader();
    expect(screen.getByTestId('theme-selector-mock')).toBeInTheDocument();
    expect(screen.getByTestId('timer-selector-mock')).toBeInTheDocument();
  });

  it('renders the Create Timer button', () => {
    renderHeader();
    expect(screen.getByText('Create Timer')).toBeInTheDocument();
  });

  it('sets view to CREATE when Create Timer is clicked', async () => {
    const user = userEvent.setup();
    renderHeader();

    await user.click(screen.getByText('Create Timer'));
    expect(mockSetCurrentView).toHaveBeenCalledWith(TIMER_PAGE_VIEW.CREATE);
  });
});
