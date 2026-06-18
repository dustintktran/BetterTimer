import { Button, Menu, MenuItem, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import HistoryIcon from '@mui/icons-material/History';
import { TIMER_PAGE_VIEW, type TimerSummary, type TimerPageView } from '../../constants';
import apiClient from '../../api/apiClient';

interface TimerSelectorProps {
  setCurrentView: React.Dispatch<React.SetStateAction<TimerPageView>>;
  setActiveTimer: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const TimerSelector = ({ setCurrentView, setActiveTimer }: TimerSelectorProps) => {
  const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLButtonElement) | null>(null);
  const [availableTimers, setAvailableTimers] = useState<TimerSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const isOpen = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelectTimer = (timerId: string) => () => {
    setCurrentView(TIMER_PAGE_VIEW.ACTIVE);
    setActiveTimer(timerId);
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const getAllTimers = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get<TimerSummary[]>('/timers');
        setAvailableTimers(response.data);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Could not connect to the server';
        setError(message);
      } finally {
        setLoading(false);
      }
    };
    getAllTimers();
  }, []);

  return (
    <>
      <Button
        startIcon={<HistoryIcon />}
        color='inherit'
        variant='outlined'
        onClick={handleOpenMenu}
      >
        <Typography fontSize={14} marginTop={'2px'}>
          Select Timer
        </Typography>
      </Button>
      <Menu
        id='dropdown-menu'
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {loading && <MenuItem disabled>Loading...</MenuItem>}
        {error && <MenuItem disabled>{error}</MenuItem>}
        {!loading &&
          !error &&
          availableTimers.map((timer) => (
            <MenuItem key={timer.id} onClick={handleSelectTimer(timer.id)}>
              {timer.title}
            </MenuItem>
          ))}
      </Menu>
    </>
  );
};

export default TimerSelector;
