import React from 'react';
import { AppBar, Toolbar, Typography, Button, Stack, Box } from '@mui/material';
import TimerIcon from '@mui/icons-material/Timer';
import HistoryIcon from '@mui/icons-material/History';
import { Add } from '@mui/icons-material';
import { TIMER_PAGE_VIEW, type TimerPageView } from '../constants';
import { TitleHeader } from '../styles/styles';

interface GlobalHeaderProps {
  setCurrentView: React.Dispatch<React.SetStateAction<TimerPageView>>;
}

const GlobalHeader = ({ setCurrentView }: GlobalHeaderProps) => {
  return (
    <AppBar position='static' color='default' elevation={1}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <TimerIcon sx={{ mr: 1, fontSize: '40px', color: 'primary.main' }} />
          <TitleHeader>Better Timer</TitleHeader>
        </Box>

        {/* Navigation Actions */}
        <Stack direction='row' spacing={1}>
          <Button
            startIcon={<HistoryIcon />}
            color='inherit'
            variant='outlined'
            onClick={() => setCurrentView(TIMER_PAGE_VIEW.ACTIVE)}
          >
            <Typography fontSize={14} marginTop={'2px'}>
              Select Timer
            </Typography>
          </Button>
          <Button
            startIcon={<Add />}
            color='inherit'
            variant='outlined'
            onClick={() => setCurrentView(TIMER_PAGE_VIEW.CREATE)}
          >
            <Typography fontSize={14} marginTop={'2px'}>
              Create Timer
            </Typography>
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default GlobalHeader;
