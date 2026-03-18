import { Stack, Typography, type Theme } from '@mui/material';
import { type Timer } from '../../constants';
import UpcomingTimerBlock from './UpcomingTimerBlock';

interface UpcomingTimersBlock {
  timers: Timer[];
}

export const UpcomingTimersBlock = ({ timers }: UpcomingTimersBlock) => {
  return (
    <Stack flex={2} sx={styles.container}>
      <Typography sx={styles.header}>Upcoming Timers</Typography>
      {timers.map((timer: Timer) => (
        <UpcomingTimerBlock timer={timer} />
      ))}
    </Stack>
  );
};

export default UpcomingTimersBlock;

const styles = {
  container: (theme: Theme) => ({
    minHeight: 0,
    overflow: 'auto',
    border: '1px solid black',
    marginY: theme.spacing(4),
    marginRight: theme.spacing(4),
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
  }),
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 1, // Keeps it above the scrolling items
    bgcolor: 'background.paper',
    paddingLeft: 4,
    paddingY: 2,
    borderBottom: '1px solid black', // Optional: visual separator
    fontWeight: 'bold',
  },
};
