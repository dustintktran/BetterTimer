import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CreateTimer from './CreateTimer';
import { TIMER_PAGE_VIEW } from '../../constants';

vi.mock('../../api/apiClient', () => ({
  default: {
    post: vi.fn(),
  },
}));

import apiClient from '../../api/apiClient';

describe('CreateTimer', () => {
  const mockSetCurrentView = vi.fn();
  const mockSetActiveTimer = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () =>
    render(<CreateTimer setCurrentView={mockSetCurrentView} setActiveTimer={mockSetActiveTimer} />);

  it('renders the form with title input and one clock row', () => {
    renderComponent();
    expect(screen.getByText('Create Timer')).toBeInTheDocument();
    expect(screen.getByLabelText('Timer Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Clock Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Duration (seconds)')).toBeInTheDocument();
    expect(screen.getByText('Save Timer')).toBeInTheDocument();
  });

  it('adds a new clock row when Add Clock is clicked', async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByText('Add Clock'));

    const clockNameInputs = screen.getAllByLabelText('Clock Name');
    expect(clockNameInputs).toHaveLength(2);
  });

  it('removes a clock row when delete button is clicked', async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByText('Add Clock'));
    expect(screen.getAllByLabelText('Clock Name')).toHaveLength(2);

    const deleteButtons = screen.getAllByTestId('DeleteIcon');
    await user.click(deleteButtons[0]);

    expect(screen.getAllByLabelText('Clock Name')).toHaveLength(1);
  });

  it('disables delete button when only one clock remains', () => {
    renderComponent();
    const deleteButton = screen.getByTestId('DeleteIcon').closest('button');
    expect(deleteButton).toBeDisabled();
  });

  it('shows error when saving without a title', async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByText('Save Timer'));

    expect(screen.getByText('Timer title is required')).toBeInTheDocument();
    expect(apiClient.post).not.toHaveBeenCalled();
  });

  it('shows error when saving without valid clocks', async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.type(screen.getByLabelText('Timer Title'), 'My Routine');
    await user.click(screen.getByText('Save Timer'));

    expect(
      screen.getByText('At least one clock with a name and duration is required')
    ).toBeInTheDocument();
    expect(apiClient.post).not.toHaveBeenCalled();
  });

  it('submits the form and redirects on success', async () => {
    (apiClient.post as ReturnType<typeof vi.fn>).mockResolvedValue({
      data: { id: 'new-timer-id', title: 'My Routine' },
    });
    const user = userEvent.setup();
    renderComponent();

    await user.type(screen.getByLabelText('Timer Title'), 'My Routine');
    await user.clear(screen.getByLabelText('Clock Name'));
    await user.type(screen.getByLabelText('Clock Name'), 'Stretch A');

    await user.click(screen.getByText('Save Timer'));

    await waitFor(() => {
      expect(apiClient.post).toHaveBeenCalledWith('/timers', {
        title: 'My Routine',
        clocks: [{ name: 'Stretch A', duration: 60 }],
      });
    });

    expect(mockSetActiveTimer).toHaveBeenCalledWith('new-timer-id');
    expect(mockSetCurrentView).toHaveBeenCalledWith(TIMER_PAGE_VIEW.ACTIVE);
  });

  it('displays error when API call fails', async () => {
    (apiClient.post as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error('Failed to save timer')
    );
    const user = userEvent.setup();
    renderComponent();

    await user.type(screen.getByLabelText('Timer Title'), 'My Routine');
    await user.clear(screen.getByLabelText('Clock Name'));
    await user.type(screen.getByLabelText('Clock Name'), 'Stretch A');

    await user.click(screen.getByText('Save Timer'));

    await waitFor(() => {
      expect(screen.getByText('Failed to save timer')).toBeInTheDocument();
    });
  });

  it('shows Saving... text while request is in progress', async () => {
    (apiClient.post as ReturnType<typeof vi.fn>).mockReturnValue(new Promise(() => {}));
    const user = userEvent.setup();
    renderComponent();

    await user.type(screen.getByLabelText('Timer Title'), 'My Routine');
    await user.clear(screen.getByLabelText('Clock Name'));
    await user.type(screen.getByLabelText('Clock Name'), 'Stretch A');

    await user.click(screen.getByText('Save Timer'));

    expect(screen.getByText('Saving...')).toBeInTheDocument();
  });
});
