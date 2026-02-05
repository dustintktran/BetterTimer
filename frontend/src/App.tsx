import React, { useState } from 'react';
import { Box } from '@mui/material';
import GlobalHeader from './components/GlobalHeader';
import PageManager from './components/PageManager';
import { TIMER_PAGE_VIEW, type TimerPageView } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<TimerPageView>(TIMER_PAGE_VIEW.ACTIVE);

  return (
    <Box>
      <GlobalHeader setCurrentView={setCurrentView} />
      <Box>
        <PageManager currentView={currentView} />
      </Box>
    </Box>
  );
};

export default App;
