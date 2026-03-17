import React, { useState } from 'react';
import { Box, Stack } from '@mui/material';
import GlobalHeader from './components/global/GlobalHeader';
import PageManager from './components/global/PageManager';
import { TIMER_PAGE_VIEW, type TimerPageView } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<TimerPageView>(TIMER_PAGE_VIEW.ACTIVE);

  return (
    <Box sx={styles.outerBox}>
      <Stack sx={styles.containerStack}>
        <GlobalHeader setCurrentView={setCurrentView} />
        <PageManager currentView={currentView} />
      </Stack>
    </Box>
  );
};

export default App;

const styles = {
  outerBox: {
    width: 'calc(100% - 8px)',
    height: '100vh',
    marginLeft: '4px',
  },
  containerStack: {
    height: 'calc(100% - 4px)',
  },
};
