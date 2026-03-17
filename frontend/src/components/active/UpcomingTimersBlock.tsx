import { Stack, Typography } from '@mui/material';
import { type Timer } from '../../constants';
import UpcomingTimerBlock from './UpcomingTimerBlock';

interface UpcomingTimersBlock {
  timers: Timer[];
}

export const UpcomingTimersBlock = ({ timers }: UpcomingTimersBlock) => {
  return (
    <Stack
      flex={1}
      sx={{ minHeight: 0, overflow: 'auto', border: '1px solid black', margin: '4px' }}
    >
      <Typography margin={2}>Upcoming Timers</Typography>
      {timers.map((timer: Timer) => (
        <UpcomingTimerBlock timer={timer} />
      ))}
    </Stack>
  );
};

export default UpcomingTimersBlock;
