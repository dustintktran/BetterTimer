import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ThemeSelector from './ThemeSelector';

describe('ThemeSelector', () => {
  const mockSetActiveTheme = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the Choose Theme button', () => {
    render(<ThemeSelector setActiveTheme={mockSetActiveTheme} />);
    expect(screen.getByText('Choose Theme')).toBeInTheDocument();
  });

  it('shows theme options when button is clicked', async () => {
    const user = userEvent.setup();
    render(<ThemeSelector setActiveTheme={mockSetActiveTheme} />);

    await user.click(screen.getByText('Choose Theme'));

    expect(screen.getByText('Nordic')).toBeInTheDocument();
    expect(screen.getByText('Desert')).toBeInTheDocument();
    expect(screen.getByText('Midnight')).toBeInTheDocument();
  });

  it('calls setActiveTheme with "nordic" when Nordic is selected', async () => {
    const user = userEvent.setup();
    render(<ThemeSelector setActiveTheme={mockSetActiveTheme} />);

    await user.click(screen.getByText('Choose Theme'));
    await user.click(screen.getByText('Nordic'));

    expect(mockSetActiveTheme).toHaveBeenCalledWith('nordic');
  });

  it('calls setActiveTheme with "desert" when Desert is selected', async () => {
    const user = userEvent.setup();
    render(<ThemeSelector setActiveTheme={mockSetActiveTheme} />);

    await user.click(screen.getByText('Choose Theme'));
    await user.click(screen.getByText('Desert'));

    expect(mockSetActiveTheme).toHaveBeenCalledWith('desert');
  });

  it('calls setActiveTheme with "midnight" when Midnight is selected', async () => {
    const user = userEvent.setup();
    render(<ThemeSelector setActiveTheme={mockSetActiveTheme} />);

    await user.click(screen.getByText('Choose Theme'));
    await user.click(screen.getByText('Midnight'));

    expect(mockSetActiveTheme).toHaveBeenCalledWith('midnight');
  });

  it('closes the menu after selecting a theme', async () => {
    const user = userEvent.setup();
    render(<ThemeSelector setActiveTheme={mockSetActiveTheme} />);

    await user.click(screen.getByText('Choose Theme'));
    await user.click(screen.getByText('Nordic'));

    await waitFor(() => {
      expect(screen.queryByText('Desert')).not.toBeInTheDocument();
    });
  });
});
