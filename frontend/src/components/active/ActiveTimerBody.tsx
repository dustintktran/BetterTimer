import { Stack, Box, Button, Typography, type Theme } from '@mui/material';
import NextTimerBlock from './blocks/NextTimerBlock';
import { type Clock } from '../../constants';
import { useCallback, useEffect, useState } from 'react';
import { UpcomingTimersContainer } from './blocks/UpcomingTimersBlock';
import CurrentTimerBlock from './blocks/CurrentTimerBlock';
import { formatTime } from '../../helpers/formatTime';

interface ActiveTimerBodyProps {
  initialTimers: Clock[];
}

const ActiveTimerBody = ({ initialTimers }: ActiveTimerBodyProps) => {
  const [timers, setTimers] = useState(initialTimers);
  const [isPaused, setIsPaused] = useState(true);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const nextTimerExists = timers.length > 1;

  const timersComplete = timers.length === 0;
  const isRunning = !isPaused && !timersComplete;

  useEffect(() => {
    const interval = setInterval(() => {
      if (isRunning) setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const handlePause = useCallback(() => {
    if (!timersComplete) setIsPaused(!isPaused);
  }, [isPaused, timersComplete]);

  useEffect(() => {
    const handleSpacebar = (event: KeyboardEvent) => {
      const isTyping =
        document.activeElement instanceof HTMLInputElement ||
        document.activeElement instanceof HTMLTextAreaElement;

      if (event.code === 'Space' && !isTyping) {
        event.preventDefault();
        handlePause();
      }
    };

    window.addEventListener('keydown', handleSpacebar);

    return () => {
      window.removeEventListener('keydown', handleSpacebar);
    };
  }, [handlePause]);

  return (
    <Stack direction='row' flex={20} sx={{ minHeight: 0 }}>
      <Stack direction='column' flex={5}>
        <Stack flex={2}>
          <CurrentTimerBlock
            key={`${timers.length}`}
            timer={timers[0]}
            setTimers={setTimers}
            isPaused={isPaused}
          />
          {nextTimerExists && <NextTimerBlock timer={timers[1]} />}
        </Stack>
        <Box flex={1} sx={styles.actionsContainer} marginBottom={2}>
          {elapsedSeconds > 0 && (
            <Typography sx={styles.elapsedTimer}>Total: {formatTime(elapsedSeconds)}</Typography>
          )}
          <Button
            variant='contained'
            sx={styles.pauseButton}
            onClick={handlePause}
            color={isPaused ? 'primary' : 'error'}
          >
            {isPaused ? 'START' : 'PAUSE'}
          </Button>
        </Box>
      </Stack>
      <UpcomingTimersContainer timers={timers.slice(2)} />
    </Stack>
  );
};

export default ActiveTimerBody;

const styles = {
  actionsContainer: (theme: Theme) => ({
    marginTop: theme.spacing(2),
    marginX: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(2),
  }),
  elapsedTimer: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    opacity: 0.8,
  },
  pauseButton: {
    paddingY: 12,
    paddingX: 32,
    fontSize: '2.5rem',
    fontWeight: 'bold',
    borderRadius: '32px',
    transition: 'transform 0.2s ease-in-out',
    '&:active': {
      transform: 'scale(0.95)',
    },
    minWidth: '240px',
  },
};
