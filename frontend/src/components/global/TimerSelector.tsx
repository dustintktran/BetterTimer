import { Button, Menu, MenuItem, Typography } from '@mui/material';
import { useState } from 'react';
import HistoryIcon from '@mui/icons-material/History';
import { TIMER_PAGE_VIEW, type TimerPageView } from '../../constants';

interface TimerSelectorProps {
  setCurrentView: React.Dispatch<React.SetStateAction<TimerPageView>>;
  setActiveTimer: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const TimerSelector = ({ setCurrentView, setActiveTimer }: TimerSelectorProps) => {
  const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLButtonElement) | null>(null);
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
