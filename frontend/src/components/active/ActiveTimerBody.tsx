import { Stack, Box } from '@mui/material';
import NextTimerBlock from './NextTimerBlock';
import { type Timer } from '../../constants';
import { useState } from 'react';
import CurrentTimerBlock from './CurrentTimerBlock';

interface ActiveTimerBodyProps {
  initialTimers: Timer[];
}

const ActiveTimerBody = ({ initialTimers }: ActiveTimerBodyProps) => {
  const [timers, setTimers] = useState(initialTimers);

  const nextTimerExists = timers.length > 1;

  return (
    <Stack direction='row' flex={20} sx={{ height: '100%' }}>
      <Stack direction='column' flex={2} sx={{ height: '100%' }}>
        <Stack flex={2} sx={styles.debug}>
          <CurrentTimerBlock key={`${timers.length}`} timer={timers[0]} setTimers={setTimers} />
          {nextTimerExists && <NextTimerBlock timer={timers[1]} />}
          <Box flex={3} sx={styles.debug}></Box>
        </Stack>
        <Box flex={1} sx={styles.debug}>
          Box2
        </Box>
      </Stack>
      <Box flex={1} sx={styles.debug}>
        {/* <TimerBlock  /> */}
      </Box>
    </Stack>
  );
};

export default ActiveTimerBody;

const styles = {
  debug: {
    border: '1px solid black',
    margin: '2px',
  },
};
