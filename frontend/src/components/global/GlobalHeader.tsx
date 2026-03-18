import React from 'react';
import { AppBar, Toolbar, Typography, Button, Stack, Box, type Theme } from '@mui/material';
import TimerIcon from '@mui/icons-material/Timer';
import HistoryIcon from '@mui/icons-material/History';
import { Add } from '@mui/icons-material';
import { TIMER_PAGE_VIEW, type TimerPageView } from '../../constants';
import { TitleHeader } from '../../styles/styles';

interface GlobalHeaderProps {
  setCurrentView: React.Dispatch<React.SetStateAction<TimerPageView>>;
}

const GlobalHeader = ({ setCurrentView }: GlobalHeaderProps) => {
  return (
    <AppBar position='static' color='default' elevation={1} sx={styles.wrapper}>
      <Toolbar>
        <Box sx={styles.container}>
          <TimerIcon sx={styles.timerIcon} />
          <TitleHeader>Better Timer</TitleHeader>
        </Box>

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

const styles = {
  wrapper: (theme: Theme) => ({
    background: theme.palette.header.bg,
  }),
  container: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
  },
  timerIcon: (theme: Theme) => ({
    mr: 1,
    fontSize: '40px',
    color: theme.palette.primary.main,
  }),
};
