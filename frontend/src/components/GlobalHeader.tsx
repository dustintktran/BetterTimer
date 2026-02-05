import React from 'react';
import { AppBar, Toolbar, Typography, Button, Stack, Box } from '@mui/material';
import TimerIcon from '@mui/icons-material/Timer';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';

const GlobalHeader: React.FC = () => {
  return (
    <AppBar position='static' color='default' elevation={1}>
      <Toolbar>
        {/* Logo Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <TimerIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography
            variant='h6'
            component='div'
            sx={{ fontWeight: 'bold', letterSpacing: 1 }}
          >
            BETTER TIMER
          </Typography>
        </Box>

        {/* Navigation Actions */}
        <Stack direction='row' spacing={1}>
          <Button startIcon={<HistoryIcon />} color='inherit'>
            History
          </Button>
          <Button startIcon={<SettingsIcon />} color='inherit'>
            Settings
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default GlobalHeader;
