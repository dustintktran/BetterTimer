import { Button, Menu, MenuItem, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import HistoryIcon from '@mui/icons-material/History';
import { TIMER_PAGE_VIEW, type Timer, type TimerPageView } from '../../constants';
import apiClient from '../../api/apiClient';

interface TimerSelectorProps {
  setCurrentView: React.Dispatch<React.SetStateAction<TimerPageView>>;
  setActiveTimer: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const TimerSelector = ({ setCurrentView, setActiveTimer }: TimerSelectorProps) => {
  const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLButtonElement) | null>(null);
  const [availableTimers, setAvailableTimers] = useState();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const isOpen = Boolean(anchorEl);
  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelectTimer = (timer: string) => () => {
    setCurrentView(TIMER_PAGE_VIEW.ACTIVE);
    setActiveTimer(timer);
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const getAllTimers = async () => {
      try {
        setLoading(true);

        // 2. Make the request (Axios automatically parses the JSON)
        const response = await apiClient.get<Timer[]>('/timers');

        // 3. Update the state with the data from the response
        setAvailableTimers(response.data);
      } catch (err: string) {
        // Axios errors contain the message in a specific place
        setError(err.response?.data?.message || 'Could not connect to the server');
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
        <MenuItem onClick={handleSelectTimer('lower1')}>Lower Body 1</MenuItem>
        <MenuItem onClick={handleSelectTimer('upper1')}>Upper Body 1</MenuItem>
      </Menu>
    </>
  );
};

export default TimerSelector;
