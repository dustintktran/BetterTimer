import { Stack, Box, Button } from '@mui/material';
import NextTimerBlock from './NextTimerBlock';
import { type Timer } from '../../constants';
import { useState } from 'react';
import { UpcomingTimersBlock } from './UpcomingTimersBlock';
import CurrentTimerBlock from './CurrentTimerBlock';

interface ActiveTimerBodyProps {
  initialTimers: Timer[];
}

const ActiveTimerBody = ({ initialTimers }: ActiveTimerBodyProps) => {
  const [timers, setTimers] = useState(initialTimers);
  const [isPaused, setIsPaused] = useState(true);

  const nextTimerExists = timers.length > 1;

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <Stack direction='row' flex={20} sx={{ minHeight: 0 }}>
      <Stack direction='column' flex={2}>
        <Stack flex={2}>
          <CurrentTimerBlock
            key={`${timers.length}`}
            timer={timers[0]}
            setTimers={setTimers}
            isPaused={isPaused}
          />
          <Box flex={3} sx={styles.debug}>
            {nextTimerExists && <NextTimerBlock timer={timers[1]} />}
          </Box>
        </Stack>
        <Box flex={1} sx={styles.debug} marginBottom={1}>
          <Button variant='outlined' onClick={handlePause}>
            {isPaused ? 'RESUME' : 'PAUSE'}
          </Button>
        </Box>
      </Stack>
      <UpcomingTimersBlock timers={timers.slice(2)} />
    </Stack>
  );
};

export default ActiveTimerBody;

const styles = {
  debug: {
    border: '1px solid black',
    marginTop: '4px',
  },
};
