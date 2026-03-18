import React, { useState } from 'react';
import { Box, CssBaseline, Stack, ThemeProvider, type Theme } from '@mui/material';
import GlobalHeader from './components/global/GlobalHeader';
import PageManager from './components/global/PageManager';
import { TIMER_PAGE_VIEW, type TimerPageView } from './constants';
import { nordicTheme, desertTheme, midnightTheme } from './theme';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<TimerPageView>(TIMER_PAGE_VIEW.ACTIVE);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeTheme, _setActiveTheme] = useState('desert');

  const themeMap: Record<string, Theme> = {
    nordic: nordicTheme,
    desert: desertTheme,
    midnight: midnightTheme,
  };
  return (
    <ThemeProvider theme={themeMap[activeTheme]}>
      <CssBaseline />
      <Box sx={styles.outerBox}>
        <Stack sx={styles.containerStack}>
          <GlobalHeader setCurrentView={setCurrentView} />
          <PageManager currentView={currentView} />
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

export default App;

const styles = {
  outerBox: (theme: Theme) => ({
    width: 'calc(100% - 8px)',
    height: '100vh',
    marginLeft: '4px',
    background: theme.palette.background.paper,
  }),
  containerStack: {
    height: 'calc(100% - 4px)',
  },
};
